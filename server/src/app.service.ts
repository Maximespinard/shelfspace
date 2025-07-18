import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, STATES } from 'mongoose';
import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3';
import { MinioConfig } from './config/configuration';

@Injectable()
export class AppService {
  private s3: S3Client;
  private bucket: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
  ) {
    const minioConfig = this.configService.get<MinioConfig>('minio');
    if (minioConfig) {
      const protocol = minioConfig.useSSL ? 'https' : 'http';
      const endpoint = `${protocol}://${minioConfig.endpoint}:${minioConfig.port}`;

      this.s3 = new S3Client({
        region: 'eu-west-1',
        endpoint: endpoint,
        credentials: {
          accessKeyId: minioConfig.accessKey,
          secretAccessKey: minioConfig.secretKey,
        },
        forcePathStyle: true,
      });

      this.bucket = minioConfig.bucket;
    }
  }

  async getHealth() {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment:
        this.configService.get<string>('app.environment') || 'development',
      services: {
        database: {
          status: 'unknown',
          name: 'MongoDB',
        },
        storage: {
          status: 'unknown',
          name: 'MinIO',
          bucket: this.bucket || 'not configured',
        },
      },
    };

    // Check MongoDB connection
    try {
      // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      const dbState = this.connection.readyState;
      health.services.database.status =
        dbState === STATES.connected ? 'healthy' : 'unhealthy';
    } catch {
      health.services.database.status = 'error';
    }

    // Check MinIO connection
    if (this.s3 && this.bucket) {
      try {
        await this.s3.send(new HeadBucketCommand({ Bucket: this.bucket }));
        health.services.storage.status = 'healthy';
      } catch {
        health.services.storage.status = 'error';
      }
    } else {
      health.services.storage.status = 'not configured';
    }

    // Overall health status
    const allHealthy = Object.values(health.services).every(
      (service) =>
        service.status === 'healthy' || service.status === 'not configured',
    );
    health.status = allHealthy ? 'ok' : 'degraded';

    return health;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { MinioConfig } from '../config/configuration';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;
  private endpoint: string;

  constructor(private readonly configService: ConfigService) {
    const minioConfig = this.configService.get<MinioConfig>('minio')!;

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
    this.endpoint = endpoint;
  }

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimetype: string,
  ): Promise<string> {
    const fileExtension = extname(originalName);
    const fileName = `${randomUUID()}${fileExtension}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: buffer,
        ContentType: mimetype,
        ContentLength: buffer.length,
        ACL: 'public-read',
      }),
    );

    return `${this.endpoint}/${this.bucket}/${fileName}`;
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      }),
    );
  }
}

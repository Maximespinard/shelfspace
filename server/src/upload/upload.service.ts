import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { MinioConfig } from '../config/configuration';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;
  private endpoint: string;
  private publicUrl?: string;

  constructor(private readonly configService: ConfigService) {
    const minioConfig = this.configService.get<MinioConfig>('minio')!;

    const protocol = minioConfig.useSSL ? 'https' : 'http';
    const endpoint = `${protocol}://${minioConfig.endpoint}:${minioConfig.port}`;

    this.s3 = new S3Client({
      region: 'eeur',
      endpoint: endpoint,
      credentials: {
        accessKeyId: minioConfig.accessKey,
        secretAccessKey: minioConfig.secretKey,
      },
      forcePathStyle: true,
    });

    this.bucket = minioConfig.bucket;
    this.endpoint = endpoint;
    this.publicUrl = minioConfig.publicUrl;
  }

  async uploadFile(buffer: Buffer): Promise<string> {
    // Process image with Sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
        effort: 4,
      })
      .toBuffer();

    // Generate filename with .webp extension
    const fileName = `${randomUUID()}.webp`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: processedImageBuffer,
        ContentType: 'image/webp',
        ContentLength: processedImageBuffer.length,
        ACL: 'public-read',
      }),
    );

    // Use public URL if available (for Cloudflare R2), otherwise use S3 endpoint
    if (this.publicUrl) {
      return `${this.publicUrl}/${fileName}`;
    }
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

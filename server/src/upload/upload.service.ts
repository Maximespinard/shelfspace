import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.s3 = new S3Client({
      region: 'eu-west-1',
      endpoint: process.env.MINIO_ENDPOINT,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    this.bucket = process.env.MINIO_BUCKET || 'covers';
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
        ACL: 'public-read',
      }),
    );

    return `${process.env.MINIO_ENDPOINT}/${this.bucket}/${fileName}`;
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

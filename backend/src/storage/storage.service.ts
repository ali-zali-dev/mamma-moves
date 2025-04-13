import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CreateBucketCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AwsCredentialIdentity } from '@aws-sdk/types';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;
  private endpoint: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');
    const customEndpoint = this.configService.get<string>('STORAGE_ENDPOINT');

    if (!accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('Missing required storage configuration');
    }

    const credentials: AwsCredentialIdentity = {
      accessKeyId,
      secretAccessKey,
    };

    // If custom endpoint is provided, use it (for MinIO)
    if (customEndpoint) {
      this.endpoint = customEndpoint;
      this.s3Client = new S3Client({
        region: region || 'us-east-1', // MinIO requires a region, but it's not used
        credentials,
        endpoint: customEndpoint,
        forcePathStyle: true, // Required for MinIO
      });
    } else {
      // Use AWS S3
      if (!region) {
        throw new Error('AWS_REGION is required when using AWS S3');
      }
      this.endpoint = `https://${bucketName}.s3.amazonaws.com`;
      this.s3Client = new S3Client({
        region,
        credentials,
      });
    }

    this.bucketName = bucketName;
  }

  async uploadFile(
    key: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    // Return the appropriate URL based on the endpoint
    if (this.endpoint.includes('amazonaws.com')) {
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    } else {
      return `${this.endpoint}/${this.bucketName}/${key}`;
    }
  }

  async getFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    if (!response.Body) {
      throw new Error('No file content found');
    }
    return Buffer.from(await response.Body.transformToByteArray());
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  async createBucket(bucketName: string): Promise<void> {
    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });

    try {
      await this.s3Client.send(command);
    } catch (error: unknown) {
      // Ignore error if bucket already exists
      if (
        !(error instanceof Error) ||
        !error.message.includes('already exists')
      ) {
        throw error;
      }
    }

    // Set bucket policy regardless of whether bucket was just created or already existed
    await this.setBucketPolicy(bucketName);
  }

  async setBucketPolicy(bucketName: string): Promise<void> {
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${bucketName}/*`,
        },
      ],
    };

    const putBucketPolicyCommand = new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy),
    });

    try {
      await this.s3Client.send(putBucketPolicyCommand);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to set bucket policy: ${error.message}`);
      }
      throw new Error('Failed to set bucket policy: Unknown error occurred');
    }
  }
}

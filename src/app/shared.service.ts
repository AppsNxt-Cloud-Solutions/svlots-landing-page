import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private s3!: AWS.S3;
    private data: any[] = [];
  private accessKey!: string;
  private secretKey!: string;
  private initialized: boolean = false


  constructor(private http: HttpClient) {}

  
 async initS3(): Promise<void> {
  if (this.initialized) return;

  try {
    const accessKeyEncrypted = await this.http
      .get('https://loginapi.svlots.com/GetAmazons3CredentialsS3AccessKey', {
        responseType: 'text'
      })
      .toPromise();

    const secretKeyEncrypted = await this.http
      .get('https://loginapi.svlots.com/GetAmazons3CredentialsS3SecretKey', {
        responseType: 'text'
      })
      .toPromise();

    this.accessKey = this.decrypt(accessKeyEncrypted || '');
    this.secretKey = this.decrypt(secretKeyEncrypted || '');

    AWS.config.update({
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretKey,
      region: 'ap-south-1' // ✅ Make sure this is your correct AWS region
    });

    this.s3 = new AWS.S3();
    this.initialized = true;

    console.log('✅ AWS S3 initialized');
  } catch (error) {
    console.error('❌ Failed to initialize AWS S3:', error);
    throw error;
  }
}


  private decrypt(encryptedText: string): string {
    const key = CryptoJS.enc.Utf8.parse('NLKpQsoPaeoZ55ul');
    const iv = CryptoJS.enc.Utf8.parse('RbeqxtNXxucHI123');

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  async generatePresignedUrl(fileKey: string, expiresInSeconds: number = 600): Promise<string> {
    await this.initS3();

    const params = {
      Bucket: 'spropertydetails',
      Key: fileKey,
      Expires: expiresInSeconds
    };

    return this.s3.getSignedUrl('getObject', params);
  }

  // Method to upload a file to S3 and return the URL
  uploadFile(file: File): Promise<{ Key: string; Location: string }> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'spropertydetails',  // Replace with your S3 bucket name
      Key: file.name,              // File name to save in S3
      Body: file,                  // File content
      ContentType: file.type       // File MIME type
    };

    return this.s3.upload(params).promise().then((data) => {
      // Returning only Key and Location from S3 response
      return {
        Key: data.Key,
        Location: data.Location
      };
    }).catch((error) => {
      console.error('Error uploading file:', error);
      throw error;
    });
  }
}
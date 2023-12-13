import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})

export class S3Service {
  private bucketName = 'final-project-sn';
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1'
    });
  }

  uploadFile(file: File): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read' // Adjust the ACL as needed
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('Error uploading file:', err);
          reject(err);
        } else {
          console.log('File uploaded successfully:', data);
          resolve();
        }
      });
    });
  }
}

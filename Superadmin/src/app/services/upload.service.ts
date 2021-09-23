import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  id = environment.accessKeyId;
  key = environment.secretAccessKey;
  constructor() { }
  async uploadFile(file: any) {
    console.log("file", file);
    const contentType = file.type;
    console.log("file type", contentType);
    const bucket = new S3(
      {
        accessKeyId: this.id,
        secretAccessKey: this.key,
        region: "us-east-2"
      }
    );
    const params = {
      Bucket: 'trackait',
      Key: "file_" + new Date().getTime() + "." + contentType.split("/")[1],
      Body: file,
      ACL: 'public-read',
      // ContentType: contentType
    };
    let data = bucket.upload(params).promise();
    return data;
  }


}

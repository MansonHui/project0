import stream from "stream";
import formidable from "formidable";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
dotenv.config();

let s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID + "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY + "",
  },
  region: "ap-southeast-1",
});

export function createStreamingForm(uploads: Upload[] = []) {
  let counter = 0;
  return new formidable.Formidable({
    fileWriteStreamHandler(file) {
      const fileName = (file as any)["newFilename"];
      let passThroughStream = new stream.PassThrough();
      const upload = new Upload({
        client: s3,
        params: {
          Body: passThroughStream,
          Bucket: "cdn.tecky.hk",
          Key: fileName,
        },
      });
      uploads.push(upload);
      return passThroughStream;
    },
    filename(name, ext, part, form) {
      let fieldName = part.name;
      let timestamp = Date.now();
      let newExt = part.mimetype?.split("/").pop();
      return `${fieldName}-${timestamp}-${++counter}.${newExt}`;
    },
  });
}

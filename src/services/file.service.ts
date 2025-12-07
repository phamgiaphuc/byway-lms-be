import { env } from "@/lib/env";
import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

class FileService {
  async uploadFile(file: Express.Multer.File, folder: string = "uploads") {
    const ext = file.originalname.split(".").pop();
    const fileName = crypto.randomUUID() + "." + ext;

    const basePath = "byway-lms";
    const finalPath = `${basePath}/${folder}/${fileName}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: finalPath,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      ext,
      fileName,
      url: `${env.R2_PUBLIC_DOMAIN}/${finalPath}`,
    };
  }
}

export const fileService = new FileService();

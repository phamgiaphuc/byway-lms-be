import { DefaultRoute } from "@/types/routes/route";

export interface FileRoute extends Omit<DefaultRoute, "default"> {
  uploadFiles: string;
  uploadFile: string;
}

export const filesRoute: FileRoute = {
  uploadFiles: "/upload-multiple",
  uploadFile: "/upload-single",
  name: "File",
  index: "/files",
  status: "/status",
};

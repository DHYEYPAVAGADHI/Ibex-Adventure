export interface UploadResult {
  url: string;
  fileName: string;
  fileType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
}

export interface StorageProvider {
  uploadFile(file: File, folder?: string): Promise<UploadResult>;
  deleteFile(url: string): Promise<boolean>;
}

// Instantiate the appropriate provider
import { LocalStorageProvider } from "./local-provider";

export const storage: StorageProvider = new LocalStorageProvider();

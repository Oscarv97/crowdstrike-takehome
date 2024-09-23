import { useState, useEffect } from "react";
import { FileData, FileService } from "../../services/file-service";

export enum SortType {
  NAME,
  DEVICE,
  PATH,
  STATUS,
}

export const useFetchFiles = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const fileService = new FileService();
      try {
        const data = await fileService.fetchFiles();
        setFiles(data);
      } catch (error: unknown) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return { files, loading, error };
};

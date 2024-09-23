export type FileData = {
  name: string;
  device: string;
  path: string;
  status: string;
}

export interface TableColumn {
    width: number;
  }

export class FileService {
  async fetchFiles(): Promise<FileData[]> {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("There was an issue fetching the files");
    }
    const data: FileData[] = await response.json();
    return data;
  }
}

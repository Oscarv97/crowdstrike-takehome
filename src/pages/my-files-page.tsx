import React, { useState } from "react";
import { MyFilesTable } from "../files-table/my-files/my-files-table";
import { useFetchFiles } from "../files-table/hooks/use-fetch-files";
import { FileData } from "../services/file-service";

export const FilesPage: React.FC<unknown> = () => {
  const { files, loading } = useFetchFiles();
  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);

  const handleSelectFile = (file: FileData) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.some((selectedFile) => selectedFile.name === file.name)) {
        return prevSelectedFiles.filter((selectedFile) => selectedFile.name !== file.name);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row w-full h-full overflow-auto">
     <div className="flex flex-grow w-1">
      <div className="flex flex-col w-full h-full gap-6">
          <div className="overflow-auto">
            <MyFilesTable
              filesTableData={files!}
              onSelectFile={handleSelectFile}
              selectedFiles={selectedFiles}
              onDownloadClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

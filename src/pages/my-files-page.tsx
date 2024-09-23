import React, { useState } from "react";
import { MyFilesTable } from "../files-table/my-files/my-files-table";
import { useFetchFiles } from "../files-table/hooks/use-fetch-files";
import { FileData } from "../services/file-service";
import { downloadFiles } from "../services/download-service";

export const FilesPage: React.FC<unknown> = () => {
  const { files, loading } = useFetchFiles();
  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);

  const handleSelectFile = (file: FileData) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (
        prevSelectedFiles.some(
          (selectedFile) => selectedFile.name === file.name
        )
      ) {
        return prevSelectedFiles.filter(
          (selectedFile) => selectedFile.name !== file.name
        );
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };

  const handleDownload = () => {
    downloadFiles(selectedFiles)
      .then(() => {
        console.log("Download completed successfully.");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files);
    }
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
              handleSelectAll={handleSelectAll}
              selectedFiles={selectedFiles}
              onDownloadClick={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

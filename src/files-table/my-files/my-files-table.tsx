import React, { memo } from "react";
import { FileData, TableColumn } from "../../services/file-service";
import { FilesTable } from "../common/files-table";
import { MyFilesTableRow } from "./my-files-table-row";
import FileDownloadIconDownload from "../../components/icons/filedownload";
import CustomCheckBox from "../../components/CustomCheckBox";
import { getCheckboxState, hasScheduledFiles } from "./utils";

interface FilesTableProps {
  filesTableData?: FileData[];
  selectedFiles?: FileData[];
  onSelectFile: (file: FileData) => void;
  onDownloadClick: () => void;
  handleSelectAll: () => void;
}

type FilesColumn = TableColumn & { header: string; };
const Headers: FilesColumn[] = [
  { header: "",  width: 10 },
  { header: "Name", width: 20 },
  { header: "Device", width: 20 },
  { header: "Path",  width: 50 },
  { header: "Status", width: 20 },
]

export const MyFilesTable: React.FC<FilesTableProps> = memo(
  ({
    filesTableData,
    onSelectFile,
    selectedFiles,
    handleSelectAll,
    onDownloadClick,
  }) => {
    const isDownloadDisabled =
      hasScheduledFiles(selectedFiles) || !selectedFiles?.length;
    const checkboxState = getCheckboxState(selectedFiles, filesTableData);
    const showDownloadUnavailableMessage =
    isDownloadDisabled && selectedFiles?.length;

  return (
    <div className="container mx-auto p-4">
      <div className="text-xl font-bold mb-4 flex sm:flex-row items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <CustomCheckBox
            aria-label="Select all files"
            value={checkboxState}
            onClick={handleSelectAll}
          />
          <span className="ml-2 text-lg sm:text-xs">Selected {selectedFiles?.length}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <button
            className={`bg-transparent flex items-center text-sm sm:text-base ${
              isDownloadDisabled ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            aria-label="Download selected files"
            disabled={isDownloadDisabled}
            onClick={() => onDownloadClick()}
          >
            <FileDownloadIconDownload />
            <span className="ml-2">Download Selected</span>
          </button>
          {showDownloadUnavailableMessage ? (
            <p className="text-red-500 text-xs mt-1 sm:mt-0 sm:ml-4">
              Only available files can be downloaded
            </p>
          ) : null}
        </div>
      </div>
      {filesTableData?.length ? (
        <FilesTable columns={Headers}>
          {filesTableData.map((fileData) => (
            <MyFilesTableRow
              columns={Headers}
              key={fileData.name}
              fileData={fileData}
              isSelected={
                selectedFiles?.some(
                  (selectedFile) => selectedFile.name === fileData.name
                ) ?? false
              }
              onSelectItem={() => onSelectFile(fileData)}
            />
          ))}
        </FilesTable>
      ) : null}
    </div>
  );
});


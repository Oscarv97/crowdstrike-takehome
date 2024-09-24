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

type FilesColumn = TableColumn & { header: string };
const headers: FilesColumn[] = [
  { header: "", width: 10 },
  { header: "Name", width: 20 },
  { header: "Device", width: 20 },
  { header: "Path", width: 50 },
  { header: "Status", width: 20 },
];

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
        <div className="text-xl font-bold mb-4 flex items-center">
          <div className="ml-4 flex w-48 space-x-4 items-center font-semibold text-base">
            <CustomCheckBox
              aria-label="Select all files"
              value={checkboxState}
              onClick={handleSelectAll}
            />
            <span>
              Selected:  {selectedFiles?.length ? selectedFiles?.length : "None"}
            </span>
          </div>
          <div className="ml-16 w-48">
            <button
              className={`h-8 p-2 flex items-center text-sm sm:text-base ${
                isDownloadDisabled
                  ? "bg-slate-300 text-gray-400 cursor-not-allowed"
                  : "bg-blue-300 text-white cursor-pointer"
              }`}
              aria-label="Download selected files"
              disabled={isDownloadDisabled}
              onClick={() => onDownloadClick()}
            >
              <FileDownloadIconDownload />
              <span className="ml-2">Download Selected</span>
            </button>

          </div>
            {showDownloadUnavailableMessage ? (
            <p className="text-red-500 text-xs mt-1 sm:mt-0 sm:ml-4">
              Unable to download scheduled files.
            </p>
          ) : null}
        </div>
        {filesTableData?.length ? (
          <FilesTable columns={headers}>
            {filesTableData.map((fileData) => (
              <MyFilesTableRow
                columns={headers}
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
  }
);

import React, { memo } from "react";
import { FileData, TableColumn } from "../../services/file-service";
import { FilesTable } from "../common/files-table";
import { SortType } from "../hooks/use-fetch-files";
import { MyFilesTableRow } from "./my-files-table-row";
import FileDownloadIconDownload from "../../components/icons/filedownload";
import CustomCheckBox from "../../components/CustomCheckBox";

interface FilesTableProps {
  filesTableData?: FileData[];
  selectedFiles?: FileData[];
  onSelectFile: (file: FileData) => void;
  onDownloadClick: () => void;
  handleSelectAll: () => void;
}

type FilesColumn = TableColumn & { header: string; targetSortType: SortType };

const Headers: FilesColumn[] = [
  {
    header: "",
    targetSortType: SortType.NAME,
    width: 10,
  },
  {
    header: "Name",
    targetSortType: SortType.NAME,
    width: 20,
  },
  {
    header: "Device",
    targetSortType: SortType.DEVICE,
    width: 20,
  },
  {
    header: "Path",
    targetSortType: SortType.PATH,
    width: 50,
  },
  {
    header: "Status",
    targetSortType: SortType.STATUS,
    width: 20,
  },
];

const hasScheduledFiles = (selectedFiles?: FileData[]) => {
  return selectedFiles?.some((file) => file.status === "scheduled");
};

const getCheckboxState = (
  selectedFiles?: FileData[],
  totalFiles?: FileData[]
) => {
  if (!selectedFiles?.length) return "off";
  if (selectedFiles.length === totalFiles?.length) return "checked";
  return "on";
};

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

    return (
      <div className="container mx-auto p-4">
        <div className="text-xl font-bold mb-4 flex items-center">
          <CustomCheckBox aria-label="Select all files" value={checkboxState} onClick={handleSelectAll} />
          <span className="mr-4">Selected {selectedFiles?.length}</span>
          <button
            className={`bg-transparent flex items-center ${
              isDownloadDisabled ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            aria-label="Download selected files"
            disabled={isDownloadDisabled}
            onClick={() => onDownloadClick()}
          >
            <FileDownloadIconDownload />
            Download Selected
          </button>
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
  }
);

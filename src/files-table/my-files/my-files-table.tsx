import React, { memo } from "react";
import { FileData, TableColumn } from "../../services/file-service";
import { FilesTable } from "../common/files-table";
import { SortType } from "../hooks/use-fetch-files";
import { MyFilesTableRow } from "./my-files-table-row";
import FileDownloadIconDownload from "../../components/icons/filedownload";

interface FilesTableProps {
  filesTableData?: FileData[];
  selectedFiles?: FileData[];
  onSelectFile: (file: FileData) => void;
  onDownloadClick: () => void;
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

const handleSelectAll = () => {
  console.log("Select All");
};

export const MyFilesTable: React.FC<FilesTableProps> = memo(
  ({ filesTableData, onSelectFile, selectedFiles }) => {
    return (
      <div className="container mx-auto p-4">
        <div className="text-xl font-bold mb-4 flex items-center">
          <input
            type="checkbox"
            role="checkbox"
            checked={selectedFiles ? selectedFiles.length > 0 : false}
            onClick={handleSelectAll}
            className="mr-2"
          />
          <span className="mr-4">Selected {selectedFiles?.length}</span>
          <button className="bg-transparent flex items-center">
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

MyFilesTable.displayName = "MyFilesTable";

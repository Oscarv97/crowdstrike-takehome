import React, { memo } from "react";
import { FileData, TableColumn } from "../../services/file-service";
import { FilesTableRow } from "../common/file-table-row";
import { TableCell } from "../common/table-cell";

type ColumnsProps = TableColumn & { header: string };

interface Props {
  columns: ColumnsProps[];
  fileData?: FileData;
  isSelected: boolean;
  onSelectItem: () => void;
}

export const MyFilesTableRow: React.FC<Props> = memo(
  ({ columns, fileData, isSelected, onSelectItem }) => {
    return (
      <FilesTableRow onSelectItem={onSelectItem} isSelected={isSelected} fileData={fileData}>
        {columns.map(({ width }, index) => (
          <React.Fragment key={`${fileData?.name}-${index}`}>
            {index === 0 && (
              <TableCell dataTestId="select" width={width}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  role="checkbox"
                  className="cursor-pointer"
                  aria-label="Select file"
                  aria-checked={isSelected}
                  onChange={onSelectItem}
                  data-testid="select"
                />
              </TableCell>
            )}
            {index === 1 && (
              <TableCell dataTestId="name" width={width}>
                {fileData?.name ?? "-"}
              </TableCell>
            )}
            {index === 2 && (
              <TableCell dataTestId="device" width={width}>
                {fileData?.device ?? "-"}
              </TableCell>
            )}
            {index === 3 && (
              <TableCell dataTestId="path" width={width}>
                {fileData?.path ?? "-"}
              </TableCell>
            )}
            {index === 4 && (
              <TableCell dataTestId="status" width={width}>
                {fileData?.status === "available" ||
                fileData?.status === "scheduled" ? (
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-4 h-4 rounded-full mr-2 ${
                        fileData.status === "available"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
                    <span>
                      {fileData?.status === "available"
                        ? "Available"
                        : "Scheduled"}
                    </span>
                  </div>
                ) : (
                  fileData?.status ?? "-"
                )}
              </TableCell>
            )}
          </React.Fragment>
        ))}
      </FilesTableRow>
    );
  }
);

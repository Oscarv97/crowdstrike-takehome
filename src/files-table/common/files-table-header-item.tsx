import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

interface FilesTableHeaderItemProps {
  dataTestId?: string;
  headerName: string;
  index: number;
  className?: string;
  width: number;
}

export const FilesTableHeaderItem: React.FC<FilesTableHeaderItemProps> = memo(
  ({ dataTestId, headerName, index, className, width }) => {
    return (
      <th
        data-testid={dataTestId}
        key={index}
        style={{ width: `${width}%` }}
        className={twMerge(
          "flex px-4 relative text-xl  border-t h-12 border-gray-300 ",
          className
        )}
      >
        <div className="w-full flex items-center justify-between">
          <h3 className="truncate">{headerName}</h3>
        </div>
      </th>
    );
  }
);

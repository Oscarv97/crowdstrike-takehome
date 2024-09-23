import React, { memo } from "react";
import { FileData } from "../../services/file-service";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  fileData?: FileData;
  isSelected: boolean;
}

export const FilesTableRow: React.FC<Props> = memo(
  ({ children, fileData, isSelected }) => {
    return (
      <tr
        id={`file-item-${fileData?.name}`}
        className={`flex w-full py-2 px-4 border border-gray-400 rounded-lg text-left ${
          isSelected ? "bg-gray-200" : ""
        } hover:bg-gray-200 hover:shadow-lg my-2 transition-all duration-300`}
      >
        {children}
      </tr>
    );
  }
);
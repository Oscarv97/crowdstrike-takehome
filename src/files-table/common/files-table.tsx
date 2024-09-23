import React, { memo } from "react";
import { SortType } from "../hooks/use-fetch-files";
import { TableColumn } from "../../services/file-service";
import { FilesTableHeaderItem } from "./files-table-header-item";

type ColumnsProps = TableColumn & { header: string; targetSortType?: SortType };

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  columns: ColumnsProps[];
  tableRef?: React.RefObject<HTMLTableElement>;
}

export const FilesTable: React.FC<Props> = memo(
  ({ columns, tableRef, children }) => {
    return (
      <table
        ref={tableRef}
        data-testid="files-table"
        className={"flex flex-col max-h-full overflow-y-auto"}
      >
        <thead
          data-testid="files-table-header"
          className="sticky top-0 flex justify-between w-full border-2 border-transparent bg-gray050 text-sm font-semibold z-10"
        >
          <tr className="flex w-full">
            {columns.map(({ header, width }, index) => (
              <FilesTableHeaderItem
                dataTestId={`${header.replace(/ /g, "-").toLowerCase()}-header`}
                key={header}
                index={index}
                headerName={header}
                width={width}
              />
            ))}
          </tr>
        </thead>
        <tbody data-testid="files-table-body">{children}</tbody>
      </table>
    );
  }
);

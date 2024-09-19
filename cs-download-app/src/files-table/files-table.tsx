import React, { memo } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  tableRef?: React.RefObject<HTMLTableElement>;
}

export const FilesTable: React.FC<Props> = memo(({ tableRef, children }) => {
  return (
    <table
      ref={tableRef}
      className={"flex flex-col max-h-full overflow-y-auto"}
    >
      <thead
        data-testid="files-table-header"
        className="sticky top-0 flex justify-between w-full border-2"
      >
        <tr className="flex w-full">test asdkas askdasd asdkas ksdasld aslkd asd </tr>
        <tr className="flex w-full">test</tr>
        <tr className="flex w-full">test</tr>
        <tr className="flex w-full">test</tr>
      </thead>
      <tbody data-testid="files-table-body">{children}</tbody>
    </table>
  );
});

import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  dataTestId: string;
  isEndCell?: boolean;
  width?: number;
}

export const TableCell: React.FC<Props> = memo(
  ({ children, className, isEndCell = false, dataTestId, width }) => {
    return (
      <>
        <td
          data-testid={dataTestId}
          style={{ width: `${width}%` }}
          className={twMerge(
            "text-left text-sm font-normal",
            "truncate",
            "items-center",
            "sm:p-2",
            "md:px-3 md:py-4",
            className
          )}
        >
          {children}
        </td>
        {!isEndCell && <ColumnDivider key={`${dataTestId}-divider`} />}
      </>
    );
  }
);

const ColumnDivider: React.FC = () => {
  return <div className="w-0.5 bg-gray100" />;
};

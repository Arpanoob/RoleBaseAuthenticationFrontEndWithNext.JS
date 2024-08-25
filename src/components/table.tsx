"use client";
// Import necessary libraries and components
import React from "react";
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
}
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      {children}
    </table>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={className}>{children}</tr>;
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td className={`px-4 py-2 border-b ${className}`} {...props}>
      {children}
    </td>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-500">
      {children}
    </th>
  );
}

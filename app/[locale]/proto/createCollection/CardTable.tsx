"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  TableProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
// * define what will be displayed on the column
interface IColumnsType {
  key: string;
  label: string;
}
const columns: IColumnsType[] = [
  {
    key: "front",
    label: "front",
  },
  {
    key: "actions",
    label: "actions",
  },
];

const rows = [{ key: 1, front: "front", actions: "action" }];
const CardTable = ({ className }: TableProps) => {
  return (
    <Table
      className={cn(className, "")}
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CardTable;

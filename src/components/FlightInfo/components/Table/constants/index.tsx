import { ColumnDef } from "@tanstack/react-table";
import { FlightTable } from "../types";

export const flightInfoColumns: ColumnDef<FlightTable>[] = [
  {
    accessorKey: "title",

    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "value",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("value")}</div>
      );
    },
  },
];

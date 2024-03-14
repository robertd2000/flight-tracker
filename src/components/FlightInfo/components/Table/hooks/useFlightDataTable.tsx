import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flightInfoColumns } from "../constants";
import { FlightData } from "@/types/flights/states.interface";
import { FlightTable } from "../types";

export const useFlightDataTable = (flightData: FlightData | null) => {
  const tableData: FlightTable[] = [
    {
      title: "Последняя связь",
      value: flightData?.last_contact,
    },
    // {
    //   title: "Регистрация",
    //   value:flightData?.,
    // },
    {
      title: "Модель",
      value: flightData?.category,
    },
    {
      title: "Код модели",
      value: flightData?.category,
    },
    // {
    //   title: "Оператор",
    //   value: "",
    // },
    {
      title: "Позывной",
      value: flightData?.callsign,
    },
    {
      title: "Скорость",
      value: flightData?.velocity,
    },
    {
      title: "Направление",
      value: flightData?.true_track,
    },
    {
      title: "Высота",
      value: flightData?.geo_altitude,
    },
    {
      title: "Барометрическая высота",
      value: flightData?.baro_altitude,
    },
    {
      title: "Вертикальная скорость",
      value: flightData?.vertical_rate,
    },
    {
      title: "Squawk",
      value: flightData?.squawk,
    },
    // {
    //   title: "Источник",
    //   value: flightData?.pos,
    // },
  ];

  const table = useReactTable({
    columns: flightInfoColumns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    flightInfoColumns,
  };
};

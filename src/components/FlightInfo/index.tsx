import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FlightInfoTable } from "./components/Table";
import { CountryCodes } from "@/constants/utils/countries";
import { AircraftCategories } from "@/constants/flights/categories";
import { FlightInfoProps } from "./FlightInfo.interface";
import { FlightInfoSkeleton } from "./components/Skeleton";
import { ScrollArea } from "../ui/scroll-area";

export const FlightInfo: FC<FlightInfoProps> = ({
  flightData,
  isSheetOpen,
  isLoading,
  onSheetOpen,
}) => {
  const code = CountryCodes?.[flightData?.origin_country as string];

  return (
    <Sheet open={isSheetOpen} onOpenChange={onSheetOpen} modal={false}>
      <SheetContent side={"left"}>
        {isLoading ? (
          <FlightInfoSkeleton />
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>
                <div className="flex gap-2">
                  <img
                    width={20}
                    src={
                      new URL(
                        `../../assets/${
                          AircraftCategories[flightData?.category as number]
                        }.png`,
                        import.meta.url
                      ).href
                    }
                    alt=""
                  />
                  {flightData?.icao24}
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="flex flex-wrap items-center justify-start align-middle gap-2">
                  <img
                    src={`https://flagsapi.com/${code}/flat/64.png`}
                    alt=""
                  />

                  <div className="align-middle ">
                    Country of origin - <b>{flightData?.origin_country}</b>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="grid gap-4 h-[200px] w-[350px] py-4">
              <FlightInfoTable flightData={flightData} />
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

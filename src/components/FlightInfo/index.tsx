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
// import { AircraftCategories } from "@/constants/flights/categories";
import { FlightInfoProps } from "./FlightInfo.interface";
import { FlightInfoSkeleton } from "./components/Skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useHeight } from "@/hooks/useHeight";

export const FlightInfo: FC<FlightInfoProps> = ({
  flightData,
  isSheetOpen,
  isLoading,
  onSheetOpen,
}) => {
  const code = CountryCodes?.[flightData?.origin_country as string];

  const { ref, height } = useHeight([flightData?.icao24]);

  const aircraftIcon = new URL(
    // `../../assets/${
    //   AircraftCategories[(flightData?.category as number) || 0]
    // }.png`,
    "../../assets/no_category.png",
    import.meta.url
  ).href;

  return (
    <Sheet open={isSheetOpen} onOpenChange={onSheetOpen} modal={false}>
      <SheetContent side={"left"} ref={ref} className="h-full">
        {isLoading ? (
          <FlightInfoSkeleton />
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>
                <div className="flex gap-2">
                  <img width={20} className="z-50" src={aircraftIcon} alt="" />
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
            <ScrollArea
              className={`grid gap-4  w-[350px] py-4`}
              style={{
                height: height - 130,
              }}
            >
              <FlightInfoTable flightData={flightData} />
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

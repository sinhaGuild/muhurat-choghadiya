import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AvatarDoubleHeartComponent,
  AvatarHazardComponent,
  AvatarHeartComponent,
  AvatarLegend,
  AvatarMoonComponent,
  AvatarSunComponent
} from "./avatars";

import { cn } from "@/lib/utils";

type PredictionTableType = { data: any };

export function PredictionTable({ data }: PredictionTableType) {
  console.log(JSON.stringify(data));
  return (
    <Table>
      <TableCaption>
        <AvatarLegend />
      </TableCaption>
      {/* <TableCaption>Prediction @ {data.createdAt}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">START</TableHead>
          <TableHead className="w-[100px]">END</TableHead>
          <TableHead className="w-[200px]">MUHURAT</TableHead>
          {/* <TableHead>R/V</TableHead>
          <TableHead className="text-right">Rahu</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.prediction.map((prediction: any, index: number) => (
          <TableRow
            key={index}
            className={cn(
              "",
              prediction.choghadiya == "Amrit" &&
                prediction.drishyam != "Vaar Vela" &&
                !prediction.rahu
                ? "bg-green-300"
                : "bg-inherit"
              // prediction.rahu? 'bg-red-500': 'bg-white',
            )}
          >
            <TableCell className="font-mono text-[1rem]">
              {prediction.start_time}
            </TableCell>
            <TableCell className="font-mono text-[1rem]">
              {prediction.end_time}
            </TableCell>
            <TableCell className="uppercase">
              <div className="grid grid-cols-4 gap-2 items-center">
                <div className="text-lg tracking-wide">
                  {prediction.choghadiya}
                </div>
                <div className="grid grid-cols-4 gap-1 col-span-3 tracking-wide font-light justify-self-start items-center">
                  {prediction.time_of_day && (
                    <>
                      {prediction.time_of_day == "daytime" ? (
                        <AvatarSunComponent />
                      ) : (
                        <AvatarMoonComponent />
                      )}
                    </>
                  )}

                  {prediction.choghadiya == "Amrit" &&
                    prediction.drishyam != "Vaar Vela" && (
                      <AvatarDoubleHeartComponent />
                    )}
                  {prediction.choghadiya == "Shubh" &&
                    prediction.drishyam != "Kaal Ratri" &&
                    !prediction.rahu && <AvatarHeartComponent />}
                  {(prediction.drishyam == "Kaal Vela" ||
                    prediction.drishyam == "Kaal Ratri" ||
                    prediction.rahu) && <AvatarHazardComponent />}
                  {prediction.rahu && (
                    <Badge className="justify-center">
                      {prediction.rahu.slice(0, 4)}
                    </Badge>
                  )}
                  {prediction.drishyam && (
                    <Badge variant="destructive" className="justify-center">
                      {prediction.drishyam.slice(0, 4)}
                    </Badge>
                  )}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>{data.metadata.location}</TableCell> */}
          <TableCell colSpan={3} className="text-right">
            <span>
              {data.metadata.location}({data.metadata.state},{" "}
              {data.metadata.country})
            </span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

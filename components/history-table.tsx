import { TableCell, TableRow } from "@/components/ui/table";
import { DrawerComponent } from "./drawer-component";

type PredictionTableType = { data: any };

export function HistoryTable({ data }: PredictionTableType) {
  return (
    <TableRow className="">
      <TableCell className="font-mono w-[200px]">
        {data.metadata.locationId}
      </TableCell>
      <TableCell className="font-mono w-[340px]">
        {/* {data.createdAt.slice(0, 10)} */}
        {data.date}
      </TableCell>
      <TableCell className="font-mono w-[300px]">
        {data.createdAt.slice(11, 16)}
      </TableCell>
      <TableCell className="font-mono w-1/3">
        <div className="grid grid-cols-3 gap-2 text-lg tracking-wide py-4">
          <div className="grid col-span-2 uppercase">
            {data.metadata.location},{data.metadata.country}
          </div>
          <div className="grid col-span-1">
            {data.prediction && (
              <DrawerComponent prediction={JSON.parse(JSON.stringify(data))} />
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

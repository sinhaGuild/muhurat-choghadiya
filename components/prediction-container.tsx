import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryTable } from "./history-table";
import { PredictionTable } from "./prediction-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

type PredictionsType = { prediction?: any; history?: any };

export const SinglePrediction = ({ prediction }: PredictionsType) => {
  return (
    <div className="col-span-2 grid items-start gap-6 lg:col-span-2">
      <Card className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <CardHeader>
          <CardTitle>Current Prediction</CardTitle>
          <CardDescription>
            Prediction for {prediction.metadata.location} created @{" "}
            {prediction.createdAt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="items-center gap-4">
            <ScrollArea className="h-[550px] rounded-md border">
              {prediction && (
                <PredictionTable
                  data={JSON.parse(JSON.stringify(prediction))}
                />
              )}
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export const PredictionHistory = ({ history }: PredictionsType) => {
  return (
    <div>
      <ul className="gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">ID</TableHead>
              <TableHead className="text-lg">DATE</TableHead>
              <TableHead className="text-lg">TIME</TableHead>
              <TableHead className="text-lg">LOCATION</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        {/* <TableBody className=""> */}
        {history.length === 0 ? (
          <p className="text-center">No predictions Found</p>
        ) : (
          history
            .slice(0)
            .reverse()
            .map((pred: any) => (
              <div key={pred.id}>
                <HistoryTable data={JSON.parse(JSON.stringify(pred))} />
              </div>
            ))
        )}
        {/* </TableBody> */}
      </ul>
    </div>
  );
};

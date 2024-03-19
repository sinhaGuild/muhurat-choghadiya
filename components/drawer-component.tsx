import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PredictionTable } from "./prediction-table";
import { ScrollArea } from "./ui/scroll-area";

type DrawerComponentData = { prediction?: any };

export function DrawerComponent({ prediction }: DrawerComponentData) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Prediction Recap</DrawerTitle>
            <DrawerDescription>
              Historical predictions available for review
            </DrawerDescription>
          </DrawerHeader>
          <div className="items-center gap-4">
            <ScrollArea className="h-[550px] w-full rounded-md border">
              {prediction && (
                <PredictionTable
                  data={JSON.parse(JSON.stringify(prediction))}
                />
              )}
            </ScrollArea>
          </div>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

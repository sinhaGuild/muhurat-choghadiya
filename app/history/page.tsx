"use client";

import { useChStore } from "@/app/store";
import AnalyticsComponent, {
  ToolTipComponent,
} from "@/components/analytics-component";
import { PredictionHistory } from "@/components/prediction-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MinusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function History() {
  const {
    history,
    allAnalytics,
    fetchAnalytics,
    fetchPredictions,
    resetAnalytics,
    resetPredictions,
  } = useChStore((state) => state);

  const [resetHistory, setResetHistory] = useState(false);
  const [resetData, setResetData] = useState(false);

  const checkValid = (array: Array<any>) => {
    return Array.isArray(array) && array.length > 0;
  };

  const handleResetAnalytics = async () => {
    resetAnalytics();
    setResetData(true);
  };

  const handleResetHistory = async () => {
    resetPredictions();
    setResetHistory(true);
  };

  useEffect(() => {
    fetchAnalytics();
    fetchPredictions();
    // setReset(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    fetchAnalytics();
    setResetData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetData]);
  
  useEffect(() => {
    fetchAnalytics();
    setResetData(false);
    fetchPredictions();
    setResetHistory(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetHistory]);

  return (
    <div>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex items-end space-x-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Analytics
          </h1>
          <ToolTipComponent help="Reset Analytics">
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={async () => await handleResetAnalytics()}
              disabled={!checkValid(allAnalytics)}
            >
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
          </ToolTipComponent>
        </div>
        {Array.isArray(allAnalytics) ? (
          <AnalyticsComponent allAnalytics={allAnalytics} />
        ) : (
          <>No Analytics available yet. Make some predictions first!</>
        )}
        <Separator className="my-4" />
        <div className="flex items-end space-x-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            History
          </h1>
          <ToolTipComponent help="Reset History">
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={async () => await handleResetHistory()}
              disabled={!checkValid(history)}
            >
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
          </ToolTipComponent>
        </div>
        {!checkValid(history) ? (
          <>No History Found yet. Make some predictions first!</>
        ) : (
          <PredictionHistory history={history} />
        )}
      </section>
    </div>
  );
}

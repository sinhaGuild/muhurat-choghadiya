import {
  Tooltip as BtnToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnalyticsData } from "@/types/store-types";
import { PropsWithChildren } from "react";
import {
  Bar,
  ComposedChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type AnalyticsCardProps = {
  title: string;
  value: number;
  description?: string;
  classnames?: string;
  percentage?: number;
};

type AnalyticsComponentProps = {
  allAnalytics: AnalyticsData[];
};

function AnalyticsCard({
  title,
  value,
  description,
  classnames,
  percentage,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase tracking-wider">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("text-7xl font-bold text-center", classnames)}>
        <p>{value}</p>
        <div className="flex font-mono text-sm place-content-center py-2 tracking-wider">
          ({percentage}% of Total)
        </div>
      </CardContent>
    </Card>
  );
}

type ToolTipType = {
  help: string;
};

export function ToolTipComponent(props: PropsWithChildren<ToolTipType>) {
  return (
    <TooltipProvider>
      <BtnToolTip>
        <TooltipTrigger asChild>
          {/* <Button variant="outline">Hover</Button> */}
          {props.children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.help}</p>
        </TooltipContent>
      </BtnToolTip>
    </TooltipProvider>
  );
}

export default function AnalyticsComponent({
  allAnalytics,
}: AnalyticsComponentProps) {
  const totalAmrit = allAnalytics.reduce((acc, curr) => acc + curr.amrit, 0);
  const totalKaal =
    allAnalytics.reduce((acc, curr) => acc + curr.kaal_ratri, 0) +
    allAnalytics.reduce((acc, curr) => acc + curr.cnt_rahus, 0);

  const amritPercentage = Math.round(
    (totalAmrit / allAnalytics.reduce((acc, curr) => acc + curr.total_muh, 0)) *
      100
  );
  const kaalPercentage = Math.round(
    (totalKaal / allAnalytics.reduce((acc, curr) => acc + curr.total_muh, 0)) *
      100
  );

  return (
    <div className="p-4 pb-0 self-end">
      <div className="flex items-center justify-end space-x-2">
        <div className="grid grid-cols-2 gap-4">
          <AnalyticsCard
            title="Amrit"
            value={totalAmrit}
            percentage={amritPercentage}
            description="Total auspicious days."
            classnames="text-green-600 dark:text-green-300"
          />
          <AnalyticsCard
            title="Rahu"
            value={totalKaal}
            percentage={kaalPercentage}
            description="Total inauspicious days."
            classnames="text-amber-600 dark:text-amber-300"
          />
        </div>
      </div>
      <div className="mt-8 h-[300px] font-mono tracking-tight">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={allAnalytics}
            // width={730}
            // height={250}
            // data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amrit" fill="hsl(var(--graph_primary))" name="Amrit">
              <LabelList dataKey="amrit" position="top" />
            </Bar>

            <Bar
              dataKey="kaal_ratri"
              fill="hsl(var(--graph_red))"
              name="Kaal Ratri"
            >
              <LabelList dataKey="kaal_ratri" position="top" />
            </Bar>

            <Bar
              dataKey="total_rahu"
              stackId="rah"
              fill="hsl(var(--graph_grey))"
              name="Total Rahus"
            ></Bar>
            <Bar
              dataKey="cnt_rahus"
              stackId="rah"
              fill="hsl(var(--graph_yellow))"
              name="Rahus"
            >
              <LabelList dataKey="cnt_rahus" position="top" />
            </Bar>
            <Bar
              dataKey="total_dri"
              stackId="dri"
              fill="hsl(var(--graph_grey))"
              name="Total Drishyams"
            ></Bar>

            <Bar
              dataKey="cnt_dri"
              stackId="dri"
              fill="hsl(var(--graph_purple))"
              name="Drishyams"
            >
              <LabelList dataKey="cnt_dri" position="top" />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// export default AnalyticsComponent;

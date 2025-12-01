"use client";
import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { convertJsonData } from "@/lib/utils";

interface Props {
  requests: any;
}

const chartConfig = {
  messages: {
    label: "Messages",
  },
  maintenance: {
    label: "Maintenance",
    color: "var(--chart-1)",
  },
  housekeeping: {
    label: "Housekeeping",
    color: "var(--chart-2)",
  },
  room_service: {
    label: "Room Service",
    color: "var(--chart-3)",
  },
  reservations: {
    label: "Reservations",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function DummyChart({ requests }: Props) {
  const chartData = convertJsonData(requests);

  const totalRequest = React.useMemo(() => {
    return requests.length;
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          label
          data={chartData}
          dataKey="messages"
          nameKey="category"
          innerRadius={60}
          strokeWidth={1}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalRequest.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Messages
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export default DummyChart;

"use client";
import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  {
    category: "transportation",
    messages: 275,
    fill: "var(--color-transportation)",
  },
  { category: "cleanup", messages: 200, fill: "var(--color-cleanup)" },
  { category: "roomService", messages: 287, fill: "var(--color-roomService)" },
  {
    category: "reservations",
    messages: 173,
    fill: "var(--color-reservations)",
  },
  { category: "other", messages: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  messages: {
    label: "Messages",
  },
  transportation: {
    label: "transportation",
    color: "var(--chart-1)",
  },
  cleanup: {
    label: "Clean Up",
    color: "var(--chart-2)",
  },
  roomService: {
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

function DummyChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.messages, 0);
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
                      {totalVisitors.toLocaleString()}
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

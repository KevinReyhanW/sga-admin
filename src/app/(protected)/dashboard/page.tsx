"use client";
import React from "react";
import ShortcutMenu from "@/components/shortcut-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/app/mock/dashboard";
import { ChartPie, HandPlatter, UtensilsCrossed } from "lucide-react";
import DummyChart from "@/components/dummy-chart";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import guestService from "@/app/services/guest";
import NewRequest from "@/components/new-request";
import RecentRoomService from "@/components/recent-room-service";
import LoaderComponent from "@/components/loader-component";
import { useShape } from "@electric-sql/react";
import { useStore } from "zustand/react";
import useAppStateStore from "@/app/store/app.store";
import { startOfWeek } from "date-fns";

function Page() {
  const stateStore = useStore(useAppStateStore);

  const { data: requests, isLoading: requestsLoading } = useShape({
    url: `${process.env.NEXT_PUBLIC_ELECTRIC}/v1/shape`,
    params: {
      table: process.env.NEXT_PUBLIC_ELECTRIC_TABLE,
    },
  });

  const { data: guests, isLoading: guestLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      return await guestService.fetchGuestList();
    },
  });

  const getInsightValue = (type: string) => {
    switch (type) {
      case "Total Registered Guests":
        return guests?.data.length;
      case "Active Requests":
        return requests.filter((r) => r.category !== "room_service").length;
      case "Room Service Orders":
        return requests.filter((r) => r.category === "room_service").length;
      case "Avg Response Time":
        return "4.56";
    }
  };

  const getTrendValue = (type: string) => {
    switch (type) {
      case "Total Registered Guests":
        try {
          const start = startOfWeek(new Date(), { weekStartsOn: 1 });
          const count = guests?.data.filter((g: any) => {
            const created = g?.created_at ? new Date(g.created_at) : null;
            return created && created >= start;
          }).length;
          return `+${count ?? 0} this week`;
        } catch (e) {
          return `+0 this week`;
        }
      case "Active Requests":
        return `${requests.filter((r) => r.category !== "room_service" && r.status === "pending").length} pending pickup`;
      case "Room Service Orders":
        return `${requests.filter((r) => r.category === "room_service" && r.status === "pending").length} pending, ${requests.filter((r) => r.category === "room_service" && r.status === "in_progress").length} preparing`;
      case "Avg Response Time":
        return "-3min from last week";
    }
  };

  return (
    <>
      <ShortcutMenu
        handleOpenDialog={() => stateStore.setRegisterDialogOpen(true)}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="shadow-soft hover:shadow-medium transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={cn(
                  "p-2 rounded-lg",
                  stat.color === "success"
                    ? "bg-success/20"
                    : stat.color === "warning"
                      ? "bg-warning/20"
                      : "bg-info/20",
                )}
              >
                <stat.icon
                  className={cn(
                    "w-4 h-4",
                    stat.color === "success"
                      ? "text-success"
                      : stat.color === "warning"
                        ? "text-warning"
                        : "text-info",
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {requestsLoading ? "-" : getInsightValue(stat.title)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {getTrendValue(stat.title)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="w-5 h-5 text-primary" />
              Request by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DummyChart requests={requests} />
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandPlatter className="w-5 h-5 text-primary" />
              New Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : (
              <>
                <NewRequest
                  requests={requests
                    .filter((r) => r.category !== "room_service")
                    .slice(0, 3)}
                />
                <a
                  href="/request"
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  View all requests →
                </a>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Recent Room Service
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : (
              <>
                <RecentRoomService
                  requests={requests
                    .filter((r) => r.category === "room_service")
                    .slice(0, 3)}
                />
                <a
                  href="/room-service"
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  View all orders →
                </a>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Page;

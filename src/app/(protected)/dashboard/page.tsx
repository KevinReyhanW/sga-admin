"use client";
import React, { useEffect, useMemo, useState } from "react";
import ShortcutMenu from "@/components/shortcut-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/app/mock/dashboard";
import {
  ChartPie,
  ClipboardX,
  HandPlatter,
  Inbox,
  UtensilsCrossed,
} from "lucide-react";
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
import { startOfDay, endOfDay, startOfWeek, isToday, subDays } from "date-fns";
import { sort } from "fast-sort";
import DatePicker from "@/components/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type StatusFilter = "all" | "pending" | "in_progress" | "completed";

function Page() {
  const stateStore = useStore(useAppStateStore);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [requestStatusFilter, setRequestStatusFilter] =
    useState<StatusFilter>("all");
  const [roomServiceStatusFilter, setRoomServiceStatusFilter] =
    useState<StatusFilter>("all");

  const { data: allRequests, isLoading: requestsLoading } = useShape({
    url: `${process.env.NEXT_PUBLIC_ELECTRIC}/v1/shape`,
    params: {
      table: process.env.NEXT_PUBLIC_ELECTRIC_TABLE,
    },
  });

  useEffect(() => {
    console.log("[debug] -> ", allRequests);
  }, [allRequests]);

  // Filter requests by the selected date
  const requests = useMemo(() => {
    if (!allRequests || !Array.isArray(allRequests)) return [];
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);
    return allRequests.filter((r: any) => {
      const created = r.created_at ? new Date(r.created_at) : null;
      return created && created >= dayStart && created <= dayEnd;
    });
  }, [allRequests, selectedDate]);

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
        return requests.filter((r: any) => r.category !== "room_service")
          .length;
      case "Room Service Orders":
        return requests.filter(
          (r: any) =>
            r.category === "room_service" || r.category === "restaurant",
        ).length;
      case "Avg Response Time":
        return "4.56*";
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
        return `${requests.filter((r: any) => r.category !== "room_service" && r.status === "pending").length} pending pickup`;
      case "Room Service Orders":
        return `${requests.filter((r: any) => (r.category === "room_service" || r.category === "restaurant") && r.status === "pending").length} pending, ${requests.filter((r: any) => r.category === "room_service" && r.status === "in_progress").length} preparing`;
      case "Avg Response Time":
        return "-3 min from yesterday";
    }
  };

  // Filtered requests for the Requests card
  const filteredRequests = useMemo(() => {
    const nonRoomService = sort(
      requests.filter((r: any) => r.category !== "room_service"),
    ).desc((r: any) => r.created_at);

    if (requestStatusFilter === "all") return nonRoomService.slice(0, 3);
    return nonRoomService
      .filter((r: any) => r.status === requestStatusFilter)
      .slice(0, 3);
  }, [requests, requestStatusFilter]);

  // Filtered requests for the Room Service card
  const filteredRoomService = useMemo(() => {
    const roomService = sort(
      requests.filter(
        (r: any) =>
          r.category === "room_service" || r.category === "restaurant",
      ),
    ).desc((r: any) => r.created_at);

    if (roomServiceStatusFilter === "all") return roomService.slice(0, 3);
    return roomService
      .filter((r: any) => r.status === roomServiceStatusFilter)
      .slice(0, 3);
  }, [requests, roomServiceStatusFilter]);

  const statusFilters: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
  ];

  const StatusFilterButtons = ({
    active,
    onChange,
  }: {
    active: StatusFilter;
    onChange: (v: StatusFilter) => void;
  }) => (
    <div className="flex gap-1 flex-wrap">
      {statusFilters.map((f) => (
        <Button
          key={f.value}
          variant={active === f.value ? "default" : "outline"}
          size="sm"
          className="h-6 text-xs px-2 rounded-full"
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <ShortcutMenu
        handleOpenDialog={() => stateStore.setRegisterDialogOpen(true)}
      />

      {/* Date Picker Row */}
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Dashboard Overview
          </h2>
          {isToday(selectedDate) && (
            <Badge variant="outline" className="text-xs">
              Today
            </Badge>
          )}
        </div>
        <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-4">
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
          <CardContent className="h-full">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <Inbox className="w-10 h-10 mb-2" />
                <p className="text-sm">No requests for this date</p>
              </div>
            ) : (
              <DummyChart requests={requests} />
            )}
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HandPlatter className="w-5 h-5 text-primary" />
                Requests
              </div>
            </CardTitle>
            <StatusFilterButtons
              active={requestStatusFilter}
              onChange={setRequestStatusFilter}
            />
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <ClipboardX className="w-10 h-10 mb-2" />
                <p className="text-sm">No requests for this date</p>
              </div>
            ) : (
              <>
                <NewRequest requests={filteredRequests} />
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
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                Room Service
              </div>
            </CardTitle>
            <StatusFilterButtons
              active={roomServiceStatusFilter}
              onChange={setRoomServiceStatusFilter}
            />
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : filteredRoomService.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <UtensilsCrossed className="w-10 h-10 mb-2" />
                <p className="text-sm">No room service orders for this date</p>
              </div>
            ) : (
              <>
                <RecentRoomService requests={filteredRoomService} />
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

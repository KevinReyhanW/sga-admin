"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChefHat, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useShape } from "@electric-sql/react";
import { format } from "date-fns";
import requestService from "@/app/services/request";

interface Request {
  category: string;
  guest_name: string;
  status:
    | "pending"
    | "in_progress"
    | "completed"
    | "preparing"
    | "delivered"
    | "rejected";
  items: string[];
  order_id: string;
  room?: { room_number?: string | number } | null;
  order_items?: { title?: string; description?: string }[] | null;
  created_at: string | Date;
  updated_at: string | Date;
  assignedTo?: string;
}

function Page() {
  const [searchTerm] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);

  const { data: requestsShape = [] } = useShape({
    url: `${process.env.NEXT_PUBLIC_ELECTRIC}/v1/shape`,
    params: {
      table: process.env.NEXT_PUBLIC_ELECTRIC_TABLE,
    },
  });

  useEffect(() => {
    const nextRequests = (requestsShape as any[]).filter((item) => {
      return item?.category === "room_service";
    });
    setRequests(nextRequests as Request[]);
  }, [requestsShape]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { variant: "default" as const, icon: Clock, label: "Pending" };
      case "in_progress":
        return {
          variant: "secondary" as const,
          icon: ChefHat,
          label: "Preparing",
        };
      case "completed":
        return {
          variant: "outline" as const,
          icon: CheckCircle,
          label: "Delivered",
        };
      case "rejected":
        return {
          variant: "destructive" as const,
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return { variant: "default" as const, icon: Clock, label: status };
    }
  };

  const filteredOrders = requests.filter((order) => {
    const term = (searchTerm || "").toLowerCase();
    const guest = (order.guest_name || "").toLowerCase();
    const room = String(order.room?.room_number ?? "").toLowerCase();
    const id = (order.order_id || "").toLowerCase();
    return guest.includes(term) || room.includes(term) || id.includes(term);
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((o) => o.status === "pending").length,
    preparing: requests.filter((o) => o.status === "in_progress").length,
    delivered: requests.filter((o) => o.status === "completed").length,
  };

  const onHandleUpdateStatus = async (id: string, status: string) => {
    await requestService.updateStatus(id, status);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.total}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Preparing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.preparing}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.delivered}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mt-4">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={order.order_id}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Badge
                    variant="outline"
                    className="text-xs bg-slate-100 border-gray-400 border font-semibold mb-2"
                  >
                    Room {String(order.room?.room_number ?? "-")}
                  </Badge>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">
                      {order.guest_name}
                    </h3>

                    <Badge
                      className={cn(
                        "gap-1 text-white",
                        order.status === "pending"
                          ? "bg-info"
                          : order.status === "completed"
                            ? "bg-success"
                            : "bg-warning",
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">
                      Order #{order.order_id.slice(0, 4)}
                    </p>
                    {(order.order_items ?? []).map((item, index: number) => {
                      return (
                        <div className="text-xs text-muted-foreground border-l-2 border-l-primary pl-2 my-2">
                          <h3 className="text-sm text-muted-foreground font-semibold">
                            {item?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item?.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(
                        new Date(order.created_at),
                        "dd/MM/yyyy hh:mm aaa",
                      )}
                    </span>
                    <span className="font-semibold text-foreground">
                      {/*{order.totalAmount}*/}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() =>
                        onHandleUpdateStatus(order.order_id, "in_progress")
                      }
                      className="text-xs"
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "in_progress" && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() =>
                        onHandleUpdateStatus(order.order_id, "completed")
                      }
                      className="text-xs"
                    >
                      Mark Delivered
                    </Button>
                  )}
                  {order.status !== "completed" &&
                    order.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onHandleUpdateStatus(order.order_id, "rejected")
                        }
                        className="text-xs"
                      >
                        Cancel
                      </Button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;

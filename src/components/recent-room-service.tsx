import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn, timeAgo } from "@/lib/utils";
import { ChefHat, Clock } from "lucide-react";

interface Props {
  requests: any;
}

function RecentRoomService({ requests }: Props) {
  console.log("[debug] -> ", requests);
  return (
    <div className="space-y-4">
      {requests.map((order: any, i: number) => {
        return (
          <div key={i} className="py-3 border-b border-border last:border-0">
            <div className="flex justify-between">
              <div className="space-y-1">
                <div className="flex gap-x-2">
                  <p className="text-sm font-medium text-foreground">
                    {order.guest_name}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Room {order.room.room_number}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {order.order_items.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <h2 className="font-semibold">{item.title}</h2>
                        <span className="inline-block mr-2">
                          {item.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {timeAgo(order.created_at)}
                </p>
                <Badge
                  variant={
                    order.status === "preparing" ? "secondary" : "default"
                  }
                  className={cn(
                    "text-xs",
                    order.status === "pending"
                      ? "bg-info"
                      : order.status === "preparing"
                        ? "bg-warning text-white"
                        : "bg-success",
                  )}
                >
                  {order.status === "preparing" ? (
                    <ChefHat className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentRoomService;

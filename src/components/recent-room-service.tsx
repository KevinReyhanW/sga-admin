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
            <div className="flex items-start justify-between mb-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {order.guest_name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Room {order.room.room_number}
                  </Badge>
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
              <p className="text-xs text-muted-foreground">
                {timeAgo(order.created_at)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </div>
        );
      })}
    </div>
  );
}

export default RecentRoomService;

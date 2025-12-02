import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn, timeAgo } from "@/lib/utils";
import { ChefHat, Clock } from "lucide-react";
import { title } from "radash";

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
            <Badge
              variant="outline"
              className="text-xs bg-slate-100 border-gray-400 border font-semibold mb-2"
            >
              Room {order.room.room_number}
            </Badge>
            <div className="w-full mb-2">
              <div className="font-semibold text-sm">{order.guest_name}</div>
            </div>
            <div className="text-xs text-muted-foreground border-l-2 border-l-error pl-2">
              <h3 className="font-semibold">
                {title(order.order_items[0]?.title)}
              </h3>
              {order.order_items[0]?.description}
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-muted-foreground flex items-center gap-x-1">
                <Clock size={14} />
                {timeAgo(order.created_at)}
              </div>
              <Badge
                variant={order.status === "preparing" ? "secondary" : "default"}
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
                {title(order.status)}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentRoomService;

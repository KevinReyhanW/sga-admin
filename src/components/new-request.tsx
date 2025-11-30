import React from "react";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";

interface Props {
  requests: any;
}
function NewRequest({ requests }: Props) {
  console.log("[debug] -> ", requests);
  return (
    <div className="space-y-4">
      {requests.map((activity: any, i: number) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-border last:border-0"
        >
          <div className="space-y-1">
            <div className="flex gap-x-2">
              <p className="text-sm font-medium text-foreground">
                {activity.guest_name}
              </p>
              <Badge variant="outline" className="text-xs">
                Room {activity.room.room_number}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              <h3 className="font-semibold">{activity.order_items[0].title}</h3>
              {activity.order_items[0].description}
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">
              {timeAgo(activity.created_at)}
            </p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === "completed"
                  ? "bg-green-50 text-green-700 border border-green-500"
                  : activity.status === "in-progress"
                    ? "bg-orange-50 text-orange-700 border border-orange-500"
                    : "bg-sky-50 text-sky-700 border border-sky-500"
              }`}
            >
              {activity.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewRequest;

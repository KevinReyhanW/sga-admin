import React from "react";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { title } from "radash";
import { Clock } from "lucide-react";

interface Props {
  requests: any;
}
function NewRequest({ requests }: Props) {
  console.log("[debug] -> ", requests);
  return (
    <div>
      {requests.map((activity: any, i: number) => (
        <div key={i} className="py-3 border-b border-border last:border-0">
          <Badge
            variant="outline"
            className="text-xs bg-slate-100 border-gray-400 border font-semibold mb-2"
          >
            Room {activity.room.room_number}
          </Badge>
          <div className="w-full mb-2">
            <div className="font-semibold text-sm">{activity.guest_name}</div>
          </div>
          <div className="text-xs text-muted-foreground border-l-2 border-l-primary pl-2">
            <h3 className="font-semibold">
              {title(activity.order_items[0]?.title)}
            </h3>
            {activity.order_items[0]?.description}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-muted-foreground flex items-center gap-x-1">
              <Clock size={14} />
              {timeAgo(activity.created_at)}
            </div>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === "completed"
                  ? "bg-green-50 text-green-700 border border-green-500"
                  : activity.status === "in-progress"
                    ? "bg-orange-50 text-orange-700 border border-orange-500"
                    : "bg-sky-50 text-sky-700 border border-sky-500"
              }`}
            >
              {title(activity.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewRequest;

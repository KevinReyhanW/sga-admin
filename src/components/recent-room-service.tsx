import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChefHat, Clock } from "lucide-react";

function RecentRoomService() {
  return (
    <div className="space-y-4">
      {[
        {
          guest: "Sarah Johnson",
          room: "305",
          items: "Caesar Salad, Salmon",
          time: "12:30 PM",
          status: "pending",
        },
        {
          guest: "Michael Chen",
          room: "412",
          items: "Club Sandwich, Fries",
          time: "12:45 PM",
          status: "preparing",
        },
        {
          guest: "Lisa Anderson",
          room: "115",
          items: "Vegetable Soup, Salad",
          time: "1:15 PM",
          status: "pending",
        },
      ].map((order, i) => (
        <div key={i} className="py-3 border-b border-border last:border-0">
          <div className="flex items-start justify-between mb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {order.guest}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Room {order.room}
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
            <p className="text-xs text-muted-foreground">{order.time}</p>
          </div>
          <p className="text-xs text-muted-foreground">{order.items}</p>
        </div>
      ))}
    </div>
  );
}

export default RecentRoomService;

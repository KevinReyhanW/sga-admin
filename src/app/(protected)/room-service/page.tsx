"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChefHat, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockOrders = [
  {
    id: "RS001",
    guestName: "Sarah Johnson",
    roomNumber: "305",
    items: ["Caesar Salad", "Grilled Salmon", "Red Wine"],
    totalAmount: "$45.00",
    status: "pending",
    orderTime: "2024-01-15 12:30 PM",
    notes: "No onions in salad",
  },
  {
    id: "RS002",
    guestName: "Michael Chen",
    roomNumber: "412",
    items: ["Club Sandwich", "French Fries", "Coca Cola"],
    totalAmount: "$28.00",
    status: "preparing",
    orderTime: "2024-01-15 12:45 PM",
    notes: "",
  },
  {
    id: "RS003",
    guestName: "Emily Davis",
    roomNumber: "208",
    items: ["Breakfast Platter", "Orange Juice", "Coffee"],
    totalAmount: "$32.00",
    status: "delivered",
    orderTime: "2024-01-15 08:15 AM",
    notes: "Extra crispy bacon",
  },
  {
    id: "RS004",
    guestName: "James Wilson",
    roomNumber: "501",
    items: ["Steak Medium Rare", "Mashed Potatoes", "Beer"],
    totalAmount: "$65.00",
    status: "preparing",
    orderTime: "2024-01-15 01:00 PM",
    notes: "",
  },
  {
    id: "RS005",
    guestName: "Lisa Anderson",
    roomNumber: "115",
    items: ["Vegetable Soup", "Garden Salad", "Iced Tea"],
    totalAmount: "$22.00",
    status: "pending",
    orderTime: "2024-01-15 01:15 PM",
    notes: "Vegan options only",
  },
];

function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { variant: "default" as const, icon: Clock, label: "Pending" };
      case "preparing":
        return {
          variant: "secondary" as const,
          icon: ChefHat,
          label: "Preparing",
        };
      case "delivered":
        return {
          variant: "outline" as const,
          icon: CheckCircle,
          label: "Delivered",
        };
      case "cancelled":
        return {
          variant: "destructive" as const,
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return { variant: "default" as const, icon: Clock, label: status };
    }
  };

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.roomNumber.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    preparing: mockOrders.filter((o) => o.status === "preparing").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
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
              key={order.id}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">
                      {order.guestName}
                    </h3>
                    <Badge variant="outline">Room {order.roomNumber}</Badge>
                    <Badge variant={statusConfig.variant} className="gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="mt-1">{order.items.join(" • ")}</p>
                    {order.notes && (
                      <p className="mt-1 italic">Note: {order.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.orderTime}
                    </span>
                    <span className="font-semibold text-foreground">
                      {order.totalAmount}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <Button size="sm" variant="default">
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button size="sm" variant="default">
                      Mark Delivered
                    </Button>
                  )}
                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <Button size="sm" variant="outline">
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

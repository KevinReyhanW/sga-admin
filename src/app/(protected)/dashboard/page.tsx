import React from "react";
import ShortcutMenu from "@/components/shortcut-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/app/mock/dashboard";
import { ChefHat, Clock, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DummyChart from "@/components/dummy-chart";

function Page() {
  return (
    <>
      <ShortcutMenu />
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
              <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Messages by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DummyChart />
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>New Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  guest: "John Doe",
                  action: "Room 302 - Extra towels",
                  time: "5 min ago",
                  status: "completed",
                },
                {
                  guest: "Jane Smith",
                  action: "Room 405 - Room service",
                  time: "12 min ago",
                  status: "in-progress",
                },
                {
                  guest: "Mike Johnson",
                  action: "Room 201 - Maintenance",
                  time: "25 min ago",
                  status: "pending",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.guest}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === "completed"
                          ? "bg-accent/10 text-accent"
                          : activity.status === "in-progress"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Recent Room Service
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <div
                  key={i}
                  className="py-3 border-b border-border last:border-0"
                >
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
                            order.status === "preparing"
                              ? "secondary"
                              : "default"
                          }
                          className="text-xs"
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
                      {order.time}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.items}</p>
                </div>
              ))}
            </div>
            <a
              href="/room-service"
              className="block mt-4 text-center text-sm text-primary hover:underline"
            >
              View all orders →
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Page;

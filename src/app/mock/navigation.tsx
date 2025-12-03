import { ClipboardList, Gauge, Users, UtensilsCrossed } from "lucide-react";

export const data = {
  user: {
    name: "admin",
    email: "admin@dev-hotels123.com",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
    },
    {
      title: "Guest",
      url: "/guest",
      icon: Users,
    },
    {
      title: "Requests",
      url: "/request",
      icon: ClipboardList,
    },
    {
      title: "Room Service",
      url: "/room-service",
      icon: UtensilsCrossed,
    },
  ],
};

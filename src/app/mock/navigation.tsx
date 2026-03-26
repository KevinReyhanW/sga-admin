import { 
  ClipboardList, 
  Gauge, 
  Users, 
  UtensilsCrossed, 
  Shield,
  BarChart,
  MessageSquareText,
  Activity
} from "lucide-react";

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
  admin: [
    {
      title: "SGA Control Center",
      url: "/admin/dashboard",
      icon: Shield,
    },
    {
      title: "Product Analysis",
      url: "/admin/reports",
      icon: BarChart,
    },
    {
      title: "Messaging Engine",
      url: "/admin/messaging",
      icon: MessageSquareText,
    },
  ]
};

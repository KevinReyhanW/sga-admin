import { ClipboardList, Clock, Users, UtensilsCrossed } from "lucide-react";

export const stats = [
  {
    title: "Total Registered Guests",
    value: "124",
    icon: Users,
    trend: "+12 this week",
    color: "success",
  },
  {
    title: "Active Requests",
    value: "18",
    icon: ClipboardList,
    trend: "6 pending pickup",
    color: "warning",
  },
  {
    title: "Room Service Orders",
    value: "5",
    icon: UtensilsCrossed,
    trend: "2 pending, 2 preparing",
    color: "info",
  },
  {
    title: "Avg Response Time",
    value: "12min",
    icon: Clock,
    trend: "-3min from yesterday",
    color: "success",
  },
];

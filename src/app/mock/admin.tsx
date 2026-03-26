import { 
  Activity, 
  BarChart, 
  Clock, 
  MessageSquareText, 
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Users
} from "lucide-react";

export const adminStats = [
  {
    title: "System Status",
    value: "Healthy",
    icon: Activity,
    trend: "All sessions active",
    color: "success",
  },
  {
    title: "SGA Automation Rate",
    value: "68%",
    icon: CheckCircle2,
    trend: "+5% from last week",
    color: "success",
  },
  {
    title: "Escalated Requests",
    value: "4",
    icon: AlertTriangle,
    trend: "2 Urgent, 2 Normal",
    color: "warning",
  },
  {
    title: "Avg Resolution Time",
    value: "18min",
    icon: Clock,
    trend: "-2min from yesterday",
    color: "success",
  },
];

export const complaintAnalysis = [
  { name: "Extra Towels", value: 35, color: "#3b82f6" },
  { name: "AC/Heating", value: 25, color: "#10b981" },
  { name: "Room Service Delay", value: 20, color: "#f59e0b" },
  { name: "Internet Connection", value: 15, color: "#6366f1" },
  { name: "Others", value: 5, color: "#94a3b8" },
];

export const departmentPerformance = [
  { dept: "Housekeeping", response: "5m", resolution: "15m", load: 85 },
  { dept: "Maintenance", response: "12m", resolution: "45m", load: 60 },
  { dept: "Room Service", response: "3m", resolution: "25m", load: 92 },
  { dept: "IT Support", response: "8m", resolution: "20m", load: 40 },
];

export const recentEscalations = [
  { id: "REQ-001", room: "101", issue: "AC not cooling", time: "15m ago", status: "Delayed" },
  { id: "REQ-002", room: "405", issue: "Water leak", time: "5m ago", status: "Escalated" },
];

export const departmentStatusCounts = [
  { name: "Concierge", count: 2, color: "blue" },
  { name: "FIRE", count: 0, color: "gray" },
  { name: "Housekeeping", count: 8, color: "green" },
  { name: "Maintenance", count: 13, color: "amber" },
  { name: "Room Service", count: 3, color: "rose" },
];


export const chatPulseData = [
  { time: "08:00", messages: 120 },
  { time: "10:00", messages: 450 },
  { time: "12:00", messages: 380 },
  { time: "14:00", messages: 520 },
  { time: "16:00", messages: 310 },
  { time: "18:00", messages: 280 },
];

export const topStaffPerformance = [
  { name: "Adrian (GM)", closed: 231, resolution: "9h 20m", rate: 98.7 },
  { name: "Sophia", closed: 180, resolution: "23h 22m", rate: 100.0 },
  { name: "Oliver (Duty Engineer)", closed: 145, resolution: "8d 3h", rate: 91.2 },
  { name: "Emma", closed: 101, resolution: "10d 15m", rate: 96.8 },
];

export const commonIssueTitles = [
  { title: "Remove tray", count: 147, closed: 144, resolution: "15d 13h27m", rate: 97.9 },
  { title: "AC not working", count: 101, closed: 100, resolution: "15e 21h18m", rate: 99.0 },
  { title: "TV not working", count: 90, closed: 87, resolution: "15d 11h15m", rate: 96.7 },
  { title: "Bathroom water leak", count: 82, closed: 80, resolution: "15d 6h53m", rate: 97.6 },
  { title: "AC not cold", count: 72, closed: 72, resolution: "12d 17h14m", rate: 100.0 },
  { title: "Airport Transportation", count: 69, closed: 66, resolution: "29d 17h31m", rate: 98.5 },
  { title: "Change pillows", count: 63, closed: 63, resolution: "14d 6h1m", rate: 100.0 },
  { title: "Clean bathroom", count: 60, closed: 59, resolution: "16d 15h22m", rate: 98.3 },
  { title: "Broken lights", count: 55, closed: 55, resolution: "10d 17h42m", rate: 100.0 },
  { title: "Electricity not working", count: 49, closed: 48, resolution: "11d 13h58m", rate: 97.9 },
];

export const departmentSummary = [
  { name: "Concierge", total: 111, closed: 107, closedRate: 96.1 },
  { name: "FIRE", total: 8, closed: 8, closedRate: 100.0 },
  { name: "Housekeeping", total: 445, closed: 436, closedRate: 97.98 },
  { name: "IT", total: 17, closed: 11, closedRate: 64.7 },
  { name: "Laundry", total: 13, closed: 12, closedRate: 92.3 },
  { name: "Lost & Found", total: 16, closed: 15, closedRate: 93.75 },
  { name: "Maintenance", total: 1045, closed: 1025, closedRate: 98.1 },
  { name: "Room Service", total: 93, closed: 89, closedRate: 95.7 },
];

export const topRequestors = [
  { name: "Kumar (CE)", total: 833 },
  { name: "Adrian (GM)", total: 556 },
  { name: "Sophia", total: 93 },
  { name: "Marie (EAM)", total: 70 },
  { name: "Oliver (Engineer)", total: 38 },
  { name: "Charlotte (FO)", total: 31 },
  { name: "Nicolas (AC Tech)", total: 22 },
  { name: "Emma", total: 13 },
  { name: "Emily", total: 12 },
  { name: "Ludovic", total: 10 },
];

export const topLocations = [
  { location: "1308 - Ambassador Suite", total: 247, closed: 240, resolution: "16d 1h26m", rate: 97.17 },
  { location: "1205 - Executive Suite", total: 226, closed: 221, resolution: "18d 17h54m", rate: 97.79 },
  { location: "1207 - Presidential Suite", total: 184, closed: 182, resolution: "15e 1h30m", rate: 98.9 },
  { location: "1308 - Family Suite", total: 121, closed: 117, resolution: "19d 5h14m", rate: 96.7 },
  { location: "738 - Deluxe King", total: 111, closed: 111, resolution: "12d 5h03m", rate: 100.0 },
  { location: "1206 - Family Suite", total: 95, closed: 94, resolution: "18d 7m", rate: 98.9 },
  { location: "201 - Superior King", total: 90, closed: 89, resolution: "5d 18h16m", rate: 100.0 },
  { location: "1210 - Family Suite", total: 87, closed: 84, resolution: "10d 7h33m", rate: 96.55 },
  { location: "1220 - Family Suite", total: 79, closed: 77, resolution: "18d 19h30m", rate: 97.47 },
  { location: "901 - Executive King", total: 78, closed: 77, resolution: "23d 8h8m", rate: 98.72 },
];

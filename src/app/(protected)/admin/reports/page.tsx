"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  complaintAnalysis,
  departmentPerformance,
  topStaffPerformance,
  commonIssueTitles,
  departmentSummary,
  topRequestors,
  topLocations,
} from "@/app/mock/admin";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Download,
  Filter,
  Search,
  Users,
  Clock,
  Zap,
  RefreshCw,
  ChevronDown,
  MapPin,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie,
} from "recharts";

const reportTypes = ["Management Report", "Daily Report", "Operational Report"];

export default function ReportsPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [issueSearch, setIssueSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredIssues = useMemo(() => {
    if (!issueSearch.trim()) return commonIssueTitles;
    return commonIssueTitles.filter((i) =>
      i.title.toLowerCase().includes(issueSearch.toLowerCase()),
    );
  }, [issueSearch]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Product Analysis & Reports
          </h1>
          <p className="text-muted-foreground italic flex items-center gap-2">
            <BarChartIcon size={16} /> Data-driven insights for daily and
            monthly management meetings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Report Type Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 font-medium min-w-[180px] justify-between"
              onClick={() => setShowReportDropdown(!showReportDropdown)}
            >
              {reportType}
              <ChevronDown size={14} />
            </Button>
            {showReportDropdown && (
              <div className="absolute right-0 top-full mt-1 w-full bg-card border rounded-lg shadow-lg z-50 py-1">
                {reportTypes.map((type) => (
                  <button
                    key={type}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors",
                      reportType === type && "bg-primary/5 font-semibold text-primary",
                    )}
                    onClick={() => {
                      setReportType(type);
                      setShowReportDropdown(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 font-medium"
            onClick={handleRefresh}
          >
            <RefreshCw
              size={16}
              className={cn(isRefreshing && "animate-spin")}
            />
            Data Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 font-medium"
          >
            <Filter size={16} /> Filter
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 font-medium shadow-lg shadow-primary/20"
          >
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Department Summary Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {departmentSummary.map((dept) => (
          <Card
            key={dept.name}
            className="shadow-soft hover:shadow-medium transition-all border-none bg-muted/20"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-semibold mb-0.5">{dept.total.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">
                {dept.name}
              </div>
              <div
                className={cn(
                  "text-[10px] font-semibold mt-1",
                  dept.closedRate >= 95
                    ? "text-green-600"
                    : dept.closedRate >= 80
                      ? "text-amber-600"
                      : "text-red-600",
                )}
              >
                {dept.closedRate}% Closed
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 1: Request Families + Top 10 Requestors + Top 10 Owners */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Request Families - Donut Chart */}
        <Card className="md:col-span-12 lg:col-span-4 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-muted-foreground opacity-70">
              <PieChartIcon size={16} />
              Request Families
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={complaintAnalysis}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {complaintAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              {complaintAnalysis.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 font-medium"
                >
                  <div
                    className="size-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate flex-1">{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 10 Requestors */}
        <Card className="md:col-span-6 lg:col-span-4 shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/5 border-b">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-muted-foreground opacity-70">
              <UserCircle size={16} /> Top 10 Requestors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="px-4 py-2.5">Requestor Name</th>
                  <th className="px-4 py-2.5 text-right">Total ▼</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topRequestors.map((r) => (
                  <tr key={r.name} className="hover:bg-muted/5">
                    <td className="px-4 py-2.5 font-medium">{r.name}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">
                      {r.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top 10 Owners (enriched staff) */}
        <Card className="md:col-span-6 lg:col-span-4 shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/5 border-b">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-muted-foreground opacity-70">
              <Users size={16} /> Top 10 Owners
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="px-4 py-2.5">Owner Name</th>
                  <th className="px-4 py-2.5 text-right">Closed ▼</th>
                  <th className="px-4 py-2.5 text-right">Res. Time</th>
                  <th className="px-4 py-2.5 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topStaffPerformance.map((staff) => (
                  <tr key={staff.name} className="hover:bg-muted/5">
                    <td className="px-4 py-2.5 font-medium">{staff.name}</td>
                    <td className="px-4 py-2.5 text-right">{staff.closed}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {staff.resolution}
                    </td>
                    <td className="px-4 py-2.5 text-right">{staff.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Top 10 Locations + Top 10 Request Titles */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top 10 Locations */}
        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/5 border-b">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-muted-foreground opacity-70">
              <MapPin size={16} /> Top 10 Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="px-4 py-2.5">Request Location</th>
                  <th className="px-4 py-2.5 text-right">Total ▼</th>
                  <th className="px-4 py-2.5 text-right">Closed</th>
                  <th className="px-4 py-2.5 text-right">Res. Time</th>
                  <th className="px-4 py-2.5 text-right">Res. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topLocations.map((loc) => (
                  <tr key={loc.location} className="hover:bg-muted/5">
                    <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                      {loc.location}
                    </td>
                    <td className="px-4 py-2.5 text-right">{loc.total}</td>
                    <td className="px-4 py-2.5 text-right">{loc.closed}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {loc.resolution}
                    </td>
                    <td className="px-4 py-2.5 text-right">{loc.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top 10 Request Titles with Search */}
        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/5 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-muted-foreground opacity-70">
                <Zap size={16} /> Top 10 Request Titles ▼
              </CardTitle>
            </div>
            <div className="relative mt-2">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search titles..."
                value={issueSearch}
                onChange={(e) => setIssueSearch(e.target.value)}
                className="h-8 pl-8 text-xs rounded-lg"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/10 border-b">
                  <th className="px-4 py-2.5">Request Titles</th>
                  <th className="px-4 py-2.5 text-right">Total ▼</th>
                  <th className="px-4 py-2.5 text-right">Closed</th>
                  <th className="px-4 py-2.5 text-right">Res. Time</th>
                  <th className="px-4 py-2.5 text-right">Res. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredIssues.map((issue) => (
                  <tr key={issue.title} className="hover:bg-muted/5">
                    <td className="px-4 py-2.5 font-medium">{issue.title}</td>
                    <td className="px-4 py-2.5 text-right">{issue.count}</td>
                    <td className="px-4 py-2.5 text-right">{issue.closed}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">
                      {issue.resolution}
                    </td>
                    <td className="px-4 py-2.5 text-right">{issue.rate}%</td>
                  </tr>
                ))}
                {filteredIssues.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground italic"
                    >
                      No matching titles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Service Efficiency by Department */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-primary" />
            Service Efficiency by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentPerformance}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="dept"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{
                    fontSize: 12,
                    fontWeight: 500,
                    fill: "var(--foreground)",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="load"
                  fill="var(--primary)"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminStats, recentEscalations, departmentStatusCounts, chatPulseData } from "@/app/mock/admin";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Shield,
  Activity,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">SGA Control Center</h1>
          <p className="text-muted-foreground italic flex items-center gap-2">
            <Shield size={16} /> Centralized monitoring for SGA product performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
             System Online
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-normal text-muted-foreground uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                stat.color === "success" ? "bg-success/10 text-success" : 
                stat.color === "warning" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
              )}>
                <stat.icon size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 italic">
                 {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Pending Status - Operational View */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {departmentStatusCounts.map((dept) => (
          <Card key={dept.name} className="shadow-soft hover:shadow-medium transition-all group border-none bg-muted/20">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-semibold mb-1">{dept.count}</div>
              <div className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">
                Pending {dept.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Real-time pulse / Operational status */}
        <Card className="md:col-span-8 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <MessageSquare className="text-primary" size={20} />
              Messaging Volume (Last 24h)
            </CardTitle>
            <Badge variant="outline" className="font-medium text-[10px]">Total: 2,400 msg</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chatPulseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="var(--primary)" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "white" }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Escalations / Urgent attention */}
        <Card className="md:col-span-4 shadow-soft border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle size={20} />
              SLA Escalations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEscalations.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-warning/5 border border-warning/20 hover:border-warning/40 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-warning opacity-70">
                      {item.id} • Room {item.room}
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-white border-warning/30 text-warning">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm mt-2">{item.issue}</p>
                  <p className="text-xs text-muted-foreground italic mt-1">{item.time}</p>
                </div>
              ))}
              {recentEscalations.length === 0 && (
                <div className="text-center py-10 italic text-muted-foreground text-sm">
                  No active escalations. System performing within targets.
                </div>
              )}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary">
                View All Active Tasks <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

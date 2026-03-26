"use client";
import React, { useState } from "react";
import { 
  CheckCircle2, AlertCircle, Save, Phone, 
  Fingerprint, RefreshCw, Smartphone, Globe, Shield 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function MessagingEnginePage() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Messaging Infrastructure</h1>
        <p className="text-muted-foreground italic flex items-center gap-2">
          <Globe size={16} /> Global WhatsApp API configuration & automated triggers.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Connection Status Card */}
        <Card className="shadow-soft overflow-hidden border-none bg-transparent">
          <div className={cn(
            "px-8 py-6 flex items-center justify-between border-b relative overflow-hidden rounded-t-[1.5rem]",
            isConnected ? "bg-green-500/5" : "bg-destructive/5"
          )}>
            <div className="flex items-center gap-4 z-10">
              <div className={cn(
                "size-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500",
                isConnected ? "bg-green-500 text-white" : "bg-destructive text-white"
              )}>
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg tracking-tight">Connection Engine</h3>
                <div className="flex items-center gap-2 mt-0.5">
                   <div className={cn(
                     "size-2 rounded-full animate-pulse",
                     isConnected ? "bg-green-500" : "bg-destructive"
                   )} />
                   <p className={cn("text-[10px] font-semibold tracking-widest uppercase", isConnected ? "text-green-600" : "text-destructive")}>
                     {isConnected ? "Meta API v21.0 Connected" : "Connection Terminated"}
                   </p>
                </div>
              </div>
            </div>
            <Button 
              variant={isConnected ? "outline" : "default"}
              size="sm"
              onClick={() => setIsConnected(!isConnected)}
              className="z-10 font-medium text-[10px] uppercase tracking-widest"
            >
              {isConnected ? "Reset Cluster" : "Initiate Link"}
            </Button>
          </div>

          <CardContent className="bg-card p-8 border border-t-0 rounded-b-[1.5rem] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-1 opacity-60">
                  <Phone size={14} /> Business Endpoint
                </label>
                <div className="relative">
                  <Input 
                    defaultValue="+62 812-3456-7890"
                    className="h-12 px-5 rounded-xl font-semibold shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                     <Shield size={18} className="text-primary/20" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-1 opacity-60">
                  <Fingerprint size={14} /> API Access Key
                </label>
                <Input 
                  type="password" 
                  defaultValue="sk-xxxxxxxxxxxxxxxxxxxx"
                  className="h-12 px-5 rounded-xl font-mono shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold text-lg tracking-tight">Active Automation Triggers</h3>
                  <Button variant="link" size="sm" className="text-[10px] uppercase tracking-widest font-medium">Edit Rules</Button>
               </div>
               <div className="grid grid-cols-1 gap-3">
                 {[
                   { name: 'Reservation Confirmation', desc: 'Sent after successful booking', icon: CheckCircle2, status: 'Active' },
                   { name: 'Housekeeping Alert', desc: 'Triggered upon room status change', icon: AlertCircle, status: 'Active' },
                   { name: 'Welcome Experience', desc: 'Personalized check-in greeting', icon: Smartphone, status: 'Draft' }
                 ].map((item) => (
                   <div key={item.name} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border/50 hover:bg-white hover:shadow-sm transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-card flex items-center justify-center text-primary/60 border">
                           <item.icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm tracking-tight">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground italic opacity-70">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Badge variant={item.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] uppercase font-medium tracking-widest">
                           {item.status}
                         </Badge>
                         <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-40 hover:opacity-100">
                           <RefreshCw size={14} />
                         </Button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button className="h-12 px-8 font-medium text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 gap-2">
                  <Save size={18} />
                  Deploy Configurations
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

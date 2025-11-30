"use client";
import React, { useState } from "react";
import { CheckCircle, Clock, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
interface Request {
  id: string;
  guestName: string;
  room: string;
  type: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo?: string;
  submittedAt: string;
  pickedUpAt?: string;
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import requestService from "@/app/services/request";

interface DraggableCardProps {
  request: Request;
  getStatusColor: (status: Request["status"]) => string;
  onAssignStaff: (requestId: string, staffName: string) => void;
}

function DraggableCard({ request, onAssignStaff }: DraggableCardProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: request.id,
    data: { request },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  const staffMembers = [
    { id: "1", name: "Maria Garcia", role: "Housekeeping" },
    { id: "2", name: "Carlos Rodriguez", role: "Room Service" },
    { id: "3", name: "Jessica Lee", role: "Concierge" },
    { id: "4", name: "Tom Anderson", role: "Maintenance" },
    { id: "5", name: "Sophie Chen", role: "Housekeeping" },
  ];

  const handleAssignStaff = (staffName: string) => {
    onAssignStaff(request.id, staffName);
    setPopoverOpen(false);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 hover:shadow-medium transition-all cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {request.guestName}
                </h3>
                <span className="text-xs text-muted-foreground">
                  Room {request.room}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {request.type}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{request.description}</p>

        <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {request.submittedAt}
          </div>
          {request.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {request.assignedTo}
            </div>
          )}
          {!request.assignedTo && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className="w-full mt-2 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  Assign Task
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-64 p-2"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm px-2 py-1.5">
                    Assign to Staff
                  </h4>
                  <div className="space-y-1">
                    {staffMembers.map((staff) => (
                      <button
                        key={staff.id}
                        onClick={() => handleAssignStaff(staff.name)}
                        className="w-full text-left px-2 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {staff.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {staff.role}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </Card>
  );
}

interface DroppableColumnProps {
  status: Request["status"];
  title: string;
  children: React.ReactNode;
  count: number;
  icon: React.ReactNode;
}

function DroppableColumn({
  status,
  title,
  children,
  count,
  icon,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`space-y-4 transition-colors rounded-lg p-4 ${
        isOver ? "bg-accent/5" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <Badge
          variant="secondary"
          className={cn(
            "text-xs text-white",
            status === "pending"
              ? "bg-info"
              : status === "in-progress"
                ? "bg-warning"
                : "bg-success",
          )}
        >
          {count}
        </Badge>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const [requests, setRequests] = useState<Request[]>([]);

  useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await requestService.fetchRequestList();
      setRequests(response);
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const requestId = active.id as string;
      const newStatus = over.id as Request["status"];

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req,
        ),
      );
    }

    setActiveId(null);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.room.includes(searchQuery) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent hover:bg-accent/20";
      case "in-progress":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "pending":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "in-progress":
        return <Clock className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
    }
  };

  const statusColumns: { status: Request["status"]; title: string }[] = [
    { status: "pending", title: "Pending" },
    { status: "in-progress", title: "In Progress" },
    { status: "completed", title: "Completed" },
  ];

  const handleAssignStaff = (requestId: string, staffName: string) => {
    const tempRequests = [...requests];
    const assignedIndex = tempRequests.findIndex((req) => req.id === requestId);
    tempRequests[assignedIndex] = {
      ...tempRequests[assignedIndex],
      assignedTo: staffName,
    };
    setRequests(tempRequests);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveId(event.active.id as string)}
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest name, room, or request type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statusColumns.map((column) => {
            const columnRequests = filteredRequests.filter(
              (req) => req.status === column.status,
            );

            return (
              <DroppableColumn
                key={column.status}
                status={column.status}
                title={column.title}
                count={columnRequests.length}
                icon={getStatusIcon(column.status)}
              >
                {columnRequests.map((request) => (
                  <DraggableCard
                    key={request.id}
                    request={request}
                    getStatusColor={getStatusColor}
                    onAssignStaff={(requestId, staffName) =>
                      handleAssignStaff(requestId, staffName)
                    }
                  />
                ))}

                {columnRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No requests
                  </div>
                )}
              </DroppableColumn>
            );
          })}
        </div>

        <DragOverlay>
          {activeId ? (
            <DraggableCard
              request={requests.find((r) => r.id === activeId)!}
              getStatusColor={getStatusColor}
              onAssignStaff={(requestId, staffName) =>
                handleAssignStaff(requestId, staffName)
              }
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default Page;

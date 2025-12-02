"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Search, User } from "lucide-react";
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
  category: string;
  guest_name: string;
  status: "pending" | "in_progress" | "completed";
  order_id: string;
  room: any;
  order_items: any;
  created_at: string;
  updated_at: string;
  assignedTo?: string;
  order_number: string;
}
import { useQuery } from "@tanstack/react-query";
import workerService from "@/app/services/worker";
import { useShape } from "@electric-sql/react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import requestService from "@/app/services/request";
import { title } from "radash";

interface DraggableCardProps {
  request: Request;
  getStatusColor: (status: Request["status"]) => string;
  onAssignStaff: (requestId: string, staffName: string) => void;
  workers: any;
}

function DraggableCard({
  request,
  onAssignStaff,
  workers = [],
}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: request.order_id,
    data: { request },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAssignStaff = (staffName: string) => {
    onAssignStaff(request.order_number, staffName);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 hover:shadow-medium transition-all cursor-grab active:cursor-grabbing border-l-3",
        request.status === "pending"
          ? "border-l-info"
          : request.status === "in_progress"
            ? "border-l-warning"
            : "border-l-success",
      )}
      {...attributes}
      {...listeners}
    >
      <div>
        <Badge
          variant="outline"
          className="text-xs bg-slate-100 border-gray-400 border font-semibold mb-2"
        >
          Room {request.room.room_number}
        </Badge>
        <div className="w-full">
          <h3 className="font-semibold text-foreground text-sm">
            {request.guest_name}
          </h3>
        </div>

        <div className="text-xs text-muted-foreground border-l-2 border-l-primary pl-2 my-2">
          <h3 className="text-sm text-muted-foreground font-semibold">
            {request.order_items[0]?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {request.order_items[0]?.description}
          </p>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground mb-4 mt-1">
          {request.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {request.assignedTo}
            </div>
          )}
          {!request.assignedTo && (
            <Select onValueChange={handleAssignStaff}>
              <SelectTrigger
                className="w-full mt-2 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <SelectValue placeholder="Assign Task" />
              </SelectTrigger>
              <SelectContent
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {workers.map((staff: any) => (
                  <SelectItem key={staff.value} value={staff.value}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{staff.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs text-muted-foreground ">
            <Clock className="w-3 h-3" />
            {format(request.created_at, "dd/MM/yyyy hh:mm aaa")}
          </div>
          <Badge variant="outline" className="text-xs bg-primary text-white">
            {title(request.category)}
          </Badge>
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
              : status === "in_progress"
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

  const { data: workers } = useQuery({
    queryKey: ["worker"],
    queryFn: async () => {
      const response = await workerService.fetchWorkerLists();
      return response?.data.data.map((worker: any) => {
        return {
          label: worker.name,
          value: worker.id,
        };
      });
    },
  });

  const { data: requestsShape, isLoading: requestsLoading } = useShape({
    url: `${process.env.NEXT_PUBLIC_ELECTRIC}/v1/shape`,
    params: {
      table: process.env.NEXT_PUBLIC_ELECTRIC_TABLE,
    },
  });

  useEffect(() => {
    const requests = requestsShape.filter((item) => {
      return item.category !== "room_service";
    });
    setRequests(requests);
  }, [requestsShape]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const requestId = active.id as string;
      const newStatus = over.id as Request["status"];

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.order_id === requestId ? { ...req, status: newStatus } : req,
        ),
      );

      await requestService.updateStatus(requestId, newStatus);
    }

    setActiveId(null);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.room.room_number.includes(searchQuery) ||
      request.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent hover:bg-accent/20";
      case "in_progress":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "pending":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "in_progress":
        return <Clock className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
    }
  };

  const statusColumns: { status: Request["status"]; title: string }[] = [
    { status: "pending", title: "Pending" },
    { status: "in_progress", title: "In Progress" },
    { status: "completed", title: "Completed" },
  ];

  const handleAssignWorker = async (requestId: string, workerId: string) => {
    await requestService.assignWorker(requestId, workerId);
  };

  const handleAssignStaff = async (requestId: string, staffName: string) => {
    const tempRequests = [...requests];
    const assignedIndex = tempRequests.findIndex(
      (req) => req.order_id === requestId,
    );
    tempRequests[assignedIndex] = {
      ...tempRequests[assignedIndex],
      assignedTo: staffName,
    };
    setRequests(tempRequests);
    await handleAssignWorker(requestId, staffName);
  };

  return (
    <>
      {requestsLoading ? (
        <div className="w-full flex justify-between items-center h-full">
          Loading...
        </div>
      ) : (
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
                        workers={workers}
                        key={request.order_id}
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
                  workers={workers}
                  request={requests.find((r) => r.order_id === activeId)!}
                  getStatusColor={getStatusColor}
                  onAssignStaff={(requestId, staffName) =>
                    handleAssignStaff(requestId, staffName)
                  }
                />
              ) : null}
            </DragOverlay>
          </div>
        </DndContext>
      )}
    </>
  );
}

export default Page;

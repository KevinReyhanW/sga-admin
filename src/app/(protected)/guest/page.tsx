"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import guestService from "@/app/services/guest";
import GuestComponent from "@/components/guest-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleUser, Funnel, Search, UserPlus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "zustand/react";
import useAppStateStore from "@/app/store/app.store";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import messageService from "@/app/services/messages";
import ChatComponent from "@/components/chat-component";
import { cn } from "@/lib/utils";
import PaginationComponent from "@/components/pagination";

type FilterType = "all" | "checkin" | "checkout";

function Page() {
  const stateStore = useStore(useAppStateStore);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [total, setTotal] = React.useState(0);
  const [current, setCurrent] = React.useState(1);

  const { data: guests, isLoading: isLoading } = useQuery({
    queryKey: ["guests", current],
    queryFn: async () => {
      const response = await guestService.fetchGuestList(current);
      setTotal(response.meta.total_pages);
      return response?.data;
    },
  });

  const counts = useMemo(() => {
    if (!guests) return { checkin: 0, checkout: 0 };

    const checkin = guests.filter(
      (guest: any) => guest.checkin_rooms?.[0]?.checkout_date === null,
    ).length;

    const checkout = guests.filter(
      (guest: any) => guest.checkin_rooms?.[0]?.checkout_date !== null,
    ).length;

    return { checkin, checkout };
  }, [guests]);

  // Filter guests based on search query and active filter
  const filteredGuests = useMemo(() => {
    if (!guests) return guests;

    let filtered = guests;

    // Apply status filter
    if (activeFilter === "checkin") {
      filtered = filtered.filter(
        (guest: any) => guest.checkin_rooms?.[0]?.checkout_date === null,
      );
    } else if (activeFilter === "checkout") {
      filtered = filtered.filter(
        (guest: any) => guest.checkin_rooms?.[0]?.checkout_date !== null,
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((guest: any) => {
        const guestName = guest.name?.toLowerCase() || "";
        const roomNumber =
          guest.checkin_rooms?.[0]?.room?.room_number?.toString() || "";

        return guestName.includes(query) || roomNumber.includes(query);
      });
    }

    return filtered;
  }, [guests, searchQuery, activeFilter]);

  const handleFilterToggle = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? "all" : filter);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
    setSelectedGuest(null);
    setMessages([]);
  };

  const handleShowHistory = async (guest: any) => {
    const messagesHistory = await messageService.fetchMessages(
      guest.sessions[0]?.id ? guest.sessions[0]?.id : null,
    );

    if (messagesHistory) {
      setMessages(messagesHistory?.data.data);
    }

    setSelectedGuest(guest);
    setShowHistory(true);
  };

  return (
    <div>
      <div>
        <InputGroup>
          <InputGroupInput
            placeholder="Search by Name or Room Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center py-4 justify-between gap-x-2">
        <div className="flex items-center">
          <div className="flex gap-x-2 items-center ml-3">
            <Funnel size={18} />
            <Button
              className="rounded-full"
              variant={activeFilter === "checkin" ? "default" : "outline"}
              onClick={() => handleFilterToggle("checkin")}
            >
              Check In
              <Badge
                className={
                  activeFilter === "checkin" ? "bg-white text-foreground" : ""
                }
              >
                {counts.checkin}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "checkout" ? "default" : "outline"}
              className={cn(
                "rounded-full",
                activeFilter === "checkout"
                  ? "bg-success hover:bg-success"
                  : "",
              )}
              onClick={() => handleFilterToggle("checkout")}
            >
              Check Out
              <Badge
                className={
                  activeFilter === "checkout"
                    ? "bg-white text-foreground"
                    : "bg-success"
                }
              >
                {counts.checkout}
              </Badge>
            </Button>
          </div>
        </div>
        <Button onClick={() => stateStore.setRegisterDialogOpen(true)}>
          <UserPlus className="w-4 h-4" />
          Register Guest
        </Button>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <Skeleton className="h-[140px] w-full rounded-lg" />
        </div>
      ) : (
        <>
          <GuestComponent
            guests={filteredGuests}
            handleOnshowHistory={(guest) => handleShowHistory(guest)}
          />
          <PaginationComponent
            total={total}
            current={current}
            onPageChange={(value) => {
              setCurrent(value);
            }}
          />
        </>
      )}
      <Drawer
        open={showHistory}
        onOpenChange={handleCloseHistory}
        direction="right"
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Message History</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-between items-center p-4 border-b border-b-gray-300 bg-gray-100">
            <div className="flex items-center gap-x-2">
              <CircleUser size={15} />
              <div className="font-semibold text-sm">{selectedGuest?.name}</div>
            </div>

            <Badge>#{selectedGuest?.checkin_rooms[0].room.room_number}</Badge>
          </div>
          <div className="h-full">
            {messages.length === 0 ? (
              <div className="flex w-full h-full justify-center items-center flex-col space-y-3">
                <img
                  src="/empty-conversation.png"
                  alt="Empty Chat"
                  className="w-24"
                />
                No History
              </div>
            ) : (
              <ChatComponent messages={messages} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Page;

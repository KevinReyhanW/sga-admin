"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import guestService from "@/app/services/guest";
import GuestComponent from "@/components/guest-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Funnel, Search, UserPlus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "zustand/react";
import useAppStateStore from "@/app/store/app.store";

type FilterType = "all" | "checkin" | "checkout";

function Page() {
  const stateStore = useStore(useAppStateStore);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { data: guests, isLoading: isLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      return await guestService.fetchGuestList();
    },
  });

  // Calculate counts for badges
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
              className="rounded-full"
              onClick={() => handleFilterToggle("checkout")}
            >
              Check Out
              <Badge
                className={
                  activeFilter === "checkout" ? "bg-white text-foreground" : ""
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
        <GuestComponent guests={filteredGuests} />
      )}
    </div>
  );
}

export default Page;

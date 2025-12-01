"use client";
import React from "react";
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

function Page() {
  const stateStore = useStore(useAppStateStore);

  const { data: guests, isLoading: isLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      return await guestService.fetchGuestList();
    },
  });

  return (
    <div>
      <div>
        <InputGroup>
          <InputGroupInput placeholder="Search by Name or Room Number..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center py-4 justify-between gap-x-2">
        <div className="flex items-center">
          <div className="flex gap-x-2 items-center ml-3">
            <Funnel size={18} />
            <Button className="rounded-full">
              Check In
              <Badge className="bg-white text-foreground">2</Badge>
            </Button>
            <Button variant="outline" className="rounded-full">
              Check Out
              <Badge>4</Badge>
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
        <GuestComponent guests={guests} />
      )}
    </div>
  );
}

export default Page;

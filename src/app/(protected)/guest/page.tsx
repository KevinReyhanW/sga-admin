"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import guestService from "@/app/services/guest";
import GuestComponent from "@/components/guest-component";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Funnel, Search, UserPlus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

function Page() {
  const { data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      return await guestService.fetchGuestList();
    },
  });

  useEffect(() => {
    console.log("[debug] -> ", guests);
  }, [guests]);

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
            <Button variant="outline" className="rounded-full">
              Check In
              <Badge>2</Badge>
            </Button>
            <Button variant="outline" className="rounded-full">
              Check Out
              <Badge>4</Badge>
            </Button>
          </div>
        </div>
        <Button>
          <UserPlus className="w-4 h-4" />
          Register Guest
        </Button>
      </div>
      <GuestComponent guests={guests || []} />
    </div>
  );
}

export default Page;

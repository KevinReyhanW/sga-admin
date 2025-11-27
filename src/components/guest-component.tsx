import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CircleUser,
  Clock8,
  ConciergeBell,
  DoorClosed,
  KeyRound,
  Mail,
  Pencil,
  Phone,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  guests: any;
}
function GuestComponent({ guests }: Props) {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      {guests?.map((guest: any) => {
        return (
          <div
            key={guest.id}
            className="rounded-lg border shadow overflow-hidden"
          >
            <div className="text-sm bg-sky-600 w-full flex justify-between text-white px-4 py-2">
              <h3 className="font-semibold flex gap-x-1 items-center">
                <ConciergeBell size={15} />
                Room
              </h3>
              <span className="font-bold">#303</span>
            </div>
            <div className="grid-cols-5 gap-x-2 px-4 py-2">
              <div className="col-span-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-x-1">
                    Guest Name
                  </h3>
                  <p className="text-xs">{guest.name}</p>
                </div>
                <SquarePen size={15} />
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-5 gap-x-2 px-4 py-2">
              <div className="col-span-3">
                <h3 className="font-semibold text-sm flex items-center gap-x-1">
                  <Mail className="text-primary" size={12} />
                  Email
                </h3>
                <p className="text-xs">{guest.email}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm flex items-center gap-x-1">
                  <Phone className="text-primary" size={12} />
                  Mobile
                </h3>
                <p className="text-xs"> {guest.mobile_phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-x-2 px-4 py-2">
              <div className="col-span-3">
                <h3 className="font-semibold text-sm flex items-center gap-x-1">
                  <Clock8 className="text-primary" size={12} />
                  Check In
                </h3>
                <p className="text-xs">23 November, 2025</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm flex items-center gap-x-1">
                  <Clock8 className="text-primary" size={12} />
                  Check Out
                </h3>
                <p className="text-xs"></p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-5 gap-x-2 px-4 py-2 bg-slate-50">
              <div className="col-span-3">
                <Button variant="outline" className="w-full">
                  Message History
                </Button>
              </div>
              <div className="col-span-2">
                <Button variant="outline" className="w-full">
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GuestComponent;

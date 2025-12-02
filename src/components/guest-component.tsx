import React from "react";
import { Separator } from "@/components/ui/separator";
import { Clock8, ConciergeBell, Mail, Phone, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import guestService from "@/app/services/guest";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  guests: any;
  handleOnshowHistory: (guest: any) => void;
}
function GuestComponent({ guests = [], handleOnshowHistory }: Props) {
  const queryClient = useQueryClient();

  const handleCheckOut = async (id: string) => {
    await guestService.setGuestCheckout(id);
    await queryClient.invalidateQueries({ queryKey: ["guests"] });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {guests?.map((guest: any, index: number) => {
        return (
          <div key={index} className="rounded-lg border shadow overflow-hidden">
            <div
              className={cn(
                "text-sm  w-full flex justify-between text-white px-4 py-2",
                guest.checkin_rooms[0].checkout_date === null
                  ? "bg-primary"
                  : "bg-success",
              )}
            >
              <h3 className="font-semibold flex gap-x-1 items-center">
                <ConciergeBell size={15} />
                Room
              </h3>
              <span className="font-bold">
                #{guest.checkin_rooms[0].room.room_number}
              </span>
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
                <p className="text-xs">
                  {format(guest.checkin_rooms[0].checkin_date, "dd MMMM, yyyy")}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm flex items-center gap-x-1">
                  <Clock8 className="text-primary" size={12} />
                  Check Out
                </h3>
                <p className="text-xs">
                  {guest.checkin_rooms[0].checkout_date
                    ? format(
                        guest.checkin_rooms[0].checkout_date,
                        "dd MMMM, yyyy",
                      )
                    : "-"}
                </p>
              </div>
            </div>
            <Separator />
            {guest.checkin_rooms[0].checkout_date === null ? (
              <div className="grid grid-cols-5 gap-x-2 px-4 py-2 bg-slate-50">
                <div className="col-span-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOnshowHistory(guest)}
                  >
                    Message History
                  </Button>
                </div>
                <div className="col-span-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleCheckOut(guest.id)}
                  >
                    Check Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-x-2 px-4 py-2 bg-slate-50">
                <div className="col-span-5">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOnshowHistory(guest)}
                  >
                    Message History
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GuestComponent;

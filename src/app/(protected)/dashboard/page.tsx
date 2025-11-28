"use client";
import React from "react";
import ShortcutMenu from "@/components/shortcut-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/app/mock/dashboard";
import {
  CalendarIcon,
  ChartPie,
  HandPlatter,
  UtensilsCrossed,
} from "lucide-react";
import DummyChart from "@/components/dummy-chart";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import guestService from "@/app/services/guest";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import NewRequest from "@/components/new-request";
import RecentRoomService from "@/components/recent-room-service";
import requestService from "@/app/services/request";
import LoaderComponent from "@/components/loader-component";

const guestSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  room_number: z.string().min(3, "Room number must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
  phone_number: z.string().min(8, "Phone number must be at least 8 characters"),
  checkin_date: z.date().min(8, "Check-in date must be filled"),
});

function Page() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof guestSchema>>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: "",
      full_name: "",
      checkin_date: new Date(),
      phone_number: "",
      room_number: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await guestService.registerGuest(data);
      await queryClient.invalidateQueries({ queryKey: ["guests"] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  const { data: requests, isFetching: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      return await requestService.fetchRequestList();
    },
  });

  return (
    <>
      <ShortcutMenu handleOpenDialog={() => setIsDialogOpen(true)} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="shadow-soft hover:shadow-medium transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={cn(
                  "p-2 rounded-lg",
                  stat.color === "success"
                    ? "bg-success/20"
                    : stat.color === "warning"
                      ? "bg-warning/20"
                      : "bg-info/20",
                )}
              >
                <stat.icon
                  className={cn(
                    "w-4 h-4",
                    stat.color === "success"
                      ? "text-success"
                      : stat.color === "warning"
                        ? "text-warning"
                        : "text-info",
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="w-5 h-5 text-primary" />
              Messages by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-full">
            <DummyChart />
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandPlatter className="w-5 h-5 text-primary" />
              New Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : (
              <NewRequest requests={requests} />
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Recent Room Service
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {requestsLoading ? (
              <LoaderComponent />
            ) : (
              <>
                <RecentRoomService />
                <a
                  href="/room-service"
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  View all orders →
                </a>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Guest</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="full_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullname-form">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="fullname-form"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe "
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-form">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email-form"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="room_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="room_number-form">
                      Room Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="room_number-form"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="302"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="checkin_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="room_number-form">
                      Checkin Date
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex items-center w-full justify-between text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone_number-form">
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="phone_number-form"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="83749939"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Register Guest
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Page;

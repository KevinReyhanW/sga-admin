import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import guestService from "@/app/services/guest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const guestSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  room_number: z.string().min(3, "Room number must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
  phone_number: z.string().min(8, "Phone number must be at least 8 characters"),
  checkin_date: z.date().min(8, "Check-in date must be filled"),
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

function RegisterDialog({ open, handleClose }: Props) {
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

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await guestService.listAvailableRoom();
      return response?.data.data.map((room: any) => {
        return {
          label: room.label,
          value: room.room_number,
        };
      });
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await guestService.registerGuest(data);
      await queryClient.invalidateQueries({ queryKey: ["guests"] });
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    form.reset();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="room_number-form"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms?.map((room: any) => (
                        <SelectItem key={room.value} value={room.value}>
                          {room.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
  );
}

export default RegisterDialog;

"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Inbox } from "lucide-react";
import { usePathname } from "next/navigation";
import { title } from "radash";
import RegisterDialog from "@/components/register-dialog";
import { useStore } from "zustand/react";
import useAppStateStore from "@/app/store/app.store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const stateStore = useStore(useAppStateStore);

  const handleOpenDialog = () => {
    stateStore.setRegisterDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4">
          <header className="flex h-16 items-center w-full justify-between">
            <div className="flex shrink-0 gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h2 className="font-semibold">{title(pathname.split("/")[1])}</h2>
            </div>
            <Inbox size={20} />
          </header>
        </div>
        <div className="px-4">{children}</div>
        <RegisterDialog
          open={stateStore.registerDialogOpen}
          handleClose={handleOpenDialog}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

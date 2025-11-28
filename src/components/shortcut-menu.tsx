import React from "react";
import { ClipboardList, Users, UtensilsCrossed } from "lucide-react";

interface Props {
  handleOpenDialog: () => void;
}
function ShortcutMenu({ handleOpenDialog }: Props) {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      <a className="cursor-pointer block p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
        <div
          className="flex items-center gap-3"
          onClick={() => handleOpenDialog()}
        >
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Register New Guest</p>
            <p className="text-xs text-muted-foreground">
              Add a guest to the system
            </p>
          </div>
        </div>
      </a>
      <a
        href="/request"
        className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
      >
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">View All Messages</p>
            <p className="text-xs text-muted-foreground">
              Manage guest messages
            </p>
          </div>
        </div>
      </a>
      <a
        href="/room-service"
        className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
      >
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">View Room Service</p>
            <p className="text-xs text-muted-foreground">Manage food orders</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ShortcutMenu;

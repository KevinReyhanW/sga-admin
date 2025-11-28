import React from "react";
import { LoaderCircle } from "lucide-react";

function LoaderComponent() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircle size={24} className="text-primary animate-spin" />
    </div>
  );
}

export default LoaderComponent;

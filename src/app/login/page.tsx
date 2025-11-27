import React from "react";
import LoginForm from "@/app/login/login-form";

function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;

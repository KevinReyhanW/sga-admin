"use client";
import React from "react";
import LoginForm from "@/app/login/login-form";
import Image from "next/image";

function Page() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <Image
        src={require("@/../public/logo-sga.png")}
        alt="logo"
        className="w-24 mb-5"
      />
      <h3 className="text-2xl font-semibold mb-5">Smart Guest Assignment</h3>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export default Page;

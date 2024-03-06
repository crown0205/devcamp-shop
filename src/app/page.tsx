"use client";
import LoginForm from "@/components/molecules/LoginForm";
import SignUpForm from "@/components/molecules/SignUpForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export enum AuthType {
  LOGIN = "login",
  SIGNUP = "sign-up",
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState<AuthType>(AuthType.LOGIN);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Tabs
        defaultValue={AuthType.LOGIN}
        className="w-[400px]"
        onValueChange={(e) => {
          setCurrentTab(e as AuthType);
        }}
      >
        <TabsList className="w-full flex">
          <TabsTrigger className="w-full" value={AuthType.LOGIN}>
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value={AuthType.SIGNUP}>
            Sign Up
          </TabsTrigger>
        </TabsList>
        <LoginForm />
        <SignUpForm currentTab={currentTab} />
      </Tabs>
    </main>
  );
}

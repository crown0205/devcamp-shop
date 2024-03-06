"use client";
import LoginForm from "@/components/molecules/LoginForm";
import SignUpForm from "@/components/molecules/SignUpForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginSchema, signUpSchema } from "@/validators/auth";
import { z } from "zod";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="w-full flex">
          <TabsTrigger className="w-full" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="sign-up">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <LoginForm />
        <SignUpForm />
      </Tabs>
    </main>
  );
}

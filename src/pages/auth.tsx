import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import React from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Container style={"max-w-96 my-6"}>
        <form className="flex flex-col gap-3 text-center">
          <span className="mb-1 text-xl font-semibold">
            Sign in to your account
          </span>
          <span className="text-left">Email</span>
          <Input />
          <div className="flex justify-between">
            <span>Password</span> <span>Forgot your password?</span>
          </div>
          <Input />
          <Button>Sign in</Button>
          <div className="flex items-center justify-between gap-3">
            <div className="bg-on-background h-0.5 w-full"></div>
            <span className="text-xs">OR</span>
            <div className="bg-on-background h-0.5 w-full"></div>
          </div>
          <Button variant={"outline"}>Sign in with Google</Button>
          <Button variant={"outline"}>Sign in with Facebook</Button>
          <div>
            <span>New to Soulscape?</span>
            <a>
              <span className="text-accent"> Create an account</span>
            </a>
          </div>
        </form>
      </Container>
    </motion.div>
  );
};

export default AuthPage;

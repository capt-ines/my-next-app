import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { PiFacebookLogoThin } from "react-icons/pi";
import { PiPinterestLogoThin } from "react-icons/pi";
import { PiGoogleLogoThin } from "react-icons/pi";

function Register() {
  return (
    <>
      <motion.div
        className="mx-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Container style="max-w-96 mx-auto">
          <form className="flex flex-col gap-3 text-center">
            <p className="mb-1 text-xl font-semibold">Create your account</p>
            <div className="text-left">
              <span className="mb-1">Username</span>
              <Input />
            </div>
            <div className="text-left">
              <span className="mb-1">Email</span>
              <Input />
            </div>
            <div className="text-left">
              <span className="mb-1">Password</span>
              <Input />
            </div>

            <Button>Create account</Button>

            <div className="flex items-center justify-between gap-3">
              <div className="bg-foreground h-px w-full"></div>
              <span className="text-xs">OR</span>
              <div className="bg-foreground h-px w-full"></div>
              {/* TODO: change to pseudoelement */}
            </div>
            <Button variant={"outline"}>
              Create account with Pinterest <PiPinterestLogoThin />
            </Button>
            <Button variant={"outline"}>
              Create account with Google <PiGoogleLogoThin />
            </Button>
            <Button variant={"outline"}>
              Create account with Facebook <PiFacebookLogoThin />
            </Button>
            <div className="flex items-center justify-center gap-2">
              Already have an account?
              <Link className="link" href="/login">
                Sign in
              </Link>
            </div>
          </form>
        </Container>
      </motion.div>
    </>
  );
}

export default Register;

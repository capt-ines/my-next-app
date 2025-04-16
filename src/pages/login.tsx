import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PiFacebookLogoThin } from "react-icons/pi";
import { PiPinterestLogoThin } from "react-icons/pi";
import { PiGoogleLogoThin } from "react-icons/pi";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";

function Login() {
  const supabase = createClient();
  const router = useRouter();

  const logIn = async (values) => {
    const { email, password } = values;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }
    router.push("/dashboard");
  };

  return (
    <>
      <motion.div
        className=""
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Container style={"max-w-96 mx-auto"}>
          <form className="flex flex-col gap-3 text-center">
            <p className="mb-1 text-xl font-semibold">
              Sign in to your account
            </p>
            <div className="text-left">
              <span className="mb-1">Email</span>
              <Input />
            </div>
            <div className="text-left">
              <div className="mb-1 flex justify-between">
                <span>Password</span>
                <span className="link">Forgot your password?</span>
              </div>
              <Input />
            </div>
            <Button>Sign in</Button>
            <span className="text-xs">OR</span>
            <Button variant={"outline"}>
              Sign in with Pinterest <PiPinterestLogoThin />
            </Button>
            <Button variant={"outline"}>
              Sign in with Google <PiGoogleLogoThin />
            </Button>
            <Button variant={"outline"}>
              Sign in with Facebook
              <PiFacebookLogoThin />
            </Button>
            <div className="flex items-center justify-center gap-2">
              <span translate="no">New to Soulscape?</span>
              <div className="link">
                <Link href="/register">
                  <span> Create an account</span>
                </Link>
              </div>
            </div>
          </form>
        </Container>
      </motion.div>
    </>
  );
}

export default Login;

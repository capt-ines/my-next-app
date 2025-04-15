import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { PiFacebookLogoThin } from "react-icons/pi";
import { PiPinterestLogoThin } from "react-icons/pi";
import { PiGoogleLogoThin } from "react-icons/pi";
import { Formik } from "formik";
import { registerSchema } from "@/schema/registerSchema";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useTriggerAnimation } from "@/hooks/useTriggerAnimation";

function Register() {
  const router = useRouter();
  const supabase = createClient();

  const signUp = async (values) => {
    const { email, password, username } = values;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      return;
    }
    {
      console.log("Sign-up response:", data);
      const user = data?.user;
      if (user) {
        const res = await fetch("/api/createAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            username,
          }),
        });
        if (!res.ok) {
          const { error: apiError } = await res.json();
          console.log({ username: apiError || "Failed to create account" });
          return;
        }
        router.push("/dashboard");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          signUp(values);
        }}
      >
        {(props) => <Form {...props} />}
      </Formik>
    </>
  );
}

const Form = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null!);
  useTriggerAnimation(
    buttonRef,
    "animate-shake",
    props.submitCount,
    Object.keys(props.errors).length > 0,
  );

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Container style="max-w-96 mx-auto">
        <form
          onSubmit={props.handleSubmit}
          className="flex flex-col gap-3 text-center"
        >
          <p className="mb-1 text-xl font-semibold">Create your account</p>
          <div className="text-left">
            <span className="mb-1">Username</span>
            <Input
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.username}
              name="username"
              className={clsx(
                props.touched.email && props.errors.email
                  ? `border-destructive`
                  : null,
              )}
            />
            {props.touched.username && props.errors.username ? (
              <span className="text-destructive">{props.errors.username}</span>
            ) : null}
          </div>
          <div className="text-left">
            <span className="mb-1">Email</span>
            <Input
              className={clsx(
                props.touched.email && props.errors.email
                  ? `border-destructive`
                  : null,
              )}
              name="email"
              type="email"
              value={props.values.email}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.touched.email && props.errors.email ? (
              <span className="text-destructive">{props.errors.email}</span>
            ) : null}
          </div>
          <div className="text-left">
            <span className="mb-1">Password</span>
            <Input
              className={clsx(
                props.touched.password && props.errors.password
                  ? `border-destructive`
                  : null,
              )}
              name="password"
              type="password"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.password}
            />
            {props.touched.password && props.errors.password ? (
              <span className="text-destructive">{props.errors.password}</span>
            ) : null}
          </div>

          <Button ref={buttonRef} type="submit">
            Create account
          </Button>

          <span className="text-xs">OR</span>
          <Button variant={"outline"} type="button">
            Create account with Pinterest <PiPinterestLogoThin />
          </Button>
          <Button variant={"outline"} type="button">
            Create account with Google <PiGoogleLogoThin />
          </Button>
          <Button variant={"outline"} type="button">
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
  );
};

export default Register;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PiFacebookLogoThin } from "react-icons/pi";
import { PiPinterestLogoThin } from "react-icons/pi";
import { PiGoogleLogoThin } from "react-icons/pi";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { Formik } from "formik";
// import { loginSchema } from "@/schema/loginSchema";
import clsx from "clsx";
import { useTriggerAnimation } from "@/hooks/useTriggerAnimation";

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
      return;
    }
    router.push("/dashboard");
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          logIn(values);
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
      <Container className="mx-auto max-w-96">
        <form
          onSubmit={props.handleSubmit}
          className="flex flex-col gap-3 text-center"
        >
          <p className="mb-1 text-xl font-semibold">Sign in to your account</p>
          {/* <div className="text-left">
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
        </div> */}
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
            <div className="flex justify-between">
              <span className="mb-1">Password</span>
              <span className="link mb-1">Forgot your password?</span>
            </div>
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
            Sign in
          </Button>

          <span className="text-xs">OR</span>
          <Button variant={"outline"} type="button">
            Sign in with Pinterest <PiPinterestLogoThin />
          </Button>
          <Button variant={"outline"} type="button">
            Sign in with Google <PiGoogleLogoThin />
          </Button>
          <Button variant={"outline"} type="button">
            Sign in with Facebook <PiFacebookLogoThin />
          </Button>
          <div className="flex items-center justify-center gap-2">
            New to Soulscape?
            <Link className="link" href="/register">
              Create an account
            </Link>
          </div>
        </form>
      </Container>
    </motion.div>
  );
};

export default Login;

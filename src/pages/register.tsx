import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { PiFacebookLogoThin } from "react-icons/pi";
import { PiPinterestLogoThin } from "react-icons/pi";
import { PiGoogleLogoThin } from "react-icons/pi";
import { Formik, useFormikContext } from "formik";
import { registerSchema } from "@/schema/registerSchema";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import clsx from "clsx";

function Register() {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });
          if (error) {
            setFieldError("email", error.message);
            console.log(error);
            console.log(values);
          } else {
            console.log(values);
            // const user = data.user;
            // if (user) {
            //   await supabase.from("users").insert([
            //     {
            //       id: user.id,
            //       username: values.username,
            //     },
            //   ]);
            // }
            router.push("/dashboard");
          }
          setSubmitting(false);
        }}
      >
        {(props) => <Form props={props} />}
      </Formik>
    </>
  );
}

const Form = ({ props }) => {
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const { submitCount, handleSubmit } = useFormikContext(); // Destructure submitCount from Formik context

  // Check if submitCount is available
  useEffect(() => {
    setSubmissionFailed(true);
    const timer = setTimeout(() => {
      setSubmissionFailed(false);
    }, 200);
    //TODO: add rate limit to form subimission

    return () => clearTimeout(timer);
  }, [submitCount]);

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
            {/* <Input
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          value={props.values.username}
          name="username"
        /> */}
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

          <Button
            className={clsx(
              Object.keys(props.errors).length > 0 &&
                submissionFailed &&
                `animate-shake`,
            )}
            type="submit"
          >
            Create account
          </Button>

          <span className="text-xs">OR</span>
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
  );
};

export default Register;

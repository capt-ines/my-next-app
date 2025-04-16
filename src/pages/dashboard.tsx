import React from "react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";

const Dashboard = ({ user }: { user: User }) => {
  const metadata = user?.user_metadata;
  return <h1>Hello, {metadata.username || "user"}!</h1>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: data.user,
    },
  };
}

export default Dashboard;

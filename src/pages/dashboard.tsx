import React from "react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import { createClient as createComponentClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";

const Dashboard = ({ user }: { user: User }) => {
  const metadata = user?.user_metadata;
  const router = useRouter();
  const signOut = async () => {
    const supabase = createComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    router.push("/");
  };
  return (
    <>
      <h1>Hello, {metadata.username || "user"}!</h1>
      <button onClick={signOut}>sign out</button>
    </>
  );
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

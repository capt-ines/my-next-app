import { createClient } from "../supabase/component";
import type { NextRouter } from "next/router";

export const signOut = async (router: NextRouter) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return;
  }
  router.push("/");
};

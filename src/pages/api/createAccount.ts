import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "../../utils/supabase/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createClient(req, res);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { username } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Username is required" });
  }

  const { error: updateError } = await supabase
    .from("users")
    .insert([{ id: user.id, username }]);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.status(200).json({ message: "Username updated successfully" });
}

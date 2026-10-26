import { supabase } from "@/lib/supabase";

/**
 * Called once a day by the Vercel cron in vercel.json.
 *
 * Supabase pauses a free project after a week without requests, which takes
 * the application form and the admin down with it. One cheap read a day
 * counts as activity. RLS returns nothing to an anonymous caller, so this
 * exposes no data.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await supabase.from("clients").select("id").limit(1);
  return Response.json({ ok: !error });
}

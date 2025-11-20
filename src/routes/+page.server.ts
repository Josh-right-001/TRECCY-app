import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session, user } = await safeGetSession()

  if (!session) {
    throw redirect(303, "/auth/login")
  }

  // Fetch user's cards
  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching cards:", error)
    return { cards: [] }
  }

  return { cards: cards || [] }
}

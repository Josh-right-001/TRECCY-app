import type { PageServerLoad, Actions } from "./$types"
import { redirect, fail } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  if (!session) {
    throw redirect(303, "/auth/login")
  }

  return {}
}

export const actions: Actions = {
  async generateCards({ request, locals: { supabase, safeGetSession } }) {
    const { user } = await safeGetSession()

    if (!user) {
      return fail(401, { error: "Non authentifié" })
    }

    const formData = await request.formData()
    const cardsData = formData.get("cardsData")

    if (!cardsData) {
      return fail(400, { error: "Données manquantes" })
    }

    const cards = JSON.parse(cardsData as string)

    // Insert cards into database
    const { error } = await supabase.from("cards").insert(
      cards.map((card: any) => ({
        user_id: user.id,
        ...card,
      })),
    )

    if (error) {
      console.error("[v0] Error inserting cards:", error)
      return fail(500, { error: "Erreur lors de la génération des cartes" })
    }

    return { success: true }
  },
}

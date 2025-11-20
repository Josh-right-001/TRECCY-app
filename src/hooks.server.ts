import { handle as authHandle } from "$lib/supabase/server"
import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"

const redirectHandle: Handle = async ({ event, resolve }) => {
  const { session } = await event.locals.safeGetSession()

  // Redirect to login if not authenticated and not on auth pages
  if (!session && !event.url.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth/login", event.url), 303)
  }

  // Redirect to home if authenticated and on login page
  if (session && event.url.pathname === "/auth/login") {
    return Response.redirect(new URL("/", event.url), 303)
  }

  return resolve(event)
}

export const handle = sequence(authHandle, redirectHandle)

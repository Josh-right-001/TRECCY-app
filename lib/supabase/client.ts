import { createBrowserClient } from "@supabase/ssr"

let clientInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (clientInstance) {
    return clientInstance
  }

  throw new Error("Supabase client not initialized. Use createClientAsync() or ensure environment variables are set.")
}

export async function createClientAsync() {
  if (clientInstance) {
    return clientInstance
  }

  try {
    const response = await fetch("/api/supabase-config")
    if (!response.ok) {
      throw new Error("Failed to fetch Supabase configuration")
    }

    const config = await response.json()

    if (!config.url || !config.anonKey) {
      throw new Error("Invalid Supabase configuration received")
    }

    clientInstance = createBrowserClient(config.url, config.anonKey)
    return clientInstance
  } catch (error) {
    console.error("[v0] Supabase client initialization error:", error)
    throw new Error("Unable to initialize Supabase client: missing configuration")
  }
}

export function resetClient() {
  clientInstance = null
}

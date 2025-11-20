import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Sidebar from "@/components/layout/sidebar"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Paramètres
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Personnalisez votre expérience</p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <p className="text-gray-700 dark:text-gray-300">Page de paramètres à venir...</p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Développé par{" "}
          <a
            href="https://josh-right-congo.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Josh Right
          </a>
        </div>
      </main>
    </div>
  )
}

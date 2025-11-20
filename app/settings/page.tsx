import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Sidebar from "@/components/layout/sidebar"

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const isGuestMode = cookieStore.get("guest_mode")?.value === "true"

  if (isGuestMode) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Paramètres
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            Personnalisez votre expérience
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-amber-600 dark:text-amber-400 mt-0.5"></i>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Mode invité : Les paramètres ne seront pas sauvegardés. Connectez-vous pour accéder à toutes les
                fonctionnalités.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Page de paramètres à venir...</p>
          </div>

          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
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
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Paramètres
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
          Personnalisez votre expérience
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Page de paramètres à venir...</p>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
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

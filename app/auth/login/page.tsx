"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientAsync } from "@/lib/supabase/client"
import Image from "next/image"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 100)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (password.toLowerCase() !== "treccy") {
      setError('Mot de passe incorrect. Tapez "Treccy" pour accéder.')
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const supabase = await createClientAsync()
      const demoEmail = "demo@treccy.com"
      const demoPassword = "TreccyDemo123!"

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      })

      if (signInError && signInError.message.includes("Invalid")) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { auto_confirm: true },
          },
        })

        if (signUpError) throw signUpError

        const { error: newSignInError } = await supabase.auth.signInWithPassword({
          email: demoEmail,
          password: demoPassword,
        })

        if (newSignInError) throw newSignInError
      } else if (signInError) {
        throw signInError
      }

      router.push("/")
      router.refresh()
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  function handleGuestAccess() {
    // Set a cookie to enable guest mode
    document.cookie = "guest_mode=true; path=/; max-age=31536000" // 1 year
    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      <div
        className={`w-full max-w-md transform transition-all duration-700 ease-out ${
          showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo with heartbeat animation */}
        <div className="flex justify-center mb-6 sm:mb-8 animate-pulse">
          <Image
            src="/images/ei-1763590404024-removebg-preview.png"
            alt="Treccy Logo"
            width={112}
            height={112}
            className="filter drop-shadow-2xl sm:w-32 sm:h-32"
          />
        </div>

        {/* Card with glassmorphism effect */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Bienvenue
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Entrez le mot de passe pour accéder à l'application
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tapez 'Treccy'"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-sm sm:text-base"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Indice: Le nom de l'application</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-xs sm:text-sm animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm sm:text-base"
            >
              <span className="relative z-10">{isLoading ? "Connexion..." : "Accéder à l'application"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">ou</span>
            </div>
          </div>

          <button
            onClick={handleGuestAccess}
            type="button"
            className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 relative overflow-hidden group text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Passer sans se connecter
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Développé par{" "}
            <a
              href="https://josh-right-congo.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 relative inline-block group"
            >
              Josh Right
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
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

    const supabase = createClient()
    const demoEmail = "demo@treccy.com"
    const demoPassword = "TreccyDemo123!"

    try {
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
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div
        className={`w-full max-w-md transform transition-all duration-700 ease-out ${
          showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo with heartbeat animation */}
        <div className="flex justify-center mb-8 animate-pulse">
          <Image
            src="/images/ei-1763590404024-removebg-preview.png"
            alt="Treccy Logo"
            width={128}
            height={128}
            className="filter drop-shadow-2xl"
          />
        </div>

        {/* Card with glassmorphism effect */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Bienvenue
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Entrez le mot de passe pour accéder à l'application
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tapez 'Treccy'"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Indice: Le nom de l'application</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? "Connexion..." : "Accéder à l'application"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
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

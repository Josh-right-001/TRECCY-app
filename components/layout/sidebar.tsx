"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClientAsync } from "@/lib/supabase/client"
import Image from "next/image"

interface NavItem {
  name: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: "fa-home" },
  { name: "Upload", path: "/upload", icon: "fa-cloud-upload-alt" },
  { name: "Settings", path: "/settings", icon: "fa-cog" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    try {
      const supabase = await createClientAsync()
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/auth/login")
    }
  }

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden w-12 h-12 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg flex items-center justify-center"
      >
        <i className={`fas ${isMobileOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 shadow-xl ${
          isOpen ? "w-64" : "w-20"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
            <Image
              src="/images/ei-1763590404024-removebg-preview.png"
              alt="Treccy Logo"
              width={isOpen ? 64 : 48}
              height={isOpen ? 64 : 48}
              className="transition-all duration-300"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <i className={`fas ${item.icon} text-xl transition-transform duration-200 group-hover:scale-110`}></i>
                {isOpen && <span className="font-medium">{item.name}</span>}

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-xl"></div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
            >
              <i className="fas fa-sign-out-alt text-xl transition-transform duration-200 group-hover:scale-110"></i>
              {isOpen && <span className="font-medium">Déconnexion</span>}
            </button>

            {isOpen && (
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
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
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block absolute -right-3 top-20 w-6 h-6 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 transition-colors duration-200 flex items-center justify-center"
          >
            <i className={`fas fa-chevron-${isOpen ? "left" : "right"} text-xs`}></i>
          </button>
        </div>
      </aside>
    </>
  )
}

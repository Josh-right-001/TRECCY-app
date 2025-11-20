"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CardItem from "@/components/cards/card-item"
import type { Card } from "@/lib/types"

interface HomeClientProps {
  cards: Card[]
  isGuestMode?: boolean
}

export default function HomeClient({ cards, isGuestMode = false }: HomeClientProps) {
  const [showCards, setShowCards] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100)
  }, [])

  function handleView(card: Card) {
    console.log("[v0] Viewing card:", card.id)
    // TODO: Implement PDF viewer modal
  }

  function handlePrint(card: Card) {
    if (card.pdf_url) {
      window.open(card.pdf_url, "_blank")
    }
  }

  function goToUpload() {
    router.push("/upload")
  }

  return (
    <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300 min-h-screen">
      {/* Header */}
      <div
        className={`mb-6 sm:mb-8 transform transition-all duration-700 ease-out ${
          showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Mes Cartes
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Gérez et consultez vos cartes de service
        </p>
        {isGuestMode && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">
            <i className="fas fa-user-secret"></i>
            Mode Invité
          </div>
        )}
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div
          className={`transform transition-all duration-700 ease-out delay-100 ${
            showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
              <i className="fas fa-id-card text-4xl sm:text-5xl text-gray-400 dark:text-gray-500"></i>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
              Aucune carte récente. Créez-en une pour commencer.
            </h3>

            <button
              onClick={goToUpload}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
            >
              Créer une carte
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={`transform transition-all duration-700 ease-out ${
                showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <CardItem card={card} onView={handleView} onPrint={handlePrint} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

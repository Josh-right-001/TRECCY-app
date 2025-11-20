"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CardItem from "@/components/cards/card-item"
import type { Card } from "@/lib/types"

interface HomeClientProps {
  cards: Card[]
}

export default function HomeClient({ cards }: HomeClientProps) {
  const [showCards, setShowCards] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100)
  }, [])

  function handleView(card: Card) {
    console.log("[v0] Viewing card:", card.id)
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
    <main className="flex-1 ml-64 p-8 transition-all duration-300">
      {/* Header */}
      <div
        className={`mb-8 transform transition-all duration-700 ease-out ${
          showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Mes Cartes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Gérez et consultez vos cartes de service</p>
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div
          className={`transform transition-all duration-700 ease-out delay-100 ${
            showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <i className="fas fa-id-card text-5xl text-gray-400 dark:text-gray-500"></i>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

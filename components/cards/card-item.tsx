"use client"

import { useState } from "react"
import type { Card } from "@/lib/types"
import Image from "next/image"

interface CardItemProps {
  card: Card
  onView?: (card: Card) => void
  onPrint?: (card: Card) => void
}

export default function CardItem({ card, onView, onPrint }: CardItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden group ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

      <div className="relative p-6 space-y-4">
        {/* Header with photo */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all duration-300">
            {card.photo_url ? (
              <Image
                src={card.photo_url || "/placeholder.svg"}
                alt={`${card.prenom} ${card.nom}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                {card.prenom[0]}
                {card.nom[0]}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {card.prenom} {card.nom}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.fonction}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <i className="fas fa-building text-cyan-600 dark:text-cyan-400"></i>
            <span>{card.departement}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
            <i className="fas fa-calendar text-teal-600 dark:text-teal-400"></i>
            <span>{new Date(card.created_at).toLocaleDateString("fr-FR")}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onView?.(card)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <i className="fas fa-eye"></i>
              View
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => onPrint?.(card)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <i className="fas fa-print"></i>
              Print
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

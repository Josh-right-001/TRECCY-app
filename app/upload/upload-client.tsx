"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { parseExcelFile, type ExcelRow } from "@/lib/utils/excel-parser"

interface TableData extends ExcelRow {
  photo?: File | null
}

interface UploadClientProps {
  userId: string
  isGuestMode?: boolean
}

export default function UploadClient({ userId, isGuestMode = false }: UploadClientProps) {
  const [uploadedData, setUploadedData] = useState<TableData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [showTable, setShowTable] = useState(false)
  const router = useRouter()

  async function handleFileSelect(file: File) {
    setIsProcessing(true)
    setProgress(0)

    try {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      const data = await parseExcelFile(file)
      setUploadedData(data.map((row) => ({ ...row, photo: null })))
      setShowTable(true)
    } catch (error) {
      console.error("[v0] Error parsing Excel:", error)
      alert("Erreur lors du traitement du fichier")
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  function handleAddRow() {
    setUploadedData([
      ...uploadedData,
      {
        nom: "",
        postnom: "",
        prenom: "",
        departement: "",
        fonction: "",
        photo: null,
      },
    ])
  }

  function handleDeleteRow(index: number) {
    setUploadedData(uploadedData.filter((_, i) => i !== index))
  }

  async function handleGenerate() {
    if (uploadedData.length === 0) return

    setIsProcessing(true)
    setProgress(0)
    setCurrentCard(0)

    try {
      if (isGuestMode) {
        console.log("[v0] Guest mode: Simulating card generation")
      }

      for (let i = 0; i < uploadedData.length; i++) {
        setCurrentCard(i + 1)
        setProgress(((i + 1) / uploadedData.length) * 100)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/")
    } catch (error) {
      console.error("[v0] Error generating cards:", error)
      alert("Erreur lors de la génération des cartes")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300 min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Importer des données
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Téléchargez un fichier Excel ou ajoutez manuellement des informations
        </p>
        {isGuestMode && (
          <div className="mt-3 flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <i className="fas fa-info-circle text-amber-600 dark:text-amber-400 mt-0.5"></i>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300">
              Mode invité : Les cartes générées ne seront pas sauvegardées. Connectez-vous pour enregistrer vos données.
            </p>
          </div>
        )}
      </div>

      {!showTable ? (
        <UploadZone onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <DataTable
            data={uploadedData}
            onDataChange={setUploadedData}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              onClick={handleAddRow}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Ajouter une ligne
            </button>

            <button
              onClick={handleGenerate}
              disabled={uploadedData.length === 0}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-magic"></i>
                <span className="hidden sm:inline">Enregistrer & Générer les cartes</span>
                <span className="sm:hidden">Générer</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      )}

      {isProcessing && (
        <LoadingProgress progress={progress} currentCard={currentCard} totalCards={uploadedData.length} />
      )}
    </main>
  )
}

function UploadZone({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.includes("spreadsheet") || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        onFileSelect(file)
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-3xl p-6 sm:p-12 transition-all duration-300 relative overflow-hidden group ${
        isDragging ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950" : "border-gray-300 dark:border-gray-700"
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-teal-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <i className="fas fa-cloud-upload-alt text-3xl sm:text-4xl text-white"></i>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Glissez votre fichier Excel ici
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">ou cliquez pour sélectionner un fichier</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Formats acceptés: .xlsx, .xls</p>
        </div>

        <label className="px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium relative overflow-hidden group/btn cursor-pointer">
          <span className="relative z-10 flex items-center gap-2">
            <i className="fas fa-file-excel"></i>
            Sélectionner un fichier
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  )
}

function DataTable({
  data,
  onDataChange,
  onAddRow,
  onDeleteRow,
}: {
  data: TableData[]
  onDataChange: (data: TableData[]) => void
  onAddRow?: () => void
  onDeleteRow?: (index: number) => void
}) {
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null)

  function handleCellChange(rowIndex: number, colName: keyof ExcelRow, value: string) {
    const newData = [...data]
    newData[rowIndex] = { ...newData[rowIndex], [colName]: value }
    onDataChange(newData)
    setEditingCell(null)
  }

  function handlePhotoUpload(rowIndex: number, event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const newData = [...data]
      newData[rowIndex] = { ...newData[rowIndex], photo: event.target.files[0] }
      onDataChange(newData)
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl -mx-4 sm:mx-0">
      <table className="w-full bg-white dark:bg-gray-800 min-w-[800px]">
        <thead className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
          <tr>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">#</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Photo</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Nom</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Postnom</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Prénom</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Département</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Fonction</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{i + 1}</td>
              <td className="px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center gap-2">
                  {row.photo ? (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-cyan-500">
                      <img
                        src={URL.createObjectURL(row.photo) || "/placeholder.svg"}
                        className="w-full h-full object-cover"
                        alt="Uploaded photo"
                      />
                    </div>
                  ) : (
                    <label className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                      <i className="fas fa-camera text-xs sm:text-sm text-gray-500 dark:text-gray-400"></i>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(i, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </td>
              {["nom", "postnom", "prenom", "departement", "fonction"].map((col) => (
                <td
                  key={col}
                  className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
                  onClick={() => setEditingCell({ row: i, col })}
                >
                  {editingCell?.row === i && editingCell?.col === col ? (
                    <input
                      type="text"
                      defaultValue={row[col as keyof ExcelRow]}
                      onBlur={(e) => handleCellChange(i, col as keyof ExcelRow, e.currentTarget.value)}
                      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                      className="w-full px-2 py-1 border border-cyan-500 rounded text-xs sm:text-sm bg-white dark:bg-gray-700"
                      autoFocus
                    />
                  ) : (
                    <span className="truncate block max-w-[100px] sm:max-w-none">
                      {row[col as keyof ExcelRow] || "-"}
                    </span>
                  )}
                </td>
              ))}
              <td className="px-3 sm:px-6 py-3 sm:py-4">
                <button
                  onClick={() => onDeleteRow?.(i)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                >
                  <i className="fas fa-trash text-xs sm:text-sm"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LoadingProgress({
  progress,
  currentCard,
  totalCards,
}: {
  progress: number
  currentCard: number
  totalCards: number
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="/images/ei-1763590404024-removebg-preview.png"
              alt="Treccy Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 animate-spin-slow"
            />
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Génération en cours...
        </h3>

        <div className="space-y-4">
          <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out ${
                progress < 100
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600"
                  : "bg-gradient-to-r from-green-600 to-green-600"
              }`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Carte {currentCard} sur {totalCards}
            </span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{Math.round(progress)}%</span>
          </div>

          {progress >= 100 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-2xl mb-2"></i>
              <p className="text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
                Génération terminée ! Disponible dans Home.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

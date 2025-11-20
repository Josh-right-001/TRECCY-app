export interface ExcelRow {
  nom: string
  postnom: string
  prenom: string
  departement: string
  fonction: string
}

export async function parseExcelFile(file: File): Promise<ExcelRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const data = e.target?.result
        const workbook = await import("xlsx").then((XLSX) => XLSX.read(data, { type: "binary" }))
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = (await import("xlsx").then((XLSX) => XLSX.utils.sheet_to_json(worksheet))) as any[]

        const rows: ExcelRow[] = jsonData.map((row: any) => ({
          nom: row["NOM"] || row["nom"] || row["Nom"] || "",
          postnom: row["POSTNOM"] || row["postnom"] || row["Postnom"] || "",
          prenom: row["PRENOM"] || row["prenom"] || row["Prénom"] || row["Prenom"] || "",
          departement: row["DEPARTEMENT"] || row["departement"] || row["Département"] || row["Departement"] || "",
          fonction: row["FONCTION"] || row["fonction"] || row["Fonction"] || "",
        }))

        resolve(rows)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Erreur de lecture du fichier"))
    reader.readAsBinaryString(file)
  })
}

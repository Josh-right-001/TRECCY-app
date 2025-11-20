export interface Card {
  id: string
  user_id: string
  nom: string
  postnom: string
  prenom: string
  departement: string
  fonction: string
  photo_url: string | null
  qr_code_url: string | null
  pdf_url: string | null
  created_at: string
  updated_at: string
}

export interface ExcelRow {
  nom: string
  postnom: string
  prenom: string
  departement: string
  fonction: string
}

export interface Settings {
  id: string
  user_id: string
  theme: "light" | "dark"
  card_color_primary: string
  card_color_secondary: string
  card_color_accent: string
  animations_enabled: boolean
  qr_code_enabled: boolean
}

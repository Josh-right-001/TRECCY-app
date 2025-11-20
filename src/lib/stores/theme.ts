import { writable } from "svelte/store"
import { browser } from "$app/environment"

type Theme = "light" | "dark"

const stored = browser ? (localStorage.getItem("theme") as Theme) || "light" : "light"

export const theme = writable<Theme>(stored)

theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem("theme", value)
    if (value === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
})

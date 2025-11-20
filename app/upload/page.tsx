import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Sidebar from "@/components/layout/sidebar"
import UploadClient from "./upload-client"

export default async function UploadPage() {
  const cookieStore = await cookies()
  const isGuestMode = cookieStore.get("guest_mode")?.value === "true"

  if (isGuestMode) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <UploadClient userId="guest" isGuestMode={true} />
      </div>
    )
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <UploadClient userId={user.id} isGuestMode={false} />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileLayout } from "@/components/layouts/profile-layout"

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  if (!authUser) {
    redirect("/login")
  }

  // Récupérer les infos utilisateur
  const { data: userData } = await supabase
    .from("users")
    .select("id, firstName, lastName, email, phone, role, avatarUrl")
    .eq("id", authUser.id)
    .single()

  if (!userData) {
    redirect("/login")
  }

  const user = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email || authUser.email || "",
    phone: userData.phone,
    avatarUrl: userData.avatarUrl,
    role: userData.role as "TUTEUR" | "TUTELLE",
  }

  return <ProfileLayout user={user} />
}
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AccountLayout } from "@/components/layouts/account-layout"

export default async function AccountPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Récupérer les infos utilisateur
  const { data: userData } = await supabase
    .from("users") 
    .select("firstName, lastName, email, avatarUrl, role")
    .eq("id", user.id)
    .single()

  return (
    <AccountLayout 
      firstName={userData?.firstName || "Utilisateur"}
      lastName={userData?.lastName || ""}
      email={user.email || ""}
      avatarUrl={userData?.avatarUrl} 
      role={userData?.role} >
      {/* Vous pouvez ajouter du contenu supplémentaire ici si nécessaire */}
    </AccountLayout>
  )
}
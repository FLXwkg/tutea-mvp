import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DocumentsLayout } from "@/components/layouts/documents-layout"

export default async function DocumentsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Récupérer les infos utilisateur
  const { data: userData } = await supabase
    .from("users")
    .select("firstName, lastName, role, tuteurCode, avatarUrl")
    .eq("id", user.id)
    .single()

  return (
    <DocumentsLayout user={userData}>
      {/* Vous pouvez ajouter du contenu supplémentaire ici si nécessaire */}
    </DocumentsLayout>
  )
}
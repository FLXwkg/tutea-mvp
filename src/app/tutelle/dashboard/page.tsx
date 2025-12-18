import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Récupérer les infos utilisateur depuis la base
  const { data: userData } = await supabase
    .from("users")
    .select("firstName, lastName, role")
    .eq("id", user.id)
    .single()

    const actionCards = [
    {
      id: 1,
      title: "Comment me préparer pour la journée ?",
      image: "/illustrations/morning-routine.svg", // Remplace par ton vrai chemin
      bgColor: "bg-[#F09332]",
      textColor: "text-foreground",
      onClick: () => console.log("Card 1 clicked"),
    },
    {
      id: 2,
      title: "Envoyer un message",
      image: "/illustrations/send-message.svg", // Remplace par ton vrai chemin
      bgColor: "bg-[#6B9BD1]",
      textColor: "text-white",
      onClick: () => console.log("Card 2 clicked"),
    },
  ]

  return (
    <DashboardLayout firstName={userData?.firstName || "Utilisateur"}>
      {/* Question section */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-montserrat font-semibold text-foreground mb-4">
          Que souhaite-tu faire aujourd'hui ?
        </h2>

        {/* Action cards */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="bg-[#F09332] rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <p className="text-base font-raleway font-semibold text-foreground">
                  Comment me préparer pour la
                </p>
                <p className="text-base font-raleway font-semibold text-foreground">
                  journée ?
                </p>
              </div>
            </div>
            <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#6B9BD1] rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <p className="text-base font-raleway font-semibold text-white">
                  Envoyer un message
                </p>
              </div>
            </div>
            <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
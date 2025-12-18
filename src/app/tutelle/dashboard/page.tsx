import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import FireCampIcon from "@/components/pictos/actions/fire-camp-icon"

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
        Icon: FireCampIcon,
        bgColor: "bg-[#F09332]",
        textColor: "text-foreground",
        href: "/tutelle/routines",
      },
      {
        id: 2,
        title: "Envoyer un message",
        Icon: FireCampIcon,
        bgColor: "bg-[#6B9BD1]",
        textColor: "text-white",
        href: "/tutelle/messages",
      },
    ]

  return (
    <DashboardLayout user={userData}>
      {/* Question section */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-montserrat font-semibold text-foreground mb-4">
          Que souhaite-tu faire aujourd'hui ?
        </h2>

        {/* Action cards */}
        <div className="space-y-4">
          {actionCards.map((card) => { 
            const IconComponent = card.Icon
            return (
              <Link
                key={card.id}
                href={card.href}
                className={`block w-full ${card.bgColor} rounded-3xl p-4 hover:opacity-90 transition-opacity`}
              >
                <div className="flex flex-col gap-3">
                  {/* Texte en haut */}
                  <p className={`text-left text-sm font-raleway font-semibold ${card.textColor} leading-relaxed`}>
                    {card.title}
                  </p>
                  
                  {/* Icon et Arrow en bas, espacés */}
                  <div className="flex items-center justify-between">
                    {/* Illustration */}
                    <div className="w-16 h-16 shrink-0">
                      <IconComponent className="w-full h-full"/>
                    </div>

                    {/* Bouton flèche */}
                    <div className="bg-white rounded-full p-2 shrink-0">
                      <ArrowRight className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
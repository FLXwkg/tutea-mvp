import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ArrowRight } from "lucide-react"

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

  const now = new Date()
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }
  const formattedDate = now.toLocaleDateString('fr-FR', dateOptions)
  const time = now.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <div className="min-h-screen bg-[#E8D5C4] pb-24">
      {/* Header */}
      <div className="bg-[#E8D5C4] px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-montserrat font-bold text-foreground">
              Bonjour, {userData?.firstName} !
            </h1>
            <p className="text-xl font-montserrat font-semibold text-foreground">
              Bienvenue sur TUTÉA
            </p>
          </div>
          <Button className="bg-brand-orange-light hover:bg-brand-orange text-foreground font-raleway font-semibold rounded-full px-4 py-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Compte
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher"
            className="w-full h-12 pl-4 pr-12 bg-white/80 border-none rounded-xl text-foreground placeholder:text-gray-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Time Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
          <p className="text-base font-raleway text-foreground mb-4 capitalize">
            {formattedDate}
          </p>
          <p className="text-6xl font-bold text-foreground tracking-tight">
            {time}
          </p>
        </div>
      </div>

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
                {/* Illustration placeholder */}
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
                {/* Illustration placeholder */}
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

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
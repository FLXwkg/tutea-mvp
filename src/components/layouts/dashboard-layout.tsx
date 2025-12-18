"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  user: { firstName: any; lastName: any; role: any; } | null
  children: React.ReactNode
  onSearch?: (value: string) => void
}

export function DashboardLayout({ user, children, onSearch }: DashboardLayoutProps) {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }
  const formattedDate = currentTime.toLocaleDateString('fr-FR', dateOptions)
  const time = currentTime.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  const basePath = user?.role === "TUTEUR" ? "/tuteur" : "/tutelle"

  return (
    <div className="min-h-screen bg-white pb-24">  
      {/* Welcome Section */}
      <div className="bg-brand-bg px-6 pb-6">
        <Header rightButton={{label: 'Compte', icon: User, onClick: () => router.push(`${basePath}/account`)}}  />
        <div className="flex justify-between items-start mt-6 mb-3">
          <div>
            <h1 className="text-2xl font-montserrat font-bold text-foreground">
              Bonjour, {user?.firstName || "Utilisateur"} !
            </h1>
            <p className="text-xl font-montserrat font-semibold text-foreground">
              Bienvenue sur TUTÉA
            </p>
          </div>
        </div>
      </div>

      {/* Time Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-8 text-center">
          <p className="text-base font-raleway text-foreground mb-4 capitalize">
            {formattedDate}
          </p>
          <p className="text-8xl font-bold text-foreground tracking-tight">
            {time}
          </p>
        </div>
      </div>

      {/* Content dynamique (section questions) */}
      {children}

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
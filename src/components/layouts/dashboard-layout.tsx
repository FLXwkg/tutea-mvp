"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/searchbar"
import { Navbar } from "@/components/navbar"

interface DashboardLayoutProps {
  firstName: string
  children: React.ReactNode
  onSearch?: (value: string) => void
}

export function DashboardLayout({ firstName, children, onSearch }: DashboardLayoutProps) {
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

  return (
    <div className="min-h-screen bg-white pb-24">  
      {/* Welcome Section */}
      <div className="bg-[#E8D5C4] px-6 pb-6">
        <Header showSearch={false} />
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-montserrat font-bold text-foreground">
              Bonjour, {firstName} !
            </h1>
            <p className="text-xl font-montserrat font-semibold text-foreground">
              Bienvenue sur TUTÉA
            </p>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar onSearch={onSearch} />
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
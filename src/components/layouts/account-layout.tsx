"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, LogOut, User, HelpCircle, History, Settings, Palette, Copy, Check } from "lucide-react"

interface AccountLayoutProps {
  firstName: string
  lastName: string
  email: string
  role: "TUTEUR" | "TUTELLE"
  tuteurCode?: string
  avatarUrl?: string
  children?: React.ReactNode
}

const menuItems = [
  {
    id: 1,
    label: "Profil",
    icon: User,
    href: "/account/profile",
  },
  {
    id: 2,
    label: "Aide",
    icon: HelpCircle,
    href: "/account/help",
  },
  {
    id: 3,
    label: "Historique",
    icon: History,
    href: "/account/history",
  },
  {
    id: 4,
    label: "Paramètres",
    icon: Settings,
    href: "/account/settings",
  },
  {
    id: 5,
    label: "Interface",
    icon: Palette,
    href: "/account/interface",
  },
]

export function AccountLayout({ 
  firstName, 
  lastName, 
  email,
  role,
  tuteurCode,
  avatarUrl,
  children 
}: Readonly<AccountLayoutProps>) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const copyToClipboard = () => {
    if (tuteurCode) {
      navigator.clipboard.writeText(tuteurCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLogout = async () => {
    try {
      // Call your logout API endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })
      
      if (response.ok) {
        // Redirect to login page
        router.push("/login")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className='bg-brand-bg'>
        {/* Header */}
        <div className="px-6 pb-6">
          <Header 
            rightButton={{
              label: 'Retour', 
              icon: ChevronRight,
              onClick: () => window.history.back()
            }} 
          />
        </div>

        {/* Profile Section */}
        <div className="bg-brand-bg px-6 pb-4">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
              {avatarUrl ? (
                <Image 
                  src={avatarUrl} 
                  alt={`${firstName} ${lastName}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-orange text-white text-3xl font-bold">
                  {firstName.charAt(0)}{lastName.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Name */}
            <h2 className="text-xl font-montserrat font-bold text-foreground mb-1">
              {firstName} {lastName}
            </h2>
            
            {/* Email */}
            <p className="text-sm font-raleway text-gray-600 mb-3">
              {email}
            </p>

            {/* Tuteur Code - Seulement pour les tuteurs */}
            {role === "TUTEUR" && tuteurCode && (
              <div className="bg-white rounded-2xl p-4 w-full max-w-xs shadow-sm">
                <p className="text-xs font-raleway text-gray-600 mb-2">
                  Votre code tuteur
                </p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-lg font-mono font-bold text-brand-blue">
                    {tuteurCode}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copier le code"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-xs font-raleway text-gray-500 mt-2">
                  Partagez ce code avec vos tutellés pour les lier à votre compte
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 pt-8 pb-4">
        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 text-foreground" />
                  <span className="text-sm font-raleway font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="w-full flex items-center justify-between bg-red-50 rounded-2xl p-4 hover:bg-red-100 transition-colors mt-6">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="text-sm font-raleway font-medium text-red-600">
              Déconnexion
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>

        {/* Children (contenu additionnel) */}
        {children}
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
"use client"

import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, LogOut, User, HelpCircle, History, Settings, Palette } from "lucide-react"

interface AccountLayoutProps {
  firstName: string
  lastName: string
  email: string
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
  avatarUrl,
  children 
}: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className='bg-brand-bg'>
        {/* Header */}
      <div className=" px-6 pb-6">
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
          <p className="text-sm font-raleway text-gray-600">
            {email}
          </p>
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
        <button className="w-full flex items-center justify-between bg-red-50 rounded-2xl p-4 hover:bg-red-100 transition-colors mt-6">
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
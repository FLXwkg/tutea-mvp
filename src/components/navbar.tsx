"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Calendar, MessageSquare, FileText, PiggyBankIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import path from "path"

export function Navbar() {
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single()
        setRole(data?.role || null)
      }
    }
    getRole()
  }, [])

  if (!role) return null

  const basePath = role === "TUTEUR" ? "/tuteur" : "/tutelle"

  const navItems = [
    { href: `${basePath}/dashboard`, icon: Home, label: "Accueil", aliases: [
      `${basePath}/account`, `${basePath}/account/profile`, `${basePath}/account/settings`
    ] },
    { href: `${basePath}/calendar`, icon: Calendar, label: "Calendrier", aliases: [] },
    { href: `${basePath}/documents`, icon: FileText, label: "Documents", aliases: []  },
    { href: `${basePath}/budget`, icon: PiggyBankIcon, label: "Budget", aliases: []  },
    { href: `${basePath}/messages`, icon: MessageSquare, label: "Messages", aliases: []  },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-transparent">
      <div className="mx-4 bg-white shadow-lg z-50 rounded-xl">
        <div className="flex justify-around items-center h-18 gap-0 border rounded-xl">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || item.aliases?.some(alias => pathname === alias)
            console.log("Comparing", pathname, "with", item.href, "and aliases", item.aliases, "isActive:", isActive)
            const Icon = item.icon
            const isFirst = index === 0
            const isLast = index === navItems.length - 1
            const nextIsActive = index < navItems.length - 1 && pathname === navItems[index + 1].href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-4 py-4 flex-1 transition-all relative
                  ${isActive ? "bg-[#2A2A2A] text-white rounded-xl" : "text-gray-600 hover:bg-gray-100"}
                  ${isFirst ? "rounded-l-xl" : ""}
                  ${isLast ? "rounded-r-xl" : ""}
                  `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-raleway font-medium">{item.label}</span>
                
                {/* Bordure à droite, cachée si l'élément actuel ou le suivant est actif */}
                {!isLast && !isActive && !nextIsActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-gray-200" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
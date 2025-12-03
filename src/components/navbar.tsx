"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Calendar, MessageSquare, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

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
    { href: `${basePath}/dashboard`, icon: Home, label: "Accueil" },
    { href: `${basePath}/calendar`, icon: Calendar, label: "Calendrier" },
    { href: `${basePath}/messages`, icon: MessageSquare, label: "Messages" },
    { href: `${basePath}/documents`, icon: FileText, label: "Documents" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#2A2A2A] border-t border-gray-800 z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-raleway">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
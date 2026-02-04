"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { ChevronRight, Info, Home } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatarUrl?: string
  role: "TUTEUR" | "TUTELLE"
}

interface ProfileLayoutProps {
  user: User
  onSave?: (updatedUser: Partial<User>) => Promise<void>
}

export function ProfileLayout({ user, onSave }: ProfileLayoutProps) {
  const [isEditing, setIsEditing] = useState(user.role === "TUTEUR")
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
  })
  const [saving, setSaving] = useState(false)

  const isTuteur = user.role === "TUTEUR"

  const handleSave = async () => {
    if (!onSave) return
    
    setSaving(true)
    try {
      await onSave(formData)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
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
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Info Banner - Only for TUTELLE */}
        {!isTuteur && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-raleway font-semibold text-blue-900 mb-1">
                Informations
              </h3>
              <p className="text-xs font-raleway text-blue-700 leading-relaxed">
                Pour modifier vos informations personnelles, contactez votre tuteur
              </p>
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-montserrat font-bold text-foreground mb-6">
          Profil
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {user.avatarUrl ? (
              <Image 
                src={user.avatarUrl} 
                alt={`${user.firstName} ${user.lastName}`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-orange text-white text-3xl font-bold">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Prénom */}
          <div>
            <label className="text-xs font-raleway text-gray-500 mb-2 block">
              Prénom
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
                className="h-14 pl-12 bg-gray-100 border-0 rounded-2xl text-foreground font-raleway disabled:opacity-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="text-xs font-raleway text-gray-500 mb-2 block">
              Nom
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
                className="h-14 pl-12 bg-gray-100 border-0 rounded-2xl text-foreground font-raleway disabled:opacity-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Mail */}
          <div>
            <label className="text-xs font-raleway text-gray-500 mb-2 block">
              Mail
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="h-14 pl-12 bg-gray-100 border-0 rounded-2xl text-foreground font-raleway disabled:opacity-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Numéro d'urgence */}
          <div>
            <label className="text-xs font-raleway text-gray-500 mb-2 block">
              Numéro d'urgence
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="06 71 56 76 69"
                className="h-14 pl-12 bg-gray-100 border-0 rounded-2xl text-foreground font-raleway disabled:opacity-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Button - Only for TUTEUR */}
          {isTuteur && (
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full h-12 bg-brand-blue hover:bg-brand-purple text-white font-montserrat font-semibold rounded-xl mt-6"
            >
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          )}
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
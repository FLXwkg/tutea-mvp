"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "@/components/pictos/arrow-right"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "TUTELLE" as "TUTEUR" | "TUTELLE",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      // 2. Créer le profil utilisateur dans la base
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: authData.user?.id,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        }),
      })

      if (!response.ok) throw new Error("Erreur lors de la création du profil")

      // Rediriger vers la page de connexion
      router.push("/login?message=Compte créé avec succès")
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
          <Logo className="text-center" />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-montserrat font-semibold text-center text-foreground">
            Créer votre compte Tutéa
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="text"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
            />

            <Input
              type="text"
              placeholder="Nom"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
            />

            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
            />

            <Input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
            />

            <div className="space-y-2">
              <Label>Je suis :</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="TUTELLE"
                    checked={formData.role === "TUTELLE"}
                    onChange={(e) => setFormData({ ...formData, role: "TUTELLE" })}
                  />
                  <span className="text-sm">Personne sous tutelle</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="TUTEUR"
                    checked={formData.role === "TUTEUR"}
                    onChange={(e) => setFormData({ ...formData, role: "TUTEUR" })}
                  />
                  <span className="text-sm">Tuteur</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-blue hover:bg-brand-purple text-white font-montserrat font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? "Création..." : "Créer mon compte"}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm font-raleway text-brand-blue hover:underline"
              >
                Déjà un compte ? Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
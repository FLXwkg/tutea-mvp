"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "@/components/pictos/arrow-right"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Récupérer le profil utilisateur pour vérifier son rôle
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("email", email)
        .single()

      // Rediriger selon le rôle
      if (userData?.role === "TUTEUR") {
        router.push("/dashboard/tuteur")
      } else {
        router.push("/dashboard/tutelle")
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Logo className="text-center" />
        </div>

        {/* Formulaire */}
        <div className="space-y-6">
          <h2 className="text-xl font-montserrat font-semibold text-center text-foreground">
            Bienvenue sur votre espace Tutéa
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <p className="text-sm">Identifiant de connexion</p>
              <Input
                type="email"
                placeholder="Identifiant"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <p className="text-sm">Mot de passe</p>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[42px] border-brand-blue-light border-2 bg-brand-blue-bg rounded-[9px] text-sm font-raleway"
              />
              <button
                type="button"
                className="text-sm font-raleway text-brand-blue hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>



            {/* Message d'erreur */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-blue-light hover:bg-brand-blue text-white font-montserrat font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? "Connexion..." : "Se connecter"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
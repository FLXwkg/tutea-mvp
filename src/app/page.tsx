"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'onboarding a été complété
    const onboardingCompleted = localStorage.getItem("tutea_onboarding_completed")
    
    if (!onboardingCompleted) {
      router.push("/onboarding")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FileText, Lightbulb } from "lucide-react"
import { OnboardingImage1 } from "@/components/pictos/onboarding-1"
import { OnboardingImage2 } from "@/components/pictos/onboarding-2"
import { OnboardingImage3 } from "@/components/pictos/onboarding-3"

const onboardingSteps = [
  {
    id: 1,
    title: "Qu'est-ce que TUTÉA ?",
    description: "Tutéa est une application pensée pour simplifier le quotidien des tuteurs et renforcer l'autonomie des personnes protégées, en centralisant toutes les tâches essentielles dans un outil simple, moderne et intuitif.",
    icon: OnboardingImage1,
  },
  {
    id: 2,
    title: "Retrouvez l'essentiel",
    description: "Sur Tutéa, plusieurs fonctionnalités sont proposées pour faciliter la gestion du quotidien :",
    features: [
      "un calendrier partagé,",
      "des tutos pour accompagner les actions du quotidien,",
      "des outils pour gérer le budget,",
      "un gestionnaire de documents administratifs.",
    ],
    icon: OnboardingImage2,
  },
  {
    id: 3,
    title: "Vous êtes prêt !",
    description: "Bravo, vous avez terminé les étapes d'onboarding ! Vous pouvez dès à présent accéder à l'ensemble des fonctionnalités de Tutéa pour mieux organiser, comprendre, et gérer les démarches. Commencez votre expérience en toute confiance.",
    icon: OnboardingImage3
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleSkip = () => {
    handleFinish()
  }

  const handleFinish = () => {
    // Marquer l'onboarding comme terminé et rediriger vers signup
    localStorage.setItem("tutea_onboarding_completed", "true")
    router.push("/signup")
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="min-h-screen bg-[#E8D5C4] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#E8D5C4] rounded-3xl p-8 relative">
        {/* Illustration/Icon */}
        <div className="flex justify-center mb-8">
          <Icon />
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-20 mb-8">
          {onboardingSteps.map((s, index) => (
            <div
              key={s.id}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-montserrat font-semibold transition-colors ${
                index === currentStep
                  ? "bg-white text-brand-blue border-brand-blue"
                  : index < currentStep
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-brand-blue border-border"
              }`}
            >
              {index < currentStep ? "✓" : `0${s.id}`}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-montserrat font-bold text-foreground mb-4">
            {step.title}
          </h2>
          <p className="text-sm font-raleway text-foreground leading-relaxed">
            {step.description}
          </p>
          
          {step.features && (
            <ul className="mt-4 space-y-2 text-left">
              {step.features.map((feature, index) => (
                <li key={index} className="text-sm font-raleway text-foreground flex items-start">
                  <span className="text-brand-blue mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full h-14 bg-brand-blue hover:bg-brand-purple text-white font-montserrat font-semibold rounded-2xl flex items-center justify-center gap-2 text-base"
          >
            Continuez
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full h-14 bg-transparent border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10 font-montserrat font-semibold rounded-2xl text-base"
          >
            Passez
          </Button>
        </div>
      </div>
    </div>
  )
}
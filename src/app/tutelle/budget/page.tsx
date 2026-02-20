import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BudgetLayout } from "@/components/layouts/budget-layout"

export default async function TuteurBudgetPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Mock data
  const balance = 2305.92

  const transactions = [
    {
      id: "1",
      title: "Loyer",
      amount: -545,
      date: "23 février 2026",
      paymentMethod: "Virement",
      iconName: "Home",
      iconBgColor: "bg-orange-400",
      hasDocument: false,
    },
    {
      id: "2",
      title: "Course",
      amount: -200,
      date: "23 février 2026",
      paymentMethod: "Paiement par carte",
      iconName: "ShoppingCart",
      iconBgColor: "bg-blue-400",
      hasDocument: true,
    },
    {
      id: "3",
      title: "Café",
      amount: -2,
      date: "23 février 2026",
      paymentMethod: "Paiement par carte",
      iconName: "Coffee",
      iconBgColor: "bg-orange-300",
      hasDocument: false,
    },
    {
      id: "4",
      title: "Loisirs",
      amount: -22,
      date: "23 février 2026",
      paymentMethod: "Paiement par carte",
      iconName: "Tv",
      iconBgColor: "bg-purple-300",
      hasDocument: false,
    },
  ]

  return <BudgetLayout role="TUTELLE" balance={balance} transactions={transactions} />
}
"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { User, Plus, Eye, Home, ShoppingCart, Coffee, Tv, DollarSign } from "lucide-react"
import { FileUploadModal } from "@/components/modals/file-upload-modal"

interface Transaction {
  id: string
  title: string
  amount: number
  date: string
  paymentMethod: string
  iconName: string
  iconBgColor: string
  hasDocument?: boolean
}

interface BudgetLayoutProps {
  role: "TUTEUR" | "TUTELLE"
  balance: number
  transactions: Transaction[]
}

// Map des icônes
const iconMap: Record<string, any> = {
  Home,
  ShoppingCart,
  Coffee,
  Tv,
  DollarSign,
}

export function BudgetLayout({ role, balance, transactions }: Readonly<BudgetLayoutProps>) {
  const isTuteur = role === "TUTEUR"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)

  const handleAddDocument = (transactionId: string) => {
    setSelectedTransactionId(transactionId)
    setIsModalOpen(true)
  }

  const handleUpload = async (file: File) => {
    // Mock upload - vraie logique plus tard
    console.log("Uploading file for transaction:", selectedTransactionId, file)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className='bg-brand-bg'>
        {/* Header */}
        <div className="px-6 pb-6">
          <Header 
            rightButton={{
              label: 'Compte', 
              icon: User,
            }} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title */}
        <h1 className="text-2xl font-montserrat font-bold text-foreground mb-6">
          Budget
        </h1>

        {/* Balance Card */}
        <div className="bg-[#0B5A8A] rounded-3xl p-6 mb-6 text-white">
          <p className="text-sm font-raleway mb-2">
            Votre solde actuel est de :
          </p>
          <p className="text-3xl font-montserrat font-bold">
            + {balance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </p>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const IconComponent = iconMap[transaction.iconName]
            const showAddButton = isTuteur && !transaction.hasDocument
            const showViewButton = transaction.hasDocument

            return (
              <div
                key={transaction.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${transaction.iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>
                  {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-raleway font-semibold text-foreground mb-1">
                    {transaction.title}
                  </p>
                  <p className="text-xs font-raleway text-gray-500">
                    {transaction.date}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <p className={`text-sm font-raleway font-bold mb-1 ${transaction.amount < 0 ? 'text-foreground' : 'text-green-600'}`}>
                    {transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                  <p className="text-xs font-raleway text-gray-500">
                    {transaction.paymentMethod}
                  </p>
                </div>

                {/* Action Button */}
                {/* Action Button */}
                {showViewButton ? (
                  <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                ) : showAddButton ? (
                  <button 
                    onClick={() => handleAddDocument(transaction.id)}
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* Upload Modal */}
      <FileUploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
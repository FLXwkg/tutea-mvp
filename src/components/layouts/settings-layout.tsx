"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { ChevronRight, ChevronDown } from "lucide-react"

interface Question {
  id: string
  question: string
  answer: string
}

interface Section {
  id: string
  title: string
  questions: Question[]
}

interface SettingsLayoutProps {
  title: string
  sections: Section[]
}

export function SettingsLayout({ title, sections }: Readonly<SettingsLayoutProps>) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
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
        {/* Title */}
        <h1 className="text-2xl font-montserrat font-bold text-foreground mb-6">
          {title}
        </h1>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id}>
              {/* Section Title */}
              <h2 className="text-base font-raleway font-semibold text-foreground mb-3">
                {section.title}
              </h2>

              {/* Questions */}
              <div className="space-y-3">
                {section.questions.map((question) => {
                  const isExpanded = expandedQuestions.has(question.id)
                  
                  return (
                    <div
                      key={question.id}
                      className="bg-gray-50 rounded-2xl overflow-hidden transition-all"
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 text-left">
                          <p className="text-xs font-raleway text-gray-500 mb-1">
                            {section.title}
                          </p>
                          <p className="text-sm font-raleway font-medium text-foreground">
                            {question.question}
                          </p>
                        </div>
                        
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-600 shrink-0 ml-3" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 ml-3" />
                        )}
                      </button>

                      {/* Answer (expanded) */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="border-t border-gray-200 pt-3">
                            <p className="text-sm font-raleway text-gray-700 leading-relaxed">
                              {question.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  )
}
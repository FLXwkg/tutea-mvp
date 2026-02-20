"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { MoreVertical, Folder, User, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileUploadModal } from "@/components/modals/file-upload-modal"

interface DocumentsLayoutProps {
  user: { firstName: any; lastName: any; role: any; } | null
  children?: React.ReactNode
}

export function DocumentsLayout({ user, children }: Readonly<DocumentsLayoutProps>) {
  const router = useRouter()
  const basePath = user?.role === "TUTEUR" ? "/tuteur" : "/tutelle"
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpload = async (file: File) => {
    // Mock upload - vous implémenterez la vraie logique plus tard
    console.log("Uploading file:", file)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Mock data
  const recentFiles = [
    {
      id: 1,
      title: "Carte d'identité",
      type: "image",
      thumbnail: "🪪", // Mock emoji
    },
    {
      id: 2,
      title: "Facture pharmacie...",
      type: "document",
      thumbnail: "📄",
    },
    {
      id: 3,
      title: "Photo d'identité",
      type: "image",
      thumbnail: "👤",
    },
    {
      id: 4,
      title: "Prendre ta douche",
      type: "document",
      thumbnail: "📋",
    },
  ]

  const folders = [
    { id: 1, name: "Habitation", icon: Folder },
    { id: 2, name: "Identité", icon: Folder },
  ]

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className='bg-brand-bg'>
        {/* Header */}
        <div className="px-6 pb-6">
          <Header 
            rightButton={{
              label: 'Compte', 
              icon: User,
              onClick: () => router.push(`${basePath}/account`)
            }} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title */}
        <h1 className="text-2xl font-montserrat font-bold text-foreground mb-6">
          Fichiers personnels
        </h1>

        {/* Recent Files Section */}
        <div className="mb-8">
          <h2 className="text-lg font-montserrat font-semibold text-foreground mb-4">
            Fichier récents
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-4 relative"
              >
                {/* Mock thumbnail */}
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                  {file.thumbnail}
                </div>
                
                {/* File name */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-raleway font-medium text-foreground truncate">
                    {file.title}
                  </p>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Folders Section */}
        <div>
          <h2 className="text-lg font-montserrat font-semibold text-foreground mb-4">
            Dossiers
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {folders.map((folder) => {
              const IconComponent = folder.icon
              return (
                <Link
                  key={folder.id}
                  href={`/documents/folder/${folder.id}`}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-colors relative"
                >
                  {/* Folder icon */}
                  <div className="flex flex-col items-center justify-center mb-3">
                    <IconComponent className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  {/* Folder name */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-raleway font-medium text-foreground text-center w-full">
                      {folder.name}
                    </p>
                    <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        {children}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-6 bg-blue-900 hover:bg-blue-700 text-white text-xs rounded-md px-3 pt-1 pb-2 shadow-lg flex items-center gap-2 transition-all z-40"
      >
        Ajouter un fichier
        <Download className="w-4 h-5 text-xs" />
      </button>

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
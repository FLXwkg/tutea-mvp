"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload?: (file: File) => Promise<void>
}

export function FileUploadModal({ isOpen, onClose, onUpload }: Readonly<FileUploadModalProps>) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files?.[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleValidate = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      if (onUpload) {
        await onUpload(selectedFile)
      }
      onClose()
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-montserrat font-bold text-foreground mb-2">
          Dépôt de fichiers
        </h2>
        <p className="text-sm font-raleway text-gray-600 mb-6">
          Ajouter votre document dans la zone ci-dessous
        </p>

        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 mb-4 transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            
            {selectedFile ? (
              <p className="text-sm font-raleway text-foreground mb-2">
                {selectedFile.name}
              </p>
            ) : (
              <p className="text-sm font-raleway font-semibold text-foreground mb-2">
                Déposer votre fichier
              </p>
            )}

            <div className="flex items-center gap-3 my-3">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-xs font-raleway text-gray-500">OU</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-raleway font-medium rounded-xl px-6"
              >
                Explorateur de fichiers
              </Button>
            </label>
          </div>
        </div>

        {/* File info */}
        <p className="text-xs font-raleway text-gray-500 mb-6">
          Fichiers autorisés : pdf, png, jpg • 2 Mo max
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-100 text-foreground font-raleway font-medium rounded-xl"
          >
            Annuler
          </Button>
          <Button
            onClick={handleValidate}
            disabled={!selectedFile || uploading}
            className="flex-1 h-12 bg-gray-400 hover:bg-gray-500 text-white font-raleway font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Upload..." : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  )
}
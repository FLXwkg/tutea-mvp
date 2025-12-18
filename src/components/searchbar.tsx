"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
  className?: string
}

export function SearchBar({
  placeholder = "Rechercher",
  onSearch,
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full h-12 pl-4 pr-12 bg-white border-none rounded-xl text-foreground placeholder:text-gray-400 text-sm font-raleway"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  )
}
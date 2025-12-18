"use client"

import { ChevronRight, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "./searchbar"

interface HeaderProps {
  showSearch?: boolean
  searchPlaceholder?: string
  rightButton?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
  }
  onSearch?: (value: string) => void
}

export function Header({
  showSearch = true,
  searchPlaceholder = "Rechercher",
  rightButton = { label: "Retour", icon: ChevronRight },
  onSearch,
}: HeaderProps) {
  const RightIcon = rightButton?.icon

  return (
    <header className="bg-[#E8D5C4] px-6 py-4">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        {showSearch && <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} />}

        {!showSearch && <div className="flex-1" />}

        {/* Right Button */}
        {rightButton && (
          <Button
            onClick={rightButton.onClick}
            className="bg-white hover:bg-gray-100 text-foreground font-raleway font-medium rounded-xl px-4 h-12 flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="text-sm leading-none mb-0.5">{rightButton.label}</span>
            {RightIcon && <RightIcon className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </header>
  )
}
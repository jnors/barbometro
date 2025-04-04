"use client"

import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BuyMeCoffeeProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function BuyMeCoffee({ variant = "default", size = "default", className = "" }: BuyMeCoffeeProps) {
  const handleClick = () => {
    window.open(`https://www.buymeacoffee.com/barbometro`, "_blank")
  }

  return (
    <Button onClick={handleClick} variant={variant} size={size} className={`gap-2 ${className}`}>
      <Coffee className="h-4 w-4" />
      <span>Apoia-nos</span>
    </Button>
  )
}


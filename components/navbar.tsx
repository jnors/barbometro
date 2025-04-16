"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, Mail } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BuyMeCoffee } from "./buy-me-coffee"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Guias", href: "/guias" },
    { label: "Sobre", href: "/sobre" },
    {
      label: "Feedback/Bug",
      href: "https://tally.so/r/walOJW",
      isExternal: true,
    },
    {
      label: "Sugestões",
      href: "https://tally.so/r/meo5XQ",
      isExternal: true,
    },
    {
      label: "Contacto",
      href: "mailto:joaonorsilva92@gmail.com",
      isExternal: true,
      icon: Mail,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#FDF6E3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FDF6E3]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Barbometro_SmallerBorder.png"
              alt="Barbómetro Logo"
              width={150}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </Link>
          ))}
          <BuyMeCoffee variant="default" size="sm" className="!bg-primary text-white hover:!bg-primary/90" />
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
            isMenuOpen ? "slide-in-from-top-2" : "hidden",
          )}
        >
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-accent gap-2"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              ))}
              <BuyMeCoffee
                variant="default"
                size="sm"
                className="justify-start px-2 !bg-primary text-white hover:!bg-primary/90"
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}


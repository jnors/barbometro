"use client"

import { Home, Search, Map, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export function MobileNavigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  const navItems = [
    {
      label: "Início",
      href: "/",
      icon: Home,
    },
    {
      label: "Explorar",
      href: "/explore",
      icon: Search,
    },
    {
      label: "Mapa",
      href: "/map",
      icon: Map,
    },
    {
      label: "Favoritos",
      href: "/favorites",
      icon: Heart,
    },
    {
      label: "Perfil",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full text-xs",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}


"use client"

import { Map, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  view: "map" | "list"
  onViewChange: (view: "map" | "list") => void
  className?: string
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex rounded-lg border bg-card p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          view === "list" ? "bg-primary text-primary-foreground" : "bg-transparent",
        )}
        onClick={() => onViewChange("list")}
        aria-pressed={view === "list"}
        aria-label="Ver lista de restaurantes"
      >
        <List className="h-4 w-4" />
        <span>Lista</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          view === "map" ? "bg-primary text-primary-foreground" : "bg-transparent",
        )}
        onClick={() => onViewChange("map")}
        aria-pressed={view === "map"}
        aria-label="Ver mapa de restaurantes"
      >
        <Map className="h-4 w-4" />
        <span>Mapa</span>
      </Button>
    </div>
  )
}


"use client"

import { useState } from "react"
import type { Restaurant } from "@/types/restaurant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RestaurantList } from "@/components/restaurant-list"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface RestaurantListViewProps {
  restaurants: Restaurant[]
  isLoading: boolean
}

export function RestaurantListView({ restaurants, isLoading }: RestaurantListViewProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  return (
    <div className="space-y-4">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Mapa indisponível</AlertTitle>
        <AlertDescription>O mapa não pôde ser carregado. A visualização em lista está disponível.</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Restaurantes</CardTitle>
        </CardHeader>
        <CardContent>
          <RestaurantList
            restaurants={restaurants}
            isLoading={isLoading}
            onSelectRestaurant={setSelectedRestaurant}
            selectedRestaurant={selectedRestaurant} sortOption={""}          />
        </CardContent>
      </Card>
    </div>
  )
}


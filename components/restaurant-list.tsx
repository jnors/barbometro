"use client"

import React, { useState, useEffect } from "react";

import { Star, MapPin, ExternalLink, Check, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import type { Restaurant } from "@/types/restaurant"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface RestaurantListProps {
  restaurants: Restaurant[]
  isLoading: boolean
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedRestaurant: Restaurant | null
  sortOption: string
}

export function RestaurantList({
  restaurants : initialRestaurants,
  isLoading,
  onSelectRestaurant,
  selectedRestaurant,
  sortOption,
}: RestaurantListProps) {
  const isMobile = useMobile()
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  // Helper function to format price
  const formatPrice = (price: string) => {
    // If price already has € symbol, return as is
    if (price.includes("€")) return price
    // Otherwise, add € symbol
    return `${price}€`
  }

  // Helper function to format rating with one decimal place
  const formatRating = (rating: number) => {
    return rating.toFixed(1)
  }

  useEffect(() => {
    // Sort restaurants based on the selected sort option
    let sortedRestaurants = [...initialRestaurants];

    switch (sortOption) {
      case "rating":
        sortedRestaurants.sort((a, b) => b.ratingBarbudo - a.ratingBarbudo);
        break;
      case "price-asc":
        sortedRestaurants.sort((a, b) => parseFloat(a.precoPorPessoa) - parseFloat(b.precoPorPessoa));
        break;
      case "price-desc":
        sortedRestaurants.sort((a, b) => parseFloat(b.precoPorPessoa) - parseFloat(a.precoPorPessoa));
        break;
      case "name":
      default:
        sortedRestaurants.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }

    setRestaurants(sortedRestaurants);
  }, [sortOption, initialRestaurants]);

  const [expandedNotes, setExpandedNotes] = useState<number[]>([])

  const toggleNoteExpansion = (e: React.MouseEvent, restaurantId: number) => {
    e.stopPropagation()
    setExpandedNotes((prev) =>
      prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId],
    )
  }

  const isNoteExpanded = (restaurantId: number) => expandedNotes.includes(restaurantId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (restaurants.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum restaurante encontrado com os filtros atuais.</p>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${isMobile ? "max-h-[70vh]" : "max-h-[calc(100vh-10rem)]"} overflow-auto pr-2`}>
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant.id}
          className={cn(
            "overflow-hidden cursor-pointer transition-all hover:shadow-md",
            selectedRestaurant?.id === restaurant.id && "ring-2 ring-primary",
          )}
          onClick={() => onSelectRestaurant(restaurant)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{restaurant.nome}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {restaurant.localidade}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Visited status badge */}
                <Badge
                  variant={restaurant.visitado ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-2 py-0.5",
                    restaurant.visitado
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-100",
                  )}
                >
                  {restaurant.visitado ? (
                    <>
                      <Check className="w-3 h-3 mr-1" /> Visitado
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 mr-1" /> Por visitar
                    </>
                  )}
                </Badge>

                {/* Rating badge */}
                {restaurant.ratingBarbudo > 0 && (
                  <div className="flex items-center px-2 py-1 text-sm font-medium rounded-md bg-primary/10 text-primary">
                    <Star className="w-4 h-4 mr-1 fill-primary" />
                    {formatRating(restaurant.ratingBarbudo)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center mt-3 mb-2 gap-x-2 flex-wrap">
              {/* Cuisine types */}
              {restaurant.tipoCozinha.split(",").map((cuisine, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cuisine.trim()}
                </Badge>
              ))}
            </div>

            {/* Price per person if available*/}
            {restaurant.ratingBarbudo > 0 && (
            <div className="mt-2 text-sm flex items-center">
              <span className="font-medium mr-2">Preço por pessoa: </span>
              <span className="text-muted-foreground text-sm">{formatPrice(restaurant.precoPorPessoa)}</span>
            </div>)}

            {/* rating if available */}
            {restaurant.rating > 0 && (
              <div className="mt-2 text-sm flex items-center">
                <span className="font-medium mr-2">Rating:</span>
                <div className="flex">
                  <Star className="w-4 h-4 mr-1 fill-primary" />
                  {formatRating(restaurant.rating)}
                </div>
              </div>
            )}

            {/* rating PQ if available */}
            {restaurant.ratioQualidadePreco > 0 && (
              <div className="mt-2 text-sm flex items-center">
                <span className="font-medium mr-2">Relação Qualidade Preço:</span>
                <div className="flex">
                  <Star className="w-4 h-4 mr-1 fill-primary" />
                  {formatRating(restaurant.ratioQualidadePreco)}
                </div>
              </div>
            )}

            {/* rating PQ if available */}
            {restaurant.ratingServico > 0 && (
              <div className="mt-2 text-sm flex items-center">
                <span className="font-medium mr-2">Serviço:</span>
                <div className="flex">
                  <Star className="w-4 h-4 mr-1 fill-primary" />
                  {formatRating(restaurant.ratingServico)}
                </div>
              </div>
            )}

            {/* Notes if available */}
            {restaurant.notasOuSugestoes && (
              <div className="mt-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Notas ou Sugestões:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => toggleNoteExpansion(e, restaurant.id)}
                    aria-expanded={isNoteExpanded(restaurant.id)}
                  >
                    {isNoteExpanded(restaurant.id) ? (
                      <span className="flex items-center">
                        Menos <ChevronUp className="h-3 w-3 ml-1" />
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Mais <ChevronDown className="h-3 w-3 ml-1" />
                      </span>
                    )}
                  </Button>
                </div>
                <div
                  className={cn(
                    "text-muted-foreground mt-1 transition-[max-height,padding] duration-300 overflow-hidden",
                    isNoteExpanded(restaurant.id) ? "max-h-screen py-1" : "max-h-0 py-0",
                  )}
                >
                  {restaurant.notasOuSugestoes}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="mt-3 flex gap-2">
              {restaurant.googleMaps && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(restaurant.googleMaps, "_blank")
                  }}
                >
                  <MapPin className="w-3 h-3 mr-1" /> Ver no Mapa
                </Button>
              )}

              {restaurant.paginaOuInstagram && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(restaurant.paginaOuInstagram, "_blank")
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" /> Website
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
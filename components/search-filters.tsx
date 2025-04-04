"use client"

import { useState } from "react"
import { Search, X, Euro, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface SearchFiltersProps {
  onSearch: (term: string) => void
  onLocationFilter: (location: string) => void
  onCuisineFilter: (cuisines: string[]) => void
  onVisitedFilter: (status: string) => void
  onPriceFilter: (priceRange: string) => void
  onBarbudoRatingFilter: (rating: number | null) => void
  onSortChange: (sortOption: string) => void
  locations: string[]
  cuisines: string[]
}

export function SearchFilters({
  onSearch,
  onLocationFilter,
  onCuisineFilter,
  onVisitedFilter,
  onPriceFilter,
  onBarbudoRatingFilter,
  onSortChange,
  locations,
  cuisines,
}: SearchFiltersProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all")
  const [selectedBarbudoRating, setSelectedBarbudoRating] = useState<number | null>(null)
  const [selectedSort, setSelectedSort] = useState<string>("name")

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    let newSelectedCuisines: string[]

    if (checked) {
      newSelectedCuisines = [...selectedCuisines, cuisine]
    } else {
      newSelectedCuisines = selectedCuisines.filter((c) => c !== cuisine)
    }

    setSelectedCuisines(newSelectedCuisines)
    onCuisineFilter(newSelectedCuisines.length > 0 ? newSelectedCuisines : ["all"])
  }

  const clearCuisines = () => {
    setSelectedCuisines([])
    onCuisineFilter(["all"])
  }

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRange(value)
    onPriceFilter(value)
  }

  const handleBarbudoRatingChange = (value: number | null) => {
    setSelectedBarbudoRating(value)
    onBarbudoRatingFilter(value)
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    onSortChange(value)
  }

  return (
    <Card className="shadow-md border-primary/20 bg-primary text-primary-foreground">
      <CardContent className="p-6 space-y-6">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-primary hover:text-primary-foreground" />
          <Input
            placeholder="Pesquisar restaurantes..."
            className="pl-10 border-primary/30 focus-visible:ring-primary text-primary bg-secondary hover:bg-secondary/70 hover:text-primary-foreground"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Location filter */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Localidade</label>
            <Select onValueChange={onLocationFilter} defaultValue="all">
              <SelectTrigger className="w-full border-primary/30 text-primary bg-secondary hover:bg-secondary/70 hover:text-primary-foreground">
                <SelectValue placeholder="Localidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as localidades</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Multi-select Cuisine filter */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Tipos de Cozinha</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-primary border-primary/30 bg-secondary hover:bg-secondary/70"
                >
                  <span className="truncate">
                    {selectedCuisines.length > 0
                      ? `${selectedCuisines.length} tipo${selectedCuisines.length > 1 ? "s" : ""} selecionado${selectedCuisines.length > 1 ? "s" : ""}`
                      : "Tipos de Cozinha"}
                  </span>
                  {selectedCuisines.length > 0 && (
                    <Badge variant="secondary" className="ml-2 rounded-full px-1 font-normal">
                      {selectedCuisines.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <div className="p-2 flex justify-between items-center border-b">
                  <span className="text-sm font-medium">Tipos de Cozinha</span>
                  {selectedCuisines.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs hover:bg-secondary/70"
                      onClick={clearCuisines}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Limpar
                    </Button>
                  )}
                </div>
                <div className="p-2 max-h-[300px] overflow-auto">
                  {cuisines.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`cuisine-${cuisine}`}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                      />
                      <Label
                        htmlFor={`cuisine-${cuisine}`}
                        className={cn("text-sm cursor-pointer", selectedCuisines.includes(cuisine) && "font-medium")}
                      >
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Visited status filter */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Estado</label>
            <Tabs defaultValue="all" onValueChange={onVisitedFilter} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-secondary">
                <TabsTrigger
                  value="all"
                  className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="visited"
                  className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Visitados
                </TabsTrigger>
                <TabsTrigger
                  value="not-visited"
                  className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Por Visitar
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Price range filter */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Preço por Pessoa</label>
            <Select onValueChange={handlePriceRangeChange} defaultValue="all">
              <SelectTrigger className="w-full border-primary/30 text-primary bg-secondary hover:bg-secondary/70 hover:text-primary-foreground">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os preços</SelectItem>
                <SelectItem value="under30">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    <span>Menos de 30€</span>
                  </div>
                </SelectItem>
                <SelectItem value="under50">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    <Euro className="h-4 w-4 mr-1" />
                    <span>Menos de 50€</span>
                  </div>
                </SelectItem>
                <SelectItem value="under100">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    <Euro className="h-4 w-4 mr-1" />
                    <Euro className="h-4 w-4 mr-1" />
                    <span>Menos de 100€</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Barbudo rating filter */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Rating Barbudo (0-10)</label>
            <Select
              onValueChange={(value) => handleBarbudoRatingChange(value === "all" ? null : Number(value))}
              defaultValue="all"
            >
              <SelectTrigger className="w-full border-primary/30 text-primary bg-secondary hover:bg-secondary/70 hover:text-primary-foreground">
                <SelectValue placeholder="Rating Barbudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os ratings</SelectItem>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center">
                      <span className="mr-2">{rating}</span>
                      <div className="flex">
                        {Array.from({ length: Math.floor(rating / 2) }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {rating % 2 === 1 && (
                          <div className="relative">
                            <Star className="h-4 w-4 text-gray-300" />
                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                        {Array.from({ length: Math.floor((10 - rating) / 2) }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort selector */}
          <div className="w-full">
            <label className="text-sm font-bold text-secondary mb-2 block">Ordenar por</label>
            <Select onValueChange={handleSortChange} defaultValue="name">
              <SelectTrigger className="w-full border-primary/30 text-primary bg-secondary hover:bg-secondary/70 hover:text-primary-foreground">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome do Restaurante</SelectItem>
                <SelectItem value="rating">Rating (Maior para Menor)</SelectItem>
                <SelectItem value="price-asc">Preço (Menor para Maior)</SelectItem>
                <SelectItem value="price-desc">Preço (Maior para Menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


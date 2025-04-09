"use client"

import { useState, useEffect } from "react"
import { SearchFilters } from "@/components/search-filters"
import { RestaurantList } from "@/components/restaurant-list"
import { RestaurantMap } from "@/components/restaurant-map"
import { RestaurantListView } from "@/components/restaurant-list-view"
import { ViewToggle } from "@/components/view-toggle"
import { fetchRestaurants } from "@/lib/data"
import type { Restaurant } from "@/types/restaurant"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

// Helper function to extract price as a number from the price string
const extractPrice = (priceString: string): number => {
  // Extract numbers from the string (e.g., "20€-30€" -> 20)
  const match = priceString.match(/\d+/)
  if (match) {
    return Number.parseInt(match[0], 10)
  }
  return 0
}

// Helper function to sort restaurants alphabetically by name
const sortRestaurantsByName = (restaurants: Restaurant[]): Restaurant[] => {
  return [...restaurants].sort((a, b) => a.nome.localeCompare(b.nome, "pt"))
}

export function RestaurantExplorer() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(["all"])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [visitedFilter, setVisitedFilter] = useState<string>("all") // "all", "visited", "not-visited"
  const [priceFilter, setPriceFilter] = useState<string>("all") // "all", "under30", "under50", "under100"
  const [barbudoRatingFilter, setBarbudoRatingFilter] = useState<number | null>(null)
  const [mapError, setMapError] = useState<boolean>(false)
  const [mobileView, setMobileView] = useState<"map" | "list">("list") // Default to list view on mobile
  const [sortOption, setSortOption] = useState<string>("name")

  const isMobile = useMobile()

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchRestaurants()

      if (data.length === 0) {
        console.warn("No restaurants data returned")
        setError("Não foram encontrados restaurantes. Verifique se a fonte de dados está configurada corretamente.")
      } else {
        console.log(`Successfully loaded ${data.length} restaurants`)
        // Sort restaurants alphabetically by name
        const sortedData = sortRestaurantsByName(data)
        setRestaurants(sortedData)
        setFilteredRestaurants(sortedData)
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setError(
        `Não foi possível carregar os dados dos restaurantes: ${errorMessage}. Verifique a sua ligação à internet e as configurações da API.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Add a handler for the sort change
  const handleSortChange = (option: string) => {
    setSortOption(option)
  }

  useEffect(() => {
    let results = restaurants

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (restaurant) =>
          restaurant.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.tipoCozinha.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.notasOuSugestoes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.localidade.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by location
    if (selectedLocation !== "all") {
      results = results.filter((restaurant) => restaurant.localidade.toLowerCase() === selectedLocation.toLowerCase())
    }

    // Filter by cuisines (multiple selection)
    if (selectedCuisines.length > 0 && !selectedCuisines.includes("all")) {
      results = results.filter((restaurant) => {
        const restaurantCuisines = restaurant.tipoCozinha.split(",").map((c) => c.trim())
        return selectedCuisines.some((selectedCuisine) =>
          restaurantCuisines.some((cuisine) => cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())),
        )
      })
    }

    // Filter by visited status
    if (visitedFilter !== "all") {
      const isVisited = visitedFilter === "visited"
      results = results.filter((restaurant) => restaurant.visitado === isVisited)
    }

    // Filter by price range
    if (priceFilter !== "all") {
      results = results.filter((restaurant) => {
        const price = extractPrice(restaurant.precoPorPessoa)
        switch (priceFilter) {
          case "under30":
            return price < 30
          case "under50":
            return price < 50
          case "under100":
            return price < 100
          default:
            return true
        }
      })
    }

    // Filter by Barbudo rating (0-10 scale)
    if (barbudoRatingFilter !== null) {
      results = results.filter((restaurant) => {
        // Only include restaurants with a Barbudo rating that matches or exceeds the filter
        return restaurant.ratingBarbudo !== undefined && restaurant.ratingBarbudo >= barbudoRatingFilter
      })
    }

    // Sort the results based on the selected sort option
    if (sortOption === "name") {
      results = sortRestaurantsByName(results)
    } else if (sortOption === "rating") {
      results = [...results].sort((a, b) => b.ratingBarbudo - a.ratingBarbudo)
    } else if (sortOption === "price-asc") {
      results = [...results].sort((a, b) => extractPrice(a.precoPorPessoa) - extractPrice(b.precoPorPessoa))
    } else if (sortOption === "price-desc") {
      results = [...results].sort((a, b) => extractPrice(b.precoPorPessoa) - extractPrice(a.precoPorPessoa))
    }

    // Ensure filtered results are also sorted alphabetically
    setFilteredRestaurants(results)
  }, [
    searchTerm,
    selectedLocation,
    selectedCuisines,
    visitedFilter,
    priceFilter,
    barbudoRatingFilter,
    restaurants,
    sortOption,
  ])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location)
  }

  const handleCuisineFilter = (cuisines: string[]) => {
    setSelectedCuisines(cuisines)
  }

  const handleVisitedFilter = (status: string) => {
    setVisitedFilter(status)
  }

  const handlePriceFilter = (priceRange: string) => {
    setPriceFilter(priceRange)
  }

  const handleBarbudoRatingFilter = (rating: number | null) => {
    setBarbudoRatingFilter(rating)
  }

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    // On mobile, switch to map view when a restaurant is selected
    if (isMobile) {
      setMobileView("map")
    }
  }

  const handleMapError = () => {
    setMapError(true)
  }

  const handleRetry = () => {
    loadData()
  }

  const handleViewChange = (view: "map" | "list") => {
    setMobileView(view)
  }

  // Extract and sort unique locations alphabetically
  const sortedLocations = Array.from(
    new Set(restaurants.map((r) => r.localidade))
  ).sort((a, b) => a.localeCompare(b, "pt"));

  // Extract and sort unique cuisines alphabetically
  const sortedCuisines = Array.from(
    new Set(restaurants.flatMap((r) => r.tipoCozinha.split(",").map((cuisine) => cuisine.trim())))
  ).sort((a, b) => a.localeCompare(b, "pt"));

  return (
    <section className="container px-4 py-8 mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>{error}</p>
            <Button variant="outline" size="sm" className="w-fit flex items-center gap-2" onClick={handleRetry}>
              <RefreshCw className="h-4 w-4" /> Tentar novamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <SearchFilters
        onSearch={handleSearch}
        onLocationFilter={handleLocationFilter}
        onCuisineFilter={handleCuisineFilter}
        onVisitedFilter={handleVisitedFilter}
        onPriceFilter={handlePriceFilter}
        onBarbudoRatingFilter={handleBarbudoRatingFilter}
        onSortChange={handleSortChange}
        locations={sortedLocations}
        cuisines={sortedCuisines}
      />

      {/* Mobile View Toggle */}
      {isMobile && (
        <div className="mt-4 mb-4">
          <ViewToggle view={mobileView} onViewChange={handleViewChange} className="w-full" />
        </div>
      )}

      {/* Desktop: Side-by-side layout, Mobile: Toggle between views */}
      <div className={`${isMobile ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-6"} mt-4`}>
        {/* Restaurant List */}
        <div className={isMobile && mobileView === "map" ? "hidden" : ""}>
          <RestaurantList
            restaurants={filteredRestaurants}
            isLoading={isLoading}
            onSelectRestaurant={handleRestaurantSelect}
            selectedRestaurant={selectedRestaurant}
            sortOption={sortOption} // Pass sortOption as a prop
          />
        </div>

        {/* Map View */}
        <div
          className={`
            ${isMobile ? (mobileView === "list" ? "hidden" : "mt-4") : "sticky top-20"} 
            ${isMobile ? "h-[70vh]" : "h-[calc(100vh-10rem)]"}
          `}
        >
          {mapError ? (
            <RestaurantListView restaurants={filteredRestaurants} isLoading={isLoading} />
          ) : (
            <RestaurantMap
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              onSelectRestaurant={handleRestaurantSelect}
              onError={handleMapError}
            />
          )}
        </div>
      </div>
    </section>
  )
}


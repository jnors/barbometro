"use client"

import { useEffect, useRef, useState } from "react"
import type { Restaurant } from "@/types/restaurant"
import '@types/google.maps'
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useMobile } from "@/hooks/use-mobile"

interface RestaurantMapProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  onSelectRestaurant: (restaurant: Restaurant) => void
  onError?: () => void
}

// Declare google variable
declare global {
  interface Window {
    google: any
    mapsScriptLoaded: boolean
  }
}

// Create a global script loading tracker
let isScriptLoading = false

export function RestaurantMap({ restaurants, selectedRestaurant, onSelectRestaurant, onError }: RestaurantMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const isMobile = useMobile()

  // Load Google Maps script securely
  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsMapLoading(false)
      return
    }

    // Check if script is already being loaded by another instance
    if (isScriptLoading || document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      // Script is loading, wait for it to complete
      const checkGoogleMapsLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsMapLoading(false)
          clearInterval(checkGoogleMapsLoaded)
        }
      }, 100)

      // Set a timeout to avoid infinite checking
      setTimeout(() => {
        clearInterval(checkGoogleMapsLoaded)
        if (!window.google || !window.google.maps) {
          setMapError("Timeout loading Google Maps")
          setIsMapLoading(false)
          if (onError) onError()
        }
      }, 10000)

      return () => {
        clearInterval(checkGoogleMapsLoaded)
      }
    }

    const loadGoogleMapsScript = async () => {
      try {
        isScriptLoading = true

        // Fetch API key from server
        const response = await fetch("/api/maps")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `Server error: ${response.status}`)
        }

        const apiKey = data.apiKey

        if (!apiKey) {
          throw new Error("API key is missing from server response")
        }

        // Create script element
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.defer = true
        script.id = "google-maps-script"

        // Set up load and error handlers
        script.onload = () => {
          isScriptLoading = false
          window.mapsScriptLoaded = true
          setIsMapLoading(false)
        }

        script.onerror = (e) => {
          isScriptLoading = false
          console.error("Google Maps script failed to load:", e)
          setMapError("Falha ao carregar o Google Maps. Verifique a sua ligação à internet.")
          setIsMapLoading(false)
          if (onError) onError()
        }

        // Add script to document
        document.head.appendChild(script)
      } catch (error) {
        isScriptLoading = false
        console.error("Error loading Google Maps:", error)
        setMapError(
          "Falha ao carregar o Google Maps: " + (error instanceof Error ? error.message : "Erro desconhecido"),
        )
        setIsMapLoading(false)
        if (onError) onError()
      }
    }

    loadGoogleMapsScript()
  }, [onError])

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (isMapLoading || mapError || !window.google || !window.google.maps || !mapRef.current) {
      return
    }

    // Initialize map
    const initMap = () => {
      // Center on Portugal
      const mapOptions = {
        center: { lat: 39.5, lng: -8.0 },
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControlOptions: {
          position: isMobile
            ? window.google.maps.ControlPosition.RIGHT_CENTER
            : window.google.maps.ControlPosition.RIGHT_TOP,
        },
      }

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions)
      infoWindowRef.current = new window.google.maps.InfoWindow()

      // Add markers when map is ready
      addMarkers()
    }

    initMap()

    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null))
        markersRef.current = []
      }

      // Close info window if open
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
      }
    }
  }, [isMapLoading, mapError, isMobile])

  // Add or update markers when restaurants change
  useEffect(() => {
    if (!isMapLoading && !mapError && mapInstanceRef.current) {
      addMarkers()
    }
  }, [restaurants, selectedRestaurant, isMapLoading, mapError])

  // Handle window resize to ensure map fills container
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current && mapRef.current) {
        // Trigger resize event to ensure map fills container
        window.google.maps.event.trigger(mapInstanceRef.current, "resize")
      }
    }

    window.addEventListener("resize", handleResize)

    // Call once to ensure proper initial sizing
    setTimeout(handleResize, 100)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [mapInstanceRef.current])

  const addMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    if (!mapInstanceRef.current) return

    // Add new markers
    restaurants.forEach((restaurant) => {
      if (!restaurant.latitude || !restaurant.longitude) return

      // Create marker with custom icon based on visited status
      const marker = new window.google.maps.Marker({
        position: { lat: restaurant.latitude, lng: restaurant.longitude },
        map: mapInstanceRef.current,
        title: restaurant.nome,
        animation: selectedRestaurant?.id === restaurant.id ? window.google.maps.Animation.BOUNCE : undefined,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: restaurant.visitado ? "#10b981" : "#f59e0b",
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      })

      // Create info window content
      const infoWindowContent = `
<div style="max-width: 200px; padding: 5px;">
  <h3 style="margin: 0 0 5px; font-weight: bold;">${restaurant.nome}</h3>
  <p style="margin: 0 0 5px;">${restaurant.localidade}</p>
  <p style="margin: 0 0 5px;">Rating: ${restaurant.rating.toFixed(1)} ⭐</p>
  ${restaurant.tipoCozinha ? `<p style="margin: 0 0 5px;">Cozinha: ${restaurant.tipoCozinha}</p>` : ""}
  ${restaurant.precoPorPessoa ? `<p style="margin: 0 0 5px;">Preço: ${restaurant.precoPorPessoa}</p>` : ""}
  <div style="margin-top: 8px;">
    <a href="${restaurant.googleMaps}" target="_blank" style="display: inline-block; padding: 4px 8px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333; font-size: 12px;">
      <span style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Ver no Google Maps
      </span>
    </a>
  </div>
</div>
`

      // Add click listener to marker
      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(infoWindowContent)
          infoWindowRef.current.open(mapInstanceRef.current, marker)
        }
        onSelectRestaurant(restaurant)
      })

      markersRef.current.push(marker)
    })

    // Center map on selected restaurant
    if (selectedRestaurant?.latitude && selectedRestaurant?.longitude) {
      mapInstanceRef.current.setCenter({
        lat: selectedRestaurant.latitude,
        lng: selectedRestaurant.longitude,
      })
      mapInstanceRef.current.setZoom(14)

      // Open info window for selected restaurant
      if (infoWindowRef.current) {
        const selectedMarker = markersRef.current.find((marker) => marker.getTitle() === selectedRestaurant.nome)

        if (selectedMarker) {
          const infoWindowContent = `
<div style="max-width: 200px; padding: 5px;">
  <h3 style="margin: 0 0 5px; font-weight: bold;">${selectedRestaurant.nome}</h3>
  <p style="margin: 0 0 5px;">${selectedRestaurant.localidade}</p>
  <p style="margin: 0 0 5px;">Rating: ${selectedRestaurant.rating.toFixed(1)} ⭐</p>
  ${selectedRestaurant.tipoCozinha ? `<p style="margin: 0 0 5px;">Cozinha: ${selectedRestaurant.tipoCozinha}</p>` : ""}
  ${selectedRestaurant.precoPorPessoa ? `<p style="margin: 0 0 5px;">Preço: ${selectedRestaurant.precoPorPessoa}</p>` : ""}
  <div style="margin-top: 8px;">
    <a href="${selectedRestaurant.googleMaps}" target="_blank" style="display: inline-block; padding: 4px 8px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 4px; text-decoration: none; color: #333; font-size: 12px;">
      <span style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Ver no Google Maps
      </span>
    </a>
  </div>
</div>
`

          infoWindowRef.current.setContent(infoWindowContent)
          infoWindowRef.current.open(mapInstanceRef.current, selectedMarker)
        }
      }
    } else if (restaurants.length > 0) {
      // Fit bounds to show all restaurants
      const bounds = new window.google.maps.LatLngBounds()
      restaurants.forEach((restaurant) => {
        if (restaurant.latitude && restaurant.longitude) {
          bounds.extend({ lat: restaurant.latitude, lng: restaurant.longitude })
        }
      })
      mapInstanceRef.current.fitBounds(bounds)
    }
  }

  const handleRetry = () => {
    setIsMapLoading(true)
    setMapError(null)
    window.location.reload()
  }

  // Render loading state or error
  if (isMapLoading) {
    return (
      <Card className="w-full h-full overflow-hidden flex items-center justify-center">
        <div className="text-center p-4">
          <Skeleton className="h-[60vh] w-full" />
          <p className="mt-2 text-muted-foreground">A carregar o mapa...</p>
        </div>
      </Card>
    )
  }

  if (mapError) {
    return (
      <Card className="w-full h-full overflow-hidden flex items-center justify-center">
        <div className="text-center p-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar o mapa</AlertTitle>
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>

          <div className="mt-4 space-y-2">
            <p className="text-muted-foreground">
              Isto pode acontecer se a chave da API do Google Maps não estiver configurada corretamente.
            </p>
            <p className="text-muted-foreground">
              Se for o administrador do site, verifique se a variável de ambiente GOOGLE_MAPS_API_KEY está configurada.
            </p>
          </div>

          <Button variant="outline" size="sm" className="mt-4 flex items-center gap-2" onClick={handleRetry}>
            <RefreshCw className="h-4 w-4" /> Tentar novamente
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full h-full overflow-hidden">
      <div ref={mapRef} className="w-full h-full" aria-label="Mapa de restaurantes" role="application" />
    </Card>
  )
}


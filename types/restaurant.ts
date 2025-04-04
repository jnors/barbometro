export interface Restaurant {
  id: number // Generated ID for internal use
  nome: string // Restaurant name
  localidade: string // Location
  coordenadasGPS?: string // GPS coordinates (optional)
  googleMaps: string // Google Maps link
  tipoCozinha: string // Cuisine type(s)
  visitado: boolean // Visited flag
  rating: number // Overall rating
  precoPorPessoa: string // Price per person without drinks
  paginaOuInstagram?: string // Website or Instagram URL
  ratingBarbudo?: number // Custom rating by the bearded reviewer
  notasOuSugestoes?: string // Additional notes or suggestions
  latitude: number // Latitude for map marker
  longitude: number // Longitude for map marker
}


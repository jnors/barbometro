import type { Restaurant } from "@/types/restaurant"

// Function to fetch data from Google Sheets
export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    // First try using the Google Sheets API
    console.log("Attempting to fetch data using Google Sheets API...")
    const data = await fetchWithSheetsAPI()
    console.log("Successfully fetched data using Google Sheets API")
    return data
  } catch (error) {
    console.error("Error with Google Sheets API:", error)

    try {
      // Fallback to public sheet method
      console.log("Falling back to public sheet method...")
      const data = await fetchWithPublicSheet()
      console.log("Successfully fetched data using public sheet method")
      return data
    } catch (fallbackError) {
      console.error("Error with fallback method:", fallbackError)

      // Final fallback to mock data
      console.log("Using mock data as final fallback")
      return getMockRestaurants()
    }
  }
}

// Method 1: Using Google Sheets API
async function fetchWithSheetsAPI(): Promise<Restaurant[]> {
  const sheetId = "13GPoFZElET7dZAKcUrUuMggOab-8qtwAP4ZmWDTWE1I"
  // Try to get the API key from environment variables
  let apiKey = process.env.GOOGLE_SHEETS_API_KEY

  // If not found, try to fetch it from the maps API endpoint
  if (!apiKey) {
    console.log("Google Sheets API key not found in environment variables, trying to fetch from API endpoint...")
    try {
      const response = await fetch("/api/sheets-key")
      const data = await response.json()
      if (response.ok && data.apiKey) {
        apiKey = data.apiKey
      }
    } catch (error) {
      console.error("Failed to fetch Google Sheets API key:", error)
    }
  }

  if (!apiKey) {
    throw new Error("Google Sheets API key is missing")
  }

  // Use the v4 API with proper formatting
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Lista!A:N?key=${apiKey}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`)
  }

  const data = await response.json()

  if (!data.values || data.values.length <= 1) {
    throw new Error("No data found in the sheet or invalid format")
  }

  const processedData = processSheetData(data)

  // Sort restaurants alphabetically by name
  return processedData.sort((a, b) => a.nome.localeCompare(b.nome, "pt"))
}

// Method 2: Using public sheet
async function fetchWithPublicSheet(): Promise<Restaurant[]> {
  const sheetId = "13GPoFZElET7dZAKcUrUuMggOab-8qtwAP4ZmWDTWE1I"
  const sheetNum = 1 // Usually 1 for the first sheet

  // This URL format works with sheets published to the web
  const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?output=csv&gid=${sheetNum - 1}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch public sheet: ${response.status}`)
  }

  const csvText = await response.text()
  const parsedData = parseCSV(csvText)

  // Sort restaurants alphabetically by name
  return parsedData.sort((a, b) => a.nome.localeCompare(b.nome, "pt"))
}

// Parse CSV data from public sheet
function parseCSV(csvText: string): Restaurant[] {
  const lines = csvText.split("\n")

  // Skip header row
  const dataRows = lines.slice(1)

  return dataRows.map((row, index) => {
    const columns = row.split(",").map((col) => col.trim())

    return {
      id: index + 1,
      nome: columns[0] || "",
      localidade: columns[1] || "",
      coordenadasGPS: columns[2] || "",
      googleMaps: columns[3] || "",
      tipoCozinha: columns[4] || "",
      visitado: columns[5]?.toLowerCase() === "sim" || columns[5] === "1" || columns[5]?.toLowerCase() === "true",
      rating: Number.parseFloat(columns[6].replace(",", ".")) || 0,
      ratioQualidadePreco: Number.parseFloat(columns[7].replace(",", ".")) || 0,
      precoPorPessoa: columns[8] || "",
      paginaOuInstagram: columns[9] || "",
      ratingBarbudo: Number.parseFloat(columns[10].replace(",", ".")) || 0,
      notasOuSugestoes: columns[11] || "",
      latitude: Number.parseFloat(columns[12]) || 0,
      longitude: Number.parseFloat(columns[13]) || 0,
    }
  })
}

// Process data from Google Sheets API
function processSheetData(data: any): Restaurant[] {
  // Skip the header row
  const rows = data.values.slice(1)

  return rows.map((row: any[], index: number) => ({
    id: index + 1,
    nome: row[0] || "",
    localidade: row[1] || "",
    coordenadasGPS: row[2] || "",
    googleMaps: row[3] || "",
    tipoCozinha: row[4] || "",
    visitado:
      row[5] === "1" ||
      row[5] === "Sim" ||
      row[5] === "sim" ||
      row[5] === "true" ||
      row[5] === "TRUE" ||
      row[5] === true,
    rating: Number.parseFloat(row[6].replace(",", ".")) || 0,
    ratioQualidadePreco: Number.parseFloat(row[7].replace(",", ".")) || 0,
    precoPorPessoa: row[8] || "",
    paginaOuInstagram: row[9] || "",
    ratingBarbudo: Number.parseFloat(row[10].replace(",", ".")) || 0,
    notasOuSugestoes: row[11] || "",
    latitude: Number.parseFloat(row[12]) || 0,
    longitude: Number.parseFloat(row[13]) || 0,
  }))
}

// Mock data for development
function getMockRestaurants(): Restaurant[] {
  const restaurants = [
    {
      id: 1,
      nome: "Tasca do Porto",
      localidade: "Porto",
      coordenadasGPS: "41.1494512,-8.6107884",
      googleMaps: "https://goo.gl/maps/examplelink1",
      tipoCozinha: "Portuguesa",
      visitado: true,
      rating: 4.7,
      precoPorPessoa: "20€",
      paginaOuInstagram: "https://instagram.com/tascadoporto",
      ratingBarbudo: 4.5,
      notasOuSugestoes: "Experimentar o bacalhau à brás",
      latitude: 41.1494512,
      longitude: -8.6107884,
    },
    {
      id: 2,
      nome: "Cantinho do Avillez",
      localidade: "Lisboa",
      coordenadasGPS: "38.7097643,-9.1397026",
      googleMaps: "https://goo.gl/maps/examplelink2",
      tipoCozinha: "Portuguesa Contemporânea",
      visitado: true,
      rating: 4.5,
      precoPorPessoa: "35€",
      paginaOuInstagram: "https://cantinhodoavillez.pt",
      ratingBarbudo: 4.8,
      notasOuSugestoes: "Reservar com antecedência",
      latitude: 38.7097643,
      longitude: -9.1397026,
    },
    {
      id: 3,
      nome: "Pizzaria Bella Napoli",
      localidade: "Braga",
      coordenadasGPS: "41.5454486,-8.426507",
      googleMaps: "https://goo.gl/maps/examplelink3",
      tipoCozinha: "Italiana",
      visitado: false,
      rating: 4.2,
      precoPorPessoa: "15€",
      paginaOuInstagram: "https://instagram.com/bellanapoli",
      ratingBarbudo: 0,
      notasOuSugestoes: "Recomendado por amigos",
      latitude: 41.5454486,
      longitude: -8.426507,
    },
    {
      id: 4,
      nome: "Sushi House",
      localidade: "Lisboa",
      coordenadasGPS: "38.7223252,-9.1393295",
      googleMaps: "https://goo.gl/maps/examplelink4",
      tipoCozinha: "Japonesa",
      visitado: true,
      rating: 4.6,
      precoPorPessoa: "30€",
      paginaOuInstagram: "https://sushihouse.pt",
      ratingBarbudo: 4.3,
      notasOuSugestoes: "Excelente relação qualidade/preço",
      latitude: 38.7223252,
      longitude: -9.1393295,
    },
    {
      id: 5,
      nome: "Taberna Algarvia",
      localidade: "Faro",
      coordenadasGPS: "37.0146099,-7.9330933",
      googleMaps: "https://goo.gl/maps/examplelink5",
      tipoCozinha: "Portuguesa",
      visitado: true,
      rating: 4.3,
      precoPorPessoa: "25€",
      paginaOuInstagram: "https://instagram.com/tabernaalgarvia",
      ratingBarbudo: 4.0,
      notasOuSugestoes: "Ótimos pratos de peixe fresco",
      latitude: 37.0146099,
      longitude: -7.9330933,
    },
    {
      id: 6,
      nome: "Veggie Delight",
      localidade: "Coimbra",
      coordenadasGPS: "40.2109801,-8.4292057",
      googleMaps: "https://goo.gl/maps/examplelink6",
      tipoCozinha: "Vegetariana",
      visitado: false,
      rating: 4.4,
      precoPorPessoa: "18€",
      paginaOuInstagram: "https://veggiedelight.pt",
      ratingBarbudo: 0,
      notasOuSugestoes: "Boas opções vegan",
      latitude: 40.2109801,
      longitude: -8.4292057,
    },
  ]

  // Sort mock restaurants alphabetically by name
  return restaurants.sort((a, b) => a.nome.localeCompare(b.nome, "pt"))
}


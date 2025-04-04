import { NextResponse } from "next/server"

export async function GET() {
  // Only use the non-public environment variable
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    console.error("Google Maps API key not found in environment variables")
    return NextResponse.json({ error: "Google Maps API key not configured on the server" }, { status: 500 })
  }

  // Return the API key
  return NextResponse.json({ apiKey })
}


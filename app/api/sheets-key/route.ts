import { NextResponse } from "next/server"

export async function GET() {
  // Get the API key from server environment variables
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY

  if (!apiKey) {
    console.error("Google Sheets API key not found in environment variables")
    return NextResponse.json({ error: "Google Sheets API key not configured on the server" }, { status: 500 })
  }

  // Return the API key
  return NextResponse.json({ apiKey })
}


"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export function NewsletterSection() {
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add MailerLite script if it doesn't exist
    if (!window.ml) {
      const script = document.createElement("script")
      script.src = "https://assets.mailerlite.com/js/universal.js"
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        if (window.ml) {
          window.ml("account", "1425868")
        }
      }
    }

    // Clean up on unmount
    return () => {
      // No cleanup needed as we want to keep the script loaded
    }
  }, [])

  return (
    <section className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Subscreve a nossa newsletter</h2>
        <p className="text-center mb-8">
          Recebe as nossas novidades e sugestões de restaurantes diretamente no teu email.
        </p>

        <Card className="bg-primary text-primary-foreground shadow-md">
          <CardContent className="p-6">
            <div ref={formContainerRef} className="ml-embedded" data-form="Rex9Tf"></div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


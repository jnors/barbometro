"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MailerLiteFormProps {
  formId: string
  title?: string
  description?: string
  className?: string
}

export function MailerLiteForm({
  formId,
  title = "Subscreva a nossa newsletter",
  description = "Receba as últimas novidades sobre restaurantes e atualizações do Barbómetro.",
  className = "",
}: MailerLiteFormProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.ml) {
      window.ml("show", formId, true)

      // Add a small delay to ensure the form is rendered before applying styles
      setTimeout(() => {
        // Find the form elements and apply styles
        const formContainer = document.querySelector(".ml-form-align-center")
        const formWrapper = document.querySelector(".ml-form-embedWrapper.embedForm")

        if (formContainer && formWrapper) {
          // Ensure the container matches the wrapper width
          const wrapperWidth = formWrapper.getBoundingClientRect().width
          formContainer.setAttribute("style", `width: ${wrapperWidth}px !important; max-width: 100% !important;`)
        }
      }, 500)
    }
  }, [formId])

  return (
    <Card className={`mx-auto w-full ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-0 m-0 text-center w-full">
        {/* The MailerLite Embed Div */}
        <div className="ml-embedded w-full" data-form={formId} />
      </CardContent>
    </Card>
  )
}


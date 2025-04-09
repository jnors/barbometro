import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barbómetro",
  description: "Encontra os melhores sabores, escolhidos a dedo por um barbudo",
  icons: {
    icon: [{ url: "/images/Barbometro_icon.png", type: "image/png" }],
    apple: [{ url: "/images/Barbometro_icon.png" }],
  },
  openGraph: {
    title: 'Barbómetro – Encontra os melhores restaurantes',
    description: 'Restaurantes escolhidos cuidadosamente em Portugal.',
    url: 'https://barbometro.onrender.com',
    siteName: 'Barbómetro',
    images: [
      {
        url: 'https://barbometro.onrender.com/your-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <head>
        
        {/* MailerLite Universal Script */}
        <Script id="mailerlite-universal" strategy="afterInteractive">
          {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '1425868');
          `}
        </Script>

        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-2L8TWSVHWK`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2L8TWSVHWK');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-[#FDF6E3] text-[#331E1D] min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
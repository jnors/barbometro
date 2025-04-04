import { Hero } from "@/components/hero"
import { RestaurantExplorer } from "@/components/restaurant-explorer"
import { NewsletterSection } from "@/components/newsletter-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <RestaurantExplorer />
      <NewsletterSection />
    </main>
  )
}


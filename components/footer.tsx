import { BuyMeCoffee } from "./buy-me-coffee"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Barbómetro. Todos os direitos reservados.
        </p>
        <BuyMeCoffee variant="ghost" size="sm" />
      </div>
    </footer>
  )
}


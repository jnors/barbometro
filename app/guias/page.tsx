import Link from "next/link"
import Image from "next/image"

const guides = [
  {
    route: "petiscos-porto",  // must match the subfolder name
    title: "Rota de Petiscos pelo Porto",
    excerpt: "Explora 2 locais icónicos do Porto e outro da nova escola.",
    cover: "/images/guias/gazela.jpg",
    date: "2025-04-15",
    tags: ["Porto", "Petiscos", "Tascas"],
  },
  {
    route: "creta",  // must match the subfolder name
    title: "Rota de Restaurantes em Creta",
    excerpt: "Os melhores locais para belas refeições na ilha de Creta.",
    cover: "/images/guias/creta/cover.jpg",
    date: "2025-08-25",
    tags: ["Creta", "Restaurantes"],
  }
]

export default function GuiasPage() {
  return (
    <main className="container py-12 px-4 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Guias</h1>
        <p className="text-muted-foreground mb-8">
          Roteiros, dicas e sugestões para explorar o melhor da gastronomia.
          Descobre rotas de tapas, restaurantes imperdíveis e muito mais!
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.route} href={`/guias/${guide.route}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {/* Cover image */}
                {guide.cover && (
                  <Image
                    src={guide.cover}
                    alt={guide.title}
                    width={600}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold">{guide.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{guide.excerpt}</p>
                  <div className="flex gap-2 flex-wrap">
                    {guide.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary rounded px-2 py-0.5 text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {guide.date && (
                    <div className="text-xs text-muted-foreground mt-2">
                      {guide.date}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

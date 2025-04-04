import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BuyMeCoffee } from "@/components/buy-me-coffee"

export default function SobrePage() {
  return (
    <main className="container py-12 px-4 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Sobre o Barbómetro</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>O que é o Barbómetro?</CardTitle>
            <CardDescription>A história por trás do projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              O Barbómetro nasceu da paixão por descobrir e partilhar os melhores restaurantes em Portugal. Como um
              barbudo apaixonado por gastronomia, decidi criar uma plataforma que ajudasse outros a encontrar
              experiências culinárias autênticas e memoráveis.
            </p>
            <p>
              Cada restaurante listado no Barbómetro foi cuidadosamente selecionado e avaliado, com foco na qualidade da
              comida, ambiente, atendimento e relação qualidade-preço. O "Rating Barbudo" representa a minha avaliação
              pessoal, baseada na experiência completa.
            </p>
            <p>
              Este projeto é uma forma de celebrar a rica tradição gastronómica portuguesa e ajudar tanto locais como
              visitantes a descobrirem joias culinárias por todo o país.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Como funciona?</CardTitle>
            <CardDescription>Guia de utilização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Pesquisa e Filtros:</strong> Utilize a barra de pesquisa para encontrar restaurantes por nome,
              localidade ou tipo de cozinha. Os filtros permitem refinar os resultados por localidade, tipo de cozinha e
              status de visita.
            </p>
            <p>
              <strong>Mapa Interativo:</strong> Visualize todos os restaurantes no mapa e clique nos marcadores para ver
              mais detalhes. Os restaurantes já visitados são destacados com uma cor diferente.
            </p>
            <p>
              <strong>Detalhes do Restaurante:</strong> Cada cartão de restaurante mostra informações essenciais como
              rating, preço médio por pessoa, tipo de cozinha e notas especiais. Links diretos para o Google Maps e
              website/Instagram do restaurante também estão disponíveis.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-lg mb-4">Se gostou do Barbómetro e quer apoiar o projeto, considere comprar-me um café!</p>
          <div className="flex justify-center">
            <BuyMeCoffee username="barbudodev" />
          </div>
        </div>
      </div>
    </main>
  )
}


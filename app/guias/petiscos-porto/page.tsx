export default function PetiscosPortoPage() {
  return (
    <main className="container py-12 px-4 md:py-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Rota de Petiscos no Porto</h1>
      <p className="text-muted-foreground mb-6">Publicado a 2025-04-15</p>

      {/* Optionally include a cover image here, if desired:
      <img
        src="/images/guias/gazela.jpg"
        alt="Gazela Cachorrinhos"
        className="mb-6 w-full h-auto object-cover rounded-lg"
      /> */}

      <article className="prose prose-lg">
        <h2>
          🧭 Rota dos Petiscos no Porto: 3 Paragens, 3 Clássicos, 100% Satisfação
        </h2>
        <p>
          Se estás à procura de uma aventura gastronómica no Porto, prepara-te
          para uma rota de petiscos que vai fazer as tuas papilas gustativas
          dançarem o vira! Vamos explorar três locais icónicos:{" "}
          <strong>Oficina dos Rissóis</strong>, <strong>Casa Guedes</strong> e{" "}
          <strong>Gazela Cachorrinhos</strong>. Vamos a isso?
        </p>

        <h3 className="text-xl font-bold mb-2">🥟 1. Oficina dos Rissóis – Reinventando o Clássico</h3>
        <p>
          Começamos no Jardim de São Lázaro, onde a <strong>Oficina dos Rissóis</strong> dá
          uma nova vida a este petisco tradicional.
          <br />
          Aqui, os rissóis são assados no forno, não fritos, e recheados com
          ingredientes de alta qualidade como frango do campo, vitela arouquesa
          e cogumelos shiitake.
          <br />
          O arroz de tomate também é muito bom, mas deixem para outra visita para terem estômago para todas as paragens 😄
          <br />
          O ambiente é acolhedor, com uma esplanada perfeita para relaxar.
          <br />
          Não percas o <strong>rissol de camarão</strong>, que é uma verdadeira delícia.
        </p>

        <h3 className="text-xl font-bold mb-2">🐷 2. Casa Guedes – A Lenda da Sandes de Pernil</h3>
        <p>
          A próxima paragem é a <strong>Casa Guedes</strong>, na Praça dos Poveiros, famosa pela sua sandes de pernil.
          <br />
          O pernil é assado lentamente e servido num pão estaladiço, podendo ser
          acompanhado por queijo da Serra para um toque extra de sabor.
          <br />
          O ambiente é descontraído e autêntico, ideal para saborear este
          clássico portuense.
          <br />
          Acompanha com um <strong>Espadal</strong> ou um <strong>Porto Tónico</strong> para
          completar a experiência.
        </p>

        <h3 className="text-xl font-bold mb-2">🌭 3. Gazela Cachorrinhos – O Original e Inigualável</h3>
        <figure className="mb-6 text-center">
          <img
            src="/images/guias/gazela_wide.jpg"
            alt="Gazela Cachorrinhos"
            className="mb-6 w-full h-auto object-cover rounded-lg"
          />
          <figcaption className="text-sm text-muted-foreground mt-2">
            O típico cachorrinho do Gazela com uma batatinha frita lá trás.
          </figcaption>
        </figure>
        <p>
          Terminamos na <strong>Cervejaria Gazela</strong>, perto da Praça da Batalha,
          conhecida pelos seus cachorrinhos prensados.
          <br />
          Estes pequenos pães estaladiços são recheados com salsicha e queijo,
          pincelados com molho picante e cortados em pedaços para partilhar.
          <br />
          O ambiente é animado e informal, perfeito para uma refeição rápida e
          saborosa.
          <br />
          Não é por acaso que Anthony Bourdain os considerava imperdíveis!
        </p>

        <h3>📍 Dica Extra: A Ordem é Importante!</h3>
        <p>
          Segue esta ordem: começa na <strong>Oficina dos Rissóis</strong> para um início
          leve, passa pela <strong>Casa Guedes</strong> para uma refeição mais substancial
          e termina na <strong>Gazela</strong> para um final picante e descontraído. Acabar
          com um concerto ou espetáculo no Coliseu do Porto seria ainda mais uma cereja no topo do bolo! 🎤
        </p>
        <p>
          📸 Não te esqueças de partilhar as tuas fotos com a hashtag{" "}
          <strong>#GuiasDoBarbometro</strong> e marcar os amigos que não podem faltar
          nesta aventura gastronómica!
        </p>
        <p>Bom apetite! 🍴</p>
      </article>

      {/* Google Maps Embed Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Mapa do Roteiro</h3>
        <p className="mb-4">
          Aqui está o <a href="https://maps.app.goo.gl/rSkxwv11wdHcH69Y8" rel="noopener noreferrer" className="text-sm text-blue-500 underline">mapa</a> com as três paragens da rota de petiscos no Porto:
          <br />
        </p>
        <div className="w-full h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d751.1233371659413!2d-8.605494130291415!3d41.145585008113954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e2!4m5!1s0xd2465d6ad50964f%3A0x5c709d9c6ad4d6df!2sOficina%20dos%20Riss%C3%B3is%2C%20Passeio%20de%20S%C3%A3o%20L%C3%A1zaro%205A%2C%204000-507%20Porto!3m2!1d41.145800799999996!2d-8.6033419!4m5!1s0xd2464ef3e280ec1%3A0xd84ec805c9f68413!2sCasa%20Guedes%20Tradicional%2C%20Pra%C3%A7a%20dos%20Poveiros%2C%20Porto!3m2!1d41.146015999999996!2d-8.6034864!4m5!1s0xd2464e5d3bf2a81%3A0x702f8b828a8f38c6!2sCervejaria%20Gazela%20-%20O%20Original%20Cachorrinho%2C%20Travessa%20do%20Cimo%20de%20Vila%2C%20Porto!3m2!1d41.144935!2d-8.6064286!5e0!3m2!1spt-PT!2spt!4v1744815578186!5m2!1spt-PT!2spt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  )
}

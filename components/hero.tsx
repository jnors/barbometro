import Image from "next/image"

export function Hero() {
  return (
    <section className="bg-[#FDF6E3] py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Image
              src="/images/Barbometro_SmallerBorder.png"
              alt="Barbómetro"
              width={500}
              height={150}
              priority
              className="h-auto"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">
            Encontra os melhores sabores, escolhidos a dedo por um barbudo
          </h1>

          <p className="text-lg mb-8 max-w-2xl text-[#334155]">
            Descobre restaurantes autênticos por toda a Europa, filtrados por localidade e tipo de cozinha.
          </p>
        </div>
      </div>
    </section>
  )
}


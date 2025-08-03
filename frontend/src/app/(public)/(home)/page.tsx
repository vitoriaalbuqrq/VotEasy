import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] overflow-hidden relative">
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:h-svh max-w-7xl mx-auto gap-14 px-6 sm:px-10">
        <article className="flex flex-col items-start justify-center gap-6 relative z-20">
          <h1 className="text-3xl lg:text-5xl font-bold pe-4">
            Sistema de <span className="text-primary">Votação</span> Online com Blockchain
          </h1>
          <p className="text-lg sm:text-xl">
            Crie e gerencie votações seguras e transparentes. Participe com praticidade e confiança em qualquer votação online disponível.
          </p>
          <Link
            href="/auth"
            className="px-5 py-2 text-primary bg-primary-hover rounded-full border border-primary font-semibold text-lg transition-transform duration-300 hover:scale-105 hover:opacity-80"
          >
            Comece agora
          </Link>
        </article>

        <aside className="flex justify-center lg:items-center">
          <img
            src="/assets/images/img-home.png"
            alt="Ilustração"
            className="
              w-64 sm:w-[400px] md:w-[600px] lg:w-[700px] 2xl:w-[910px]
              drop-shadow
              lg:mt-24 lg:absolute lg:-right-[4rem] lg:top-[-9rem]
            "
          />
        </aside>
      </section>
    </main>
  );
}

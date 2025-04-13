import { Container } from "@/components/container";
import { LinkButton } from "@/components/linkButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] overflow-hidden relative">
      <section className="grid grid-cols-1 lg:grid-cols-2 h-svh mx-auto gap-14 max-w-7xl px-10">
        <article className="flex flex-col items-start justify-center gap-4 relative z-20">
          <h1 className="text-3xl lg:text-5xl font-bold pe-10">Sistema de <span className="text-primary">Votação</span> Online com Blockchain</h1>
          <p className="text-xl mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic nobis, consequatur tenetur voluptatem distinctio error id nulla modi.</p>
          <Link href="" className="px-5 py-2 text-primary bg-primary-hover rounded-full border border-primary font-semibold text-lg transition-transform duration-300 hover:scale-105 hover:opacity-80">
            Comece agora
          </Link>
        </article>
        <aside className="flex justify-center items-center">
          <img src="/assets/images/img-home.png" alt="" className="w-[450px] xl:w-[350px] 2xl:w-[530px] relative z-10 mb-auto mt-24 drop-shadow" />
          <img src="/assets/images/Blob.svg" alt="" className="absolute right-0 bottom-[-200px] xl:bottom-0 md:w-[1100px] xl:w-[800px] 2xl:w-[1300px] max-w-full z-[1] hidden md:block" />
        </aside>
      </section>
      {/* <div className="absolute -z-[1] -right-[7rem] top-[-2rem] w-[55rem] h-[50rem] rounded-tl-[55%] rounded-bl-[50%] rounded-br-[30%] bg-tertiary" /> */}
    </main>
  );
}

import { Container } from "@/components/container";
import { FaBuilding, FaVoteYea } from "react-icons/fa";
import { Card } from "./components/card";
import Image from "next/image";
import { Logo } from "@/components/logo";

export default function AuthPage() {
  return (
    <Container>
      <main className="mx-3 sm:w-3/4 sm:m-auto rounded-2xl bg-white flex overflow-hidden shadow-md">
        <aside className="hidden sm:w-4/5 lg:w-3/5 bg-secondary py-7 px-3 sm:flex flex-col gap-10 items-center">
          <Logo variant="light"/>
          <p className="text-xl text-white text-center font-thin px-1">Sistema de Votação Online com Blockchain</p>
          <Image
            src="/assets/images/img-auth.png"
            alt="image auth"
            width={280}
            height={150}
          />
        </aside>
        <section className="p-3 md:p-14 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Como você deseja participar?</h1>
          <p className="mb-10 text-gray-500">Como <strong>votante</strong> para participar de eleições ou como <strong>organizador</strong> para criar e gerenciar votações.</p>
          <Card
            title="Votante"
            text="Vote de forma rápida, segura e transparente."
            icon={<FaVoteYea />}
            href="/auth/user/login" 
          />
          <Card
            title="Organizador"
            text="Crie, gerencie e acompanhe votações."
            icon={<FaBuilding />}
            href="/auth/organizer/login"
          />
        </section>
      </main>
    </Container>
  )
}
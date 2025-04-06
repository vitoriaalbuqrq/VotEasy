import { Container } from "@/components/container";
import { FaBuilding, FaVoteYea } from "react-icons/fa";
import { Card } from "./components/card";
import Image from "next/image";

export default function AuthPage() {
  return (
    <Container>
      <main className="w-3/4 m-auto rounded-2xl bg-white flex overflow-hidden shadow-md">
        <aside className="w-3/5 bg-secondary py-7 px-3 flex flex-col gap-10">
          <h1 className="text-2xl text-center font-bold text-white py-3">VotEasy</h1>
          {/* TODO: Melhorar responsividade */}
          <Image
            src="/assets/images/img-auth.png"
            alt="image auth"
            width={280}
            height={150}
          />
        </aside>
        <section className="p-14 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Como você deseja participar?</h1>
          <p className="mb-10 text-gray-500">Selecione seu perfil para continuar: você pode votar em eleições abertas ou privadas como Votante, ou gerenciar e criar votações como Organizador.</p>
          <Card
            title="Votante"
            text="Vote de forma rápida, segura e transparente."
            icon={<FaVoteYea />}
            href="/auth/organizer/login" //TODO: mudar o redirecionamento para login do user/votante
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
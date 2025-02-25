import { Container } from "@/components/container";
import { FaBuilding, FaVoteYea } from "react-icons/fa";
import { Card } from "./components/card";
import Image from "next/image";

export default function AuthPage() {
  return (
    <Container>
      <main className="w-2/3 m-auto rounded-2xl bg-white flex overflow-hidden">
        <aside className="w-3/5 bg-secondary p-7 flex flex-col gap-10">
          <h1 className="text-2xl text-center font-bold text-white py-3">VotEasy</h1>
          <Image
            src="/assets/images/img-auth.png"
            alt="image auth"
            width={250}
            height={150}
          />
        </aside>
        <section className="p-10 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Como você deseja participar?</h1>
          <p className="mb-10 text-gray-500">Selecione seu perfil para continuar: você pode votar em eleições abertas ou privadas como Votante, ou gerenciar e criar votações como Organizador.</p>
          <Card
            title="Votante"
            text="Vote de forma rápida, segura e transparente."
            icon={<FaVoteYea />}
            href="/auth/voter/login"
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
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./components/card";
import { Progress } from "@/components/ui/progress";

export default function Voting() {
  return (
    <Container>
      <main className="bg-white w-[85%] m-auto shadow-md rounded-lg">
        <div className="flex flex-col justify-center items-center py-12 px-10">
          <header className="mb-14 text-center px-5">
            <h1 className="font-bold text-3xl text-center text-secondary">Eleições para presidente acadêmico: Quem você quer que ganhe?</h1>
          </header>
          <section className="flex justify-center gap-3 flex-wrap">
            <Card
              candidateName="Vitória Albuquerque"
              number={1052}
              id="1"
            />
            <Card
              candidateName="Luciano Soares"
              number={5687}
              id="2"
            />
          </section>
        </div>
      </main>
    </Container>
  )
}
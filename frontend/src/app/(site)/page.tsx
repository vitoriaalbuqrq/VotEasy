import { Container } from "@/components/container";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
        <h2>Votação online com Blockchain</h2>
      </main>
    </Container>
  );
}

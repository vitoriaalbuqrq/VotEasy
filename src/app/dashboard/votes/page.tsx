import { LinkButton } from "@/components/linkButton";

export default function MyVotes() {
  return (
    <main>
      <header className="flex justify-between">
        <h1 className="font-bold text-2xl">Minhas Votações</h1>
        <LinkButton
          href="/dashboard/votes/new"
          text="Nova Votação"
        />
      </header>
    </main>
  )
}
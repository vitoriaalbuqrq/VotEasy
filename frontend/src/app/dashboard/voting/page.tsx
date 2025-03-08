import { LinkButton } from "@/components/linkButton";
import { VoteItem } from "./components/voteItem";
import { FiPlus } from "react-icons/fi";

export default function MyVotes() {
  return (
    <main>
      <header className="flex justify-between mb-12">
        <h1 className="font-bold text-2xl text-primary">Minhas Votações</h1>
        <LinkButton
          href="/dashboard/voting/new/multi-step-form"
          text="Nova Votação"
          icon={<FiPlus/>}
        />
      </header>
      <section>
        <table className="min-w-full my-2 bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="border-b border-b-slate-200 bg-white text-secondary text-lg text-left font-medium">
              <th className="pl-3 py-2">Título</th>
              <th className="pl-3 py-2">Status</th>
              <th className="pl-3 py-2">Data de início</th>
              <th className="pl-3 py-2">Tipo</th>
              <th className="pl-3 py-2">Qnt de candidatos</th>
              <th className="pl-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <VoteItem/>
            <VoteItem/>
          </tbody>
        </table>
      </section>
    </main>
  )
}
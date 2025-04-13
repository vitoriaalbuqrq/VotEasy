import { LinkButton } from "@/components/linkButton";
import { FiPlus } from "react-icons/fi";
import { FaCheckCircle, FaCheckSquare, FaClock, FaRegCheckCircle, FaRegTimesCircle, FaTimesCircle, FaVoteYea } from "react-icons/fa";
import { VoteItem } from "./voting/components/voteItem";
import { StatusCard } from "./voting/components/statusCard";
import { FaCheck, FaHouse } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <main>
      <header className="flex justify-between mb-12">
        <h1 className="font-bold text-2xl text-secondary">Minhas Votações</h1>
        <LinkButton
          href="/dashboard/voting/new/multi-step-form"
          text="Nova Votação"
          icon={<FiPlus />}
        />
      </header>
      <section className="flex flex-wrap gap-3 justify-items-stretch">
        <StatusCard
          icon={<FaVoteYea/>}
          name="Votações ativas"
          quant={5}
          color="green-500"
        />
        <StatusCard
          icon={<FaClock/>}
          name="Votações programadas"
          quant={5}
          color="yellow-500"
        />
        <StatusCard
          icon={<FaCheckCircle/>}
          name="Votações finalizadas"
          quant={5}
          color="blue-500"
        />
        <StatusCard
          icon={<FaTimesCircle/>}
          name="Votações canceladas"
          quant={5}
          color="red-500"
        />
      </section>
      <section className="mt-10">
        <table className="min-w-full my-2 bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="border-b border-b-slate-200 bg-white text-secondary text-lg text-left font-medium">
              <th className="pl-3 py-2">Título</th>
              <th className="pl-3 py-2">Status</th>
              <th className="pl-3 py-2">Data de início</th>
              <th className="pl-3 py-2">Data de término</th>
              <th className="pl-3 py-2">Qnt de candidatos</th>
              <th className="pl-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <VoteItem />
            <VoteItem />
          </tbody>
        </table>
      </section>
    </main>
  )
}
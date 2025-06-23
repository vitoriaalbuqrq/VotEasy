'use client';
import { LinkButton } from "@/components/linkButton";
import { FiPlus } from "react-icons/fi";
import { FaCheckCircle, FaClock, FaTimesCircle, FaVoteYea } from "react-icons/fa";
import { VoteItem } from "./voting/components/voteItem";
import { StatusCard } from "./voting/components/statusCard";
import api from "@/lib/axios/config";
import { Status, Voting } from "@/types/voting";
import { formatTimestamp } from "@/utils/format";
import { useEffect, useState } from "react";
import { SearchInput } from "@/app/(public)/votings/components/searchInput";

//TODO: Adiconar loading enquanto atualiza status apos cancelar
export default function Dashboard() {

  const [votings, setVotings] = useState<Voting[]>([]);

  useEffect(() => {
    api.get('votings/with-candidates')
      .then(res => setVotings(res.data))
      .catch(err => console.error('Erro ao buscar votações:', err));
  }, []);

  const handleCancel = async (id: Voting['id']) => {
    await api.post('update-status', {
      votingId: id,
      newStatus: Status.Canceled,
    });

    setVotings(prev => prev.map(v => v.id === id ? { ...v, status: Status.Canceled } : v
    )
    );
  }

  const statusCounts = {
    active: votings.filter(v => v.status === Status.Active).length,
    scheduled: votings.filter(v => v.status === Status.Scheduled).length,
    finalized: votings.filter(v => v.status === Status.Finalized).length,
    canceled: votings.filter(v => v.status === Status.Canceled).length,
  };

  return (
    <main>
      <header className="flex justify-between mb-12">
        <h1 className="font-bold text-2xl text-secondary">Minhas Votações</h1>
      </header>
      <section className="flex flex-wrap gap-3 justify-items-stretch">
        <StatusCard
          icon={<FaVoteYea />}
          name="Votações ativas"
          quant={statusCounts.active}
          color="green-500"
        />
        <StatusCard
          icon={<FaClock />}
          name="Votações programadas"
          quant={statusCounts.scheduled}
          color="yellow-500"
        />
        <StatusCard
          icon={<FaCheckCircle />}
          name="Votações finalizadas"
          quant={statusCounts.finalized}
          color="blue-500"
        />
        <StatusCard
          icon={<FaTimesCircle />}
          name="Votações canceladas"
          quant={statusCounts.canceled}
          color="red-500"
        />
      </section>
      <section className="mt-10">
        {votings.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <img src="/assets/images/empty-state.svg" alt="" className="w-[200px] drop-shadow" />
            <p className="text-gray-400 font-semibold text-xl mt-3">Ainda não há votações registradas</p>
          </div>
        )}
        {/* TODO: implementar busca e filtros */}
        <div className="flex flex-col justify-start items-start rounded-t-lg px-3 py-5 bg-white sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:w-1/2">
            <SearchInput />
          </div>

          <select className="border border-gray-300 rounded-full px-3 py-2 sm:ms-auto">
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="scheduled">Programado</option>
            <option value="finalized">Finalizado</option>
            <option value="canceled">Cancelado</option>
          </select>

          <LinkButton
            href="/dashboard/voting/new/multi-step-form"
            text="Nova Votação"
            icon={<FiPlus />}
          />
        </div>

        <table className="min-w-full bg-white rounded-b-lg shadow-md overflow-hidden">
          <thead>
            <tr className="border-y border-b-slate-200 bg-gray-50 text-secondary text-lg text-left font-medium">
              <th className="pl-3 py-2">Título</th>
              <th className="pl-3 py-2">Status</th>
              <th className="pl-3 py-2">Data de início</th>
              <th className="pl-3 py-2">Data de término</th>
              <th className="pl-3 py-2">Qnt de candidatos</th>
              <th className="pl-3 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {votings.map(voting =>
              <VoteItem
                key={voting.id}
                id={voting.id}
                name={voting.name}
                status={voting.status}
                startDate={formatTimestamp(voting.startDate)}
                endDate={formatTimestamp(voting.endDate)}
                qntCandidates={voting.qntCandidates}
                onCancel={handleCancel}
              />
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}
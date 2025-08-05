'use client';
import { LinkButton } from "@/components/linkButton";
import { FiPlus } from "react-icons/fi";
import { FaCheckCircle, FaClock, FaTimesCircle, FaVoteYea } from "react-icons/fa";
import { VoteItem } from "./voting/components/voteItem";
import { StatusCard } from "./voting/components/statusCard";
import api from "@/lib/axios/config";
import { STATUS, Voting, VotingFilter } from "@/types/voting";
import { formatTimestamp } from "@/utils/format";
import { useEffect, useState } from "react";
import { SearchInput } from "@/app/(public)/votings/components/searchInput";
import { useToast } from "@/hooks/use-toast";
import { StatusFilterSelect } from "./components/statusFilterSelect";

//TODO: Adiconar loading enquanto atualiza status apos cancelar
//TODO: Mostrar apenas votações referente ao usuario
export default function Dashboard() {
  const { toast } = useToast();
  const [votings, setVotings] = useState<Voting[]>([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<VotingFilter>("all");

  //TODO: Adicionar loading durante o cancelamento
  useEffect(() => {
    api.get('votings/with-candidates')
      .then(res => setVotings(res.data))
      .catch(err => console.error('Erro ao buscar votações:', err));
  }, []);

  const handleCancel = async (id: Voting['id']) => {
    try {
      setLoadingId(id);
      await api.post('cancel-voting', {
        votingId: id,
      });
      setVotings(prev => prev.map(v => v.id === id ? { ...v, status: STATUS.canceled } : v
      )
      );
    } catch (err: any) {
      toast({
        variant: "error",
        title: err.response?.data?.message,
      })
    } finally {
      setLoadingId(null);
    }
  }

  const statusCounts = {
    active: votings.filter(v => v.status === STATUS.active).length,
    scheduled: votings.filter(v => v.status === STATUS.scheduled).length,
    finalized: votings.filter(v => v.status === STATUS.finalized).length,
    canceled: votings.filter(v => v.status === STATUS.canceled).length,
  };

  const filtered = votings.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

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

        {/* TODO: implementar busca e filtros */}
        <div className="flex flex-col justify-start items-start rounded-t-lg px-3 py-5 bg-white sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:w-1/2">
            <SearchInput value={search} onChange={setSearch} />
          </div>

          <StatusFilterSelect value={statusFilter} onChange={setStatusFilter}/>

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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-start text-gray-500 py-6 pl-3">
                  Nenhuma votação encontrada.
                </td>
              </tr>
            ) : (
              filtered.map(voting =>
                <VoteItem
                  key={voting.id}
                  id={voting.id}
                  name={voting.name}
                  status={voting.status}
                  startDate={formatTimestamp(voting.startDate)}
                  endDate={formatTimestamp(voting.endDate)}
                  qntCandidates={voting.qntCandidates}
                  onCancel={handleCancel}
                  isLoading={loadingId === voting.id}
                />
              )
            )}
          </tbody>
        </table>
        {votings.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-5">
            <img src="/assets/images/empty-state.svg" alt="" className="w-[200px] drop-shadow" />
            <p className="text-gray-400 font-semibold text-xl mt-3">Ainda não há votações registradas</p>
          </div>
        )}
      </section>
    </main>
  )
}
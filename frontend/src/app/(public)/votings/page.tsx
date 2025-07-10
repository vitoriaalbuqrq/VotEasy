import { SearchInput } from "./components/searchInput";
import { VotingCard } from "./components/card";
import api from "@/lib/axios/config";
import { STATUS, Voting } from "@/types/voting";
import { formatTimestamp } from "@/utils/format";

export default async function Votings() {

  const res = await api.get('votings')
  const votings: Voting[] = res.data;

  // Filtro para votações ativas
  const activeVotings = votings.filter(voting => voting.status === STATUS.active);

  // Filtro para votações programadas
  const scheduledVotings = votings.filter(voting => voting.status === STATUS.scheduled);

  return (
    <main className="bg-gray-100 flex flex-col items-start justify-start min-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-10 sm:px-20">
        <header className="mb-10">
          <h1 className="font-bold text-3xl text-start text-secondary">
            Votações públicas para você participar</h1>
        </header>
        <div className="flex items-center justify-start my-8">
          {/* TODO: Exigir quantidade limitada de cards*/}
          <div className="sm:w-[60%]">
            <SearchInput />
          </div>
          <div className="ms-auto flex gap-3">

          <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Todas</p>
          <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Recentes</p>
          </div>
        </div>
        <section className="w-full">
          <h2 className="font-medium text-2xl text-secondary mb-4">Ativas</h2>
          {activeVotings.length > 0 ? (
            <div className="flex gap-5 flex-wrap">
              {activeVotings.map(voting => (
                <VotingCard
                  key={voting.id}
                  id={voting.id}
                  name={voting.name}
                  image="/"
                  status={voting.status}
                  description={voting.description}
                  startDate={voting.startDate}
                  endDate={voting.endDate}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ainda não há votações ativas disponíveis.</p>
          )}
        </section>

        <section className="w-full mt-10">
          <h2 className="font-medium text-2xl text-secondary mb-4">Programadas</h2>
          {scheduledVotings.length > 0 ? (
            <div className="flex gap-5 flex-wrap">
              {scheduledVotings.map(voting => (
                <VotingCard
                  key={voting.id}
                  id={voting.id}
                  name={voting.name}
                  image="/"
                  status={voting.status}
                  description={voting.description}
                  startDate={voting.startDate}
                  endDate={voting.endDate}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ainda não há votações programadas.</p>
          )}
        </section>

      </div>
    </main>
  )
}
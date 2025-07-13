"use client"
import { SearchInput } from "./components/searchInput";
import { VotingCard } from "./components/card";
import api from "@/lib/axios/config";
import { STATUS, Voting } from "@/types/voting";
import { useEffect, useState } from "react";
import { VotingSection } from "./components/votingSection";

export default function Votings() {

  const [votings, setVotings] = useState<Voting[]>([])
  const [search, setSearch] = useState("")
  //const res = await api.get('votings')
  //const votings: Voting[] = res.data;

  useEffect(() => {
    api.get("votings").then((res) => {
      setVotings(res.data)
    })
  }, [])

  const filtered = votings.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  )

  const activeVotings = filtered.filter((v) => v.status === STATUS.active)
  const scheduledVotings = filtered.filter((v) => v.status === STATUS.scheduled)
  const finalizedVotings = filtered.filter((v) => v.status === STATUS.finalized)

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
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="ms-auto flex gap-3">

            <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Todas</p>
            <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Recentes</p>
          </div>
        </div>

        <VotingSection
          title="Ativas"
          votings={activeVotings}
          emptyMessage="Ainda não há votações ativas disponíveis."
        />

        <VotingSection
          title="Programadas"
          votings={scheduledVotings}
          emptyMessage="Ainda não há votações programadas."
        />

        <VotingSection
          title="Finalizadas"
          votings={finalizedVotings}
          emptyMessage="Ainda não há votações finalizadas."
        />


      </div>
    </main>
  )
}
"use client"
import { SearchInput } from "./components/searchInput";
import { VotingCard } from "./components/card";
import api from "@/lib/axios/config";
import { STATUS, StatusLabels, Voting, VotingFilter, VotingStatus } from "@/types/voting";
import { useEffect, useState } from "react";
import { VotingSection } from "./components/votingSection";
import { FilterTag } from "./components/filterTag";

export default function Votings() {

  const [votings, setVotings] = useState<Voting[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<VotingFilter>("all");

  //const res = await api.get('votings')
  //const votings: Voting[] = res.data;

  useEffect(() => {
    api.get("votings").then((res) => {
      setVotings(res.data)
    })
  }, [])

  const filtered = votings.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="bg-gray-100 flex flex-col items-start justify-start min-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-10 sm:px-20">
        <header className="mb-10">
          <h1 className="font-bold text-3xl text-start text-secondary">
            Votações públicas para você participar
          </h1>
        </header>
        <div className="flex items-center justify-start my-8 gap-3">
          <div className="sm:w-[60%] flex-1">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="ms-auto flex flex-1">
            <FilterTag current={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>

        {statusFilter === "all" ? (
          <>
            {(["active", "scheduled", "finalized"] as VotingStatus[]).map((status) => {
              const votingsByStatus = filtered.filter((v) => v.status === status);
              return (
                <VotingSection
                  key={status}
                  title={`Votações ${StatusLabels[status]}`}
                  votings={votingsByStatus}
                  emptyMessage={`Nenhuma votação ${StatusLabels[status].toLowerCase()} disponível.`}
                />
              );
            })}
          </>
        ) : (
          <VotingSection
            title={`Votações ${StatusLabels[statusFilter]}`}
            votings={filtered}
            emptyMessage="Nenhuma votação encontrada com esse filtro."
          />
        )}
      </div>
    </main>
  );

}


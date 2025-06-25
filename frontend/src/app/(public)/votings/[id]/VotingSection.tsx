'use client'

import { PublicCandidate } from "@/types/voting";
import api from "@/lib/axios/config";
import { Card } from "./components/card";

interface VotingSectionProps {
  votingId: string;
  candidates: PublicCandidate[];
}

export default function VotingSection({ votingId, candidates }: VotingSectionProps) {
  const handleVote = async (candidateId: string) => {
    try {
      await api.post("/vote", { votingId, candidateId });
      alert("Voto computado com sucesso!");
    } catch (error) {
      alert("Erro ao computar voto.");
    }
  };

  return (
    <section className="flex justify-center gap-3 flex-wrap my-8">
      {candidates.map(candidate => (
        <Card
          key={candidate.id}
          {...candidate}
          votingId={votingId}
          onVote={handleVote}
        />
      ))}
    </section>
  );
}

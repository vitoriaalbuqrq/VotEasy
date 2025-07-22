'use client'

import { PublicCandidate } from "@/types/voting";
import api from "@/lib/axios/config";
import { Card } from "./components/card";
import { useToast } from "@/hooks/use-toast";

interface VotingSectionProps {
  votingId: string;
  candidates: PublicCandidate[];
}

//TODO: adicionar loading durante a confirmação da transação
export default function VotingSection({ votingId, candidates }: VotingSectionProps) {
  const { toast } = useToast();

  const handleVote = async (candidateId: string) => {
    try {
      const res = await api.post("/vote", { votingId, candidateId });
      toast({
        variant: "success",
        title: res.data.message,
      })
    } catch (err: any) {
      toast({
        variant: "error",
        title: err.response?.data?.message,
      })
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

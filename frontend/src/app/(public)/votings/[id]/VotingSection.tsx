'use client'

import { PublicCandidate } from "@/types/voting";
import api from "@/lib/axios/config";
import { Card } from "./components/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface VotingSectionProps {
  votingId: string;
  candidates: PublicCandidate[];
}

//TODO: adicionar loading durante a confirmação da transação
export default function VotingSection({ votingId, candidates }: VotingSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleVote = async (candidateId: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && (
      <LoadingSpinner/>
    )}
      <section className="flex justify-center gap-3 flex-wrap my-8">
        {candidates.map(candidate => (
          <Card
            key={candidate.id}
            {...candidate}
            votingId={votingId}
            onVote={handleVote}
            isLoading={loading}
          />
        ))}
      </section>
    </>
  );
}

'use client'

import { Candidate } from "@/types/voting";
import api from "@/lib/axios/config";
import { Card } from "./components/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface VotingSectionProps {
  votingName: string;
  votingDescription: string;
  votingId: string;
  candidates: Candidate[];
}

//TODO: adicionar loading durante a confirmação da transação
export default function VotingSection({ votingName, votingDescription, votingId, candidates }: VotingSectionProps) {
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
        <LoadingSpinner />
      )}
      <section className="flex justify-center gap-3 flex-wrap my-8">
        <header className="mb-14 text-center px-5">
          <h1 className="font-bold text-2xl sm:text-3xl text-secondary">
            {votingName}: Quem você quer que ganhe?
          </h1>
          <p className="text-gray-500 mt-3">{votingDescription}</p>
        </header>
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

import { Container } from "@/components/container";
import VotingSection from "./VotingSection";
import api from "@/lib/axios/config";
import { Candidate, STATUS, Voting } from "@/types/voting";
import { useToast } from "@/hooks/use-toast";
import { use } from "react";
import WinnerSection from "./WinnerSection";

interface VotingPageProps {
  params: { id: string };
}

export default async function VotingPage({ params }: VotingPageProps) {
  const votingId = params.id;

  const votingRes = await api.get(`voting/${votingId}`);
  const voting: Voting = votingRes.data;

  const candidateRes = await api.get(`/candidates/${votingId}`);
  const candidates: Candidate[] = candidateRes.data;

  const isFinalized = voting.status === STATUS.finalized;

  let winnerCandidate: Candidate | null = null;

  if (isFinalized) {
    try {
      const res = await api.get(`winner/${votingId}`);
      winnerCandidate = res.data;
    } catch (err) {
      console.error("Erro ao buscar vencedor:", err);
    }
  }

  return (
    <Container>
      <main className="bg-white m-auto shadow-md rounded-lg sm:max-w-[95%]">
        <div className="flex flex-col justify-center items-center p-3 sm:py-12 sm:px-10">
          <header className="mb-14 text-center px-5">
            <h1 className="font-bold text-2xl sm:text-3xl text-secondary">
              {voting.name}: Quem você quer que ganhe?
            </h1>
            <p className="text-gray-500 mt-3">{voting.description}</p>
          </header>
          {isFinalized && winnerCandidate ? (
            <WinnerSection candidates={candidates} candidate={winnerCandidate}/>
          ): (
            <VotingSection votingId={votingId} candidates={candidates} />
          )}
        </div>
      </main>
    </Container>
  );
}

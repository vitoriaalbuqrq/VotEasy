// app/voting/[id]/WinnerSection.tsx
import { Candidate } from "@/types/voting";
import { CardWinnerCandidate } from "./components/cardWinnerCandidate";
import { calculateVotePercentages } from "@/utils/result";
import { IoMdTrophy } from "react-icons/io";
import { Image } from "lucide-react";

interface WinnerSectionProps {
  votingName: string;
  candidates: Candidate[];
  winnerCandidate: Candidate;
}

export default function WinnerSection({ votingName, candidates, winnerCandidate }: WinnerSectionProps) {
  const { candidatesWithPercentage } = calculateVotePercentages(candidates);
  const sortedCandidates = [...candidatesWithPercentage].sort((a, b) => b.votes - a.votes);

  return (
    <main className="w-auto flex flex-col gap-4">
      <header className="text-center">
        <h1 className="font-bold text-sm md:text-2xl text-secondary">
          Resultado da votação: {votingName}
        </h1>
      </header>
      <section className="flex flex-col items-center gap-2 mb-5">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-medium text-primary">{winnerCandidate.name}</p>
          <div className="relative flex justify-center items-center w-24 h-24 border rounded-full bg-gray-50">
            <Image size={60} className="text-gray-400" />
            <IoMdTrophy size={40} className="text-yellow-500 absolute -right-2 -bottom-1"/>
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full gap-4">
        {sortedCandidates.map((cand, index) => (
          <CardWinnerCandidate
            key={cand.id}
            index={index + 1}
            candidate={cand}
            isWinner={cand.id === winnerCandidate.id} />
        ))}
      </section>
    </main>
  );
}

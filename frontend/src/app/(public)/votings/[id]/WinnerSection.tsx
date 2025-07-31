// app/voting/[id]/WinnerSection.tsx
import { Candidate, Voting } from "@/types/voting";
import { CardWinnerCandidate } from "./components/cardWinnerCandidate";
import { calculateVotePercentages } from "@/utils/result";
import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

interface WinnerSectionProps {
  candidates: Candidate[];
  winnerCandidate: Candidate;
}

export default function WinnerSection({ candidates, winnerCandidate }: WinnerSectionProps) {
  const { candidatesWithPercentage } = calculateVotePercentages(candidates);
  const sortedCandidates = [...candidatesWithPercentage].sort((a, b) => b.votes - a.votes);

  return (
    <main className="w-full flex flex-col gap-4">
      <section className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center border border-gray-200 rounded-lg p-5 gap-2">
          <div className="relative">
            <div className="flex justify-center items-center w-16 h-16 border rounded-full bg-gray-50">
              <FaUser size={40} className="text-gray-400" />
            </div>
            <FaTrophy size={24} className="absolute text-yellow-500 bottom-0 right-0" />
          </div>

          <p className="text-lg font-semibold">{winnerCandidate.name}</p>
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

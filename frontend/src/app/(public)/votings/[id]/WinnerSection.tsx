// app/voting/[id]/WinnerSection.tsx
import { Candidate} from "@/types/voting";
import { CardWinnerCandidate } from "./components/cardWinnerCandidate";
import { calculateVotePercentages } from "@/utils/result";

interface WinnerSectionProps {
  votingName: string;
  candidates: Candidate[];
  winnerCandidate: Candidate;
}

export default function WinnerSection({ votingName, candidates, winnerCandidate }: WinnerSectionProps) {
  const { candidatesWithPercentage } = calculateVotePercentages(candidates);
  const sortedCandidates = [...candidatesWithPercentage].sort((a, b) => b.votes - a.votes);

  return (
    <main className="w-full flex flex-col gap-4">
      <header className="mb-14 text-center px-5">
        <h1 className="font-bold text-2xl sm:text-3xl text-secondary">
          Resultado da votação: {votingName}
        </h1>
      </header>
      <section className="flex flex-col items-center gap-2 mb-5">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-medium text-primary">{winnerCandidate.name}</p>
          <img src="/assets/images/img-trophy.png" alt="image-winner" className="w-[250px] drop-shadow" />

          {/* <div className="relative">
            <div className="flex justify-center items-center w-16 h-16 border rounded-full bg-gray-50">
              <FaUser size={40} className="text-gray-400" />
            </div>
            <FaTrophy size={24} className="absolute text-yellow-500 bottom-0 right-0" />
          </div> */}

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

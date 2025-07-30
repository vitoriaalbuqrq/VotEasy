// app/voting/[id]/WinnerSection.tsx
import { Candidate, Voting } from "@/types/voting";
import { CardWinnerCandidate } from "./components/cardWinnerCandidate";

interface WinnerSectionProps {
  candidates: Candidate[];
  candidate: Candidate;
}

export default function WinnerSection({ candidates, candidate }: WinnerSectionProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      {candidates.map((cand) => (
        <CardWinnerCandidate key={cand.id} candidate={cand} />
      ))}
    </div>
  );
}

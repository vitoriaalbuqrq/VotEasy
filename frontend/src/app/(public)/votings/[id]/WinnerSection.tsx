// app/voting/[id]/WinnerSection.tsx
import { PublicCandidate } from "@/types/voting";
import { FaUser } from "react-icons/fa";

interface WinnerSectionProps {
  votingId: string;
  candidate: PublicCandidate;
}

export default function WinnerSection({ votingId, candidate }: WinnerSectionProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-12 text-center">
      <div className="flex justify-center items-center w-24 h-24 border rounded-full bg-gray-50">
        <FaUser size={60} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-secondary">Candidato Vencedor</h2>
      <h1 className="text-2xl font-bold text-green-700">{candidate.name}</h1>
      <p className="text-gray-500 font-medium">Partido: {candidate.party}</p>
      <p className="text-gray-500 font-medium">Número: {candidate.number}</p>
    </div>
  );
}

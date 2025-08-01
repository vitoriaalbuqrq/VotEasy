'use client'
import { Candidate} from "@/types/voting";
import { FaUser } from "react-icons/fa";

interface CardProps extends Candidate {
  votingId: string;
  onVote: (candidateId: string) => void;
  isLoading?: boolean;
}

export function Card({ name, number, party, id, votingId, onVote, isLoading = false }: CardProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border border-secondary sm:w-72 p-4 rounded-2xl">
      {/* <Image
        src="/assets/images/img-auth.png"
        alt="candidate image"
        width={100}
        height={100}
        className="rounded-full border shadow-sm"
      /> */}
      <div className="flex justify-center items-center w-20 h-20 border rounded-full bg-gray-50">
        <FaUser size={50} className="text-gray-400" />
      </div>
      <h1 className="font-bold text-xl text-secondary">{name}</h1>
      {number != 0 && (
        <h2 className="font-bold text-gray-500">{number}</h2>
      )}
      <div className="flex gap-3 w-full mt-2">
        <button className="flex-1 px-5 py-2 font-bold uppercase border border-secondary text-secondary text-center rounded-full hover:opacity-90 transition-colors">
          Detalhes
        </button>

        <button
        onClick={() => onVote(id)}
        disabled={isLoading}
        className={`flex-1 px-5 py-2 font-bold uppercase bg-tertiary text-white text-center rounded-full transition-opacity duration-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transition-colors"
        }`}
      >
        Votar
      </button>
      </div>
    </div>
  )
}
'use client'
import { Progress } from "@/components/ui/progress";
import { Candidate } from "@/types/voting";
import { CandidateWithPercentage } from "@/utils/result";

interface CardProps {
  candidate: CandidateWithPercentage;
  isWinner?: boolean;
  index: number;
}

//TODO: Obter resultados da votação, extrair do dashboard para reaproveitamento
export function CardWinnerCandidate({ candidate, isWinner, index }: CardProps) {
  return (
    <div className={`${isWinner ? 'bg-primary-hover' : 'bg-white'} p-3 w-full rounded-xl shadow-md`}>
      <div className="flex items-center gap-3">
        <h1 className={`${isWinner ? 'text-primary' : 'text-gray-500'} text-5xl font-extrabold w-10 text-center opacity-40`}>
          {index}
        </h1>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h2 className="font-bold text-xl">{candidate.name}
              {candidate.party && (
                <span> | {candidate.party}</span>
              )}
              </h2>
            <p className={`${isWinner ? 'text-primary' : 'text-gray-500'} text-xl font-bold`}>{candidate.percentage.toFixed(2)} %</p>
          </div>
          {candidate.number != 0 && (
            <p className="text-sm">{candidate.number}</p>
          )}
          <Progress value={candidate.percentage} className="mt-3 h-2"/>
        </div>
      </div>
    </div>
  )
}
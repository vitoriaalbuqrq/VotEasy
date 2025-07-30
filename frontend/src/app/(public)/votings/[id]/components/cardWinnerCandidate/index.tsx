'use client'
import { Progress } from "@/components/ui/progress";
import { Candidate } from "@/types/voting";

interface CardProps {
  candidate: Candidate;
}

//TODO: Obter resultados da votação, extrair do dashboard para reaproveitamento
export function CardWinnerCandidate({ candidate }: CardProps) {
  return (
    <div className="p-3 bg-primary-hover w-full rounded-xl shadow-md">
      <div className="flex items-center gap-3">
        <h1 className="text-5xl font-extrabold w-10 text-center text-primary opacity-40">1</h1>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
          <h2 className="font-bold text-xl">Nome | <span>Partido</span></h2>
          <p className="text-xl text-primary font-bold">70.00 %</p>
          </div>
          <p className="text-sm">Nº 123</p>
          <Progress value={70} className="mt-3 h-2"/>
        </div>
      </div>
    </div>
  )
}
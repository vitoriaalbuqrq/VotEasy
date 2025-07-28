import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import api from "@/lib/axios/config";
import { Candidate, STATUS, VotingStatus } from "@/types/voting";
import { formatTimestamp } from "@/utils/format";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface CardProps {
  id: string;
  image: string;
  name: string;
  status: VotingStatus;
  description: string;
  startDate: string;
  endDate: string;
}

//Calcular progresso da votação
function calculateProgress(start: number, end: number): number {
  const now = Math.floor(Date.now() / 1000);

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end - start;
  const current = now - start;

  //console.log(`now:${now} total:${total} current:${current}`)

  return Math.min(100, Math.max(0, (current / total) * 100));
}

// TODO: tratar imagem do card ou padrao
export function VotingCard({ id, name, status, description, startDate, endDate }: CardProps) {
  const progress = calculateProgress(Number(startDate), Number(endDate));
  const isScheduled = status === STATUS.scheduled;

  return (
    <div className="relative flex items-stretch">
      {isScheduled && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex justify-center items-center text-gray-300 rounded-lg pointer-events-auto cursor-not-allowed">
          <FaLock size={57} className="mb-2" />
        </div>
      )}

      <Link
        href={isScheduled ? "#" : `votings/${id}`}
        className={`transition-transform duration-300 hover:scale-105 block ${isScheduled ? "pointer-events-none" : ""}`}
      >
        <Card className="max-w-[300px] h-full flex flex-col">
          <CardHeader>
            <img src="/assets/images/img-voting-padrao.jpg" className="h-[180px] w-auto object-cover rounded-sm" />
            <Progress value={progress} className="h-2" />
            <div className="text-gray-400 flex justify-between text-sm">
              <p>{formatTimestamp(startDate)}</p>
              <p>{formatTimestamp(endDate)}</p>
            </div>
          </CardHeader>
          <CardContent className="px-5 flex flex-col gap-1 h-full">
            <h1 className="font-semibold text-xl text-secondary line-clamp-2">{name}</h1>
            <p className="text-gray-600 line-clamp-3">{description}</p>
            <FaArrowRightLong size={22} className="ms-auto mt-auto text-primary" />
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
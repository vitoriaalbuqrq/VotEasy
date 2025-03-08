import { Status } from "@/types/voteStatus";

interface StatusIndicatorProps {
  status: Status;
}

const statusColors: Record<Status, string> = {
  Ativa: "bg-green-200 text-green-700",
  Programada: "bg-yellow-200 text-yellow-700",
  Finalizada: "bg-blue-200 text-blue-700",
};

export function VoteStatus({status}: StatusIndicatorProps){
  return (
    <span className={`${statusColors[status]} px-3 py-1 rounded-full`}>{status}</span>
  )
}
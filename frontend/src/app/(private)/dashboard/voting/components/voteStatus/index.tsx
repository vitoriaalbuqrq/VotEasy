import { VotingStatus, StatusLabels } from "@/types/voting";

export const StatusColors: Record<VotingStatus, string> = {
  scheduled: "bg-yellow-100 text-yellow-600",
  active: "bg-green-100 text-green-600",
  finalized: "bg-blue-100 text-blue-600",
  canceled: "bg-red-100 text-red-600",
};

export function VoteStatus({ status }: { status: VotingStatus }) {
  return (
    <span className={`${StatusColors[status]} px-3 py-1 rounded-full`}>
      {StatusLabels[status]}
    </span>
  );
}


import { VotingStatus, StatusLabels } from "@/types/voting";

export const StatusColors: Record<VotingStatus, string> = {
  scheduled: "bg-yellow-200 text-yellow-700",
  active: "bg-green-200 text-green-700",
  finalized: "bg-blue-200 text-blue-700",
  canceled: "bg-red-200 text-red-700",
};

export function VoteStatus({ status }: { status: VotingStatus }) {
  return (
    <span className={`${StatusColors[status]} px-3 py-1 rounded-full`}>
      {StatusLabels[status]}
    </span>
  );
}


import { Status, getStatusLabel } from "@/types/voting";

const statusColors: Record<Status, string> = {
  [Status.Active]: "bg-green-200 text-green-700",
  [Status.Scheduled]: "bg-yellow-200 text-yellow-700",
  [Status.Finalized]: "bg-blue-200 text-blue-700",
  [Status.Canceled]: "bg-red-200 text-red-700",
};

export function VoteStatus({ status }: { status: Status }) {
  return (
    <span className={`${statusColors[status]} px-3 py-1 rounded-full`}>
      {getStatusLabel(status)}
    </span>
  );
}

import { STATUS, StatusLabels, VotingFilter, VotingStatus } from "@/types/voting";

interface FilterTagProps {
  current: VotingFilter;
  onChange: (value: VotingFilter) => void;
}

export function FilterTag({ current, onChange }: FilterTagProps) {
  const visibleStatuses: VotingStatus[] = ["scheduled", "active", "finalized"];
  const statusOptions: VotingFilter[] = ["all", ...visibleStatuses];


  const tags = statusOptions.map((status) => ({
    value: status,
    label: status === "all" ? "Todas" : StatusLabels[status as VotingStatus],
  }));

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => onChange(tag.value)}
          className={`font-medium px-3 py-1 rounded-full transition 
            ${current === tag.value
              ? "bg-gray-300 text-gray-700"
              : "outline outline-1 outline-gray-400 text-gray-700 hover:bg-gray-300 hover:outline-none"}
          `}

        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}

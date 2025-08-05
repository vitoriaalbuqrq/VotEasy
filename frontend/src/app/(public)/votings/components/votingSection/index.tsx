import { Voting } from "@/types/voting"
import { VotingCard } from "../card"

interface VotingSectionProps {
  title: string
  votings: Voting[]
  emptyMessage: string
}

export function VotingSection({ title, votings, emptyMessage }: VotingSectionProps) {
  return (
    <section className="w-full mt-10">
      <h2 className="font-medium text-2xl text-secondary mb-4">{title}</h2>
      {votings.length > 0 ? (
        <div className="flex gap-7 flex-wrap items-stretch justify-start">
          {votings.map((voting) => (
            <VotingCard
              key={voting.id}
              id={voting.id}
              name={voting.name}
              image="/"
              status={voting.status}
              description={voting.description}
              startDate={voting.startDate}
              endDate={voting.endDate}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      )}
    </section>
  )
}

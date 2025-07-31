import { Candidate } from "@/types/voting";

export function getTotalVotes(candidates: Candidate[]): number {
  return candidates.reduce((total, candidate) => {
    return total + Number(candidate.votes);
  }, 0);
}

export interface CandidateWithPercentage extends Candidate {
  percentage: number;
}

export function calculateVotePercentages(candidates: Candidate[]) {
  const totalVotes = getTotalVotes(candidates);

  const candidatesWithPercentage: CandidateWithPercentage[] = candidates.map((candidate) => {
    const votes = Number(candidate.votes);
    const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

    return {
      ...candidate,
      percentage,
    };
  });

  return {
    totalVotes,
    candidatesWithPercentage,
  };
}

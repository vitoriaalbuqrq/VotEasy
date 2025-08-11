export const STATUS = {
  scheduled: "scheduled",
  active: "active",
  finalized: "finalized",
  canceled: "canceled",
} as const;

export type VotingStatus = keyof typeof STATUS;

export const StatusLabels: Record<VotingStatus, string> = {
  scheduled: "Programada",
  active: "Ativa",
  finalized: "Finalizada",
  canceled: "Cancelada",
};

export type VotingFilter = VotingStatus | "all";


export interface Voting {
  id: string;
  name: string;
  description: string;
  status: VotingStatus;
  startDate: string;
  endDate: string;
  winnerIndex: string;
  qntCandidates: number;
}

export interface Candidate {
  id: string;
  name: string;
  number: string | number;
  party: string;
  votes: number;
}
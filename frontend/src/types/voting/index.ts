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

//TODO: Apagar os tipos que não serão mais utilizados
export enum Status {
  Active = "0",
  Scheduled = "1",
  Finalized = "2",
  Canceled = "3",
}

export function getStatusLabel(status: Status): string {
  switch (status) {
    case Status.Active:
      return "Ativa";
    case Status.Scheduled:
      return "Programada";
    case Status.Finalized:
      return "Finalizada";
    case Status.Canceled:
      return "Cancelada";
    default:
      return "Desconhecido";
  }
}

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
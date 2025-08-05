'use client';
import { VotingFilter } from "@/types/voting";

interface StatusFilterSelectProps {
  value: VotingFilter;
  onChange: (value: VotingFilter) => void;
}

export function StatusFilterSelect({ value, onChange }: StatusFilterSelectProps) {
  return (
    <select
      className="border border-gray-300 rounded-full px-3 py-2 sm:ms-auto"
      value={value}
      onChange={(e) => onChange(e.target.value as VotingFilter)}
    >
      <option value="all">Todos os status</option>
      <option value="active">Ativas</option>
      <option value="scheduled">Programadas</option>
      <option value="finalized">Finalizadas</option>
      <option value="canceled">Canceladas</option>
    </select>
  );
}

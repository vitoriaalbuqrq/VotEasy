'use client';
import { LinkButton } from "@/components/linkButton";
import Link from "next/link";
import { VoteStatus } from "../voteStatus";
import { STATUS, Voting } from "@/types/voting";

type VotingProps = Pick<Voting, 'id' | 'name' | 'status' | 'startDate' | 'endDate' | 'qntCandidates'> & {
  onCancel: (id: Voting['id']) => void;
};

export function VoteItem({ id, name, status, startDate, endDate, qntCandidates, onCancel }: VotingProps) {

  return (
    <>
      <tr className="border-b border-b-slate-200 h-16 last:border-b-0 bg-white">
        <td className="text-left pl-3 font-medium">
          {name}
        </td>
        <td className="text-left pl-3">
          <VoteStatus status={status} />
        </td>
        <td className="text-left pl-3 hidden sm:table-cell">
          {startDate}
        </td>
        <td className="text-left pl-3">
          {endDate}
        </td>
        <td className="text-center">
          {qntCandidates}
        </td>
        <td className="align-middle">
          <div className="flex flex-col sm:flex-row gap-2">

            <button
              onClick={() => onCancel(id)}
              disabled={status === STATUS.canceled}
              className={`font-medium rounded-full px-3 py-1 mr-2 whitespace-nowrap border
                ${status === STATUS.canceled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-700 hover:border-red-200 hover:text-red-800 hover:bg-red-200'}
              `}
            >
              {status === STATUS.canceled ? 'Cancelado' : 'Cancelar'}
            </button>

            <Link href={`/dashboard/voting/${id}`} className="bg-secondary text-white font-medium rounded-full px-3 py-1 mr-2 hover:opacity-90 whitespace-nowrap">
              Ver Detalhes
            </Link>
          </div>
        </td>

        {/* <td className="text-left">
          <button className="group bg-gray-200 rounded-full p-1 me-2 hover:bg-red-200">
            <FiTrash2 size={24} className="text-gray-500 group-hover:text-red-800" />
          </button>
          <button className="group bg-gray-200 rounded-full p-1 me-2 hover:bg-blue-200">
            <FiEdit size={24} className="text-gray-500 group-hover:text-blue-800"/>
          </button>
        </td> */}
      </tr>
    </>
  )
}
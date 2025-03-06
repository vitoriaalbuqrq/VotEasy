import { LinkButton } from "@/components/linkButton";
import Link from "next/link";
import { FiEdit, FiFile, FiTrash2 } from "react-icons/fi";

export function VoteItem() {
  return (
    <>
      <tr className="border-b border-b-slate-200 h-16 last:border-b-0 bg-white">
        <td className="text-left pl-3 font-medium">
          Votação presidencia acadêmica
        </td>
        <td className="text-left">
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full">Aberta</span>
        </td>
        <td className="text-left hidden sm:table-cell">
          10/5/3633
        </td>
        <td className="text-left">
          Pública
        </td>
        <td className="text-center">
          5
        </td>
        <td className="text-left">
          <button className="bg-gray-300 text-gray-700 font-medium rounded-full px-3 py-2 me-2 hover:text-red-800 hover:bg-red-200">
            Parar Votação
          </button>
          <Link href="#" className="bg-secondary text-white font-medium rounded-full px-3 py-2 me-2 hover:opacity-90">
            Ver Detalhes
          </Link>
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
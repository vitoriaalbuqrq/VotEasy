import Image from "next/image";
import Link from "next/link";

interface CardProps {
  candidateName: string;
  number: number;
  id: string;
}

export function Card({candidateName, number, id}: CardProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border border-secondary w-80 p-4 rounded-2xl">
      <Image
        src="/assets/images/img-auth.png"
        alt="candidate image"
        width={100}
        height={100}
        className="rounded-full border shadow-sm"
      />
      <h1 className="font-bold text-xl text-secondary">{candidateName}</h1>
      <h2 className="font-bold text-gray-500">{number}</h2>
      <div className="flex gap-3 w-full mt-2">
        <button className="flex-1 px-5 py-2 font-bold uppercase border border-secondary text-secondary text-center rounded-full hover:opacity-90 transition-colors">Detalhes</button>
        <button className="flex-1 px-5 py-2 font-bold uppercase bg-secondary text-white text-center rounded-full hover:opacity-90 transition-colors">Votar</button>
      </div>
    </div>
  )
}
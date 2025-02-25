import Link from "next/link";
import { ReactNode } from "react";
import { FaVoteYea } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface CardProps {
  title: string;
  text: string;
  icon: ReactNode;
  href: string;
}

export function Card({ title, text, icon, href }: CardProps) {
  return (
    <Link href={href}
      className="group flex gap-3 rounded-xl border border-primary p-5 hover:bg-primary-hover transition-colors">
      <div className="flex justify-center items-center w-[50px] h-[50px] p-2 border rounded-lg border-primary
       text-primary text-2xl group-hover:text-white group-hover:bg-primary transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-gray-500">{text}</p>
      </div>
      <div className="ms-auto mt-auto">
        <FaArrowRightLong size={22} className="text-primary" />
      </div>
    </Link>
  )
}
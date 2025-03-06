import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  text: string;
  icon?: ReactNode;
}

export function LinkButton({href, text, icon}: LinkButtonProps){
  return (
    <Link className="flex gap-1 items-center text-white bg-primary px-4 py-2 font-medium rounded-full transition-transform duration-300 hover:scale-105 hover:opacity-80"
    href={href}>
      {icon && 
        <span className="text-xl">{icon}</span>}
      {text}
    </Link>
  )
}
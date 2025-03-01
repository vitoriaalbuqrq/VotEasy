import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
}

export function LinkButton({href, text}: LinkButtonProps){
  return (
    <Link className="text-white bg-primary px-6 py-2 font-medium rounded-full transition-transform duration-300 hover:scale-105 hover:opacity-80"
    href={href}>
      {text}
      </Link>
  )
}
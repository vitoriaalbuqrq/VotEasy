import Link from "next/link"
import { LinkButton } from "../linkButton"

export function Header() {

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto text-primary font-medium">
        <Link href="/" className="hover:font-bold transition-transform duration-300 hover:scale-105">
          <h1 className="font-bold text-2xl pl-1"><span>Vote</span>Easy</h1>
        </Link>

        <div className="flex items-baseline gap-7 uppercase">
          <Link href="/votings" className="hover:bg-primary-hover px-3 py-2 hover:rounded-full transition-transform duration-300">Votações</Link>
          <Link href="/dashboard" className="hover:bg-primary-hover px-3 py-2 hover:rounded-full transition-transform duration-300">Dashboard</Link>
          <LinkButton href="/auth" text="Login" />
        </div>

        {/* TODO: rotas privadas*/}
        {/* <div className="flex items-baseline gap-4">
          <Link href="">Dashboard</Link>
        </div> */}

      </div>
    </header>
  )
}
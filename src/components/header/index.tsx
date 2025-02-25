"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto text-primary font-medium">
        <Link href="/" className="hover:font-bold transition-transform duration-300 hover:scale-105">
          <h1 className="font-bold text-2xl pl-1"><span>Vote</span>Easy</h1>
        </Link>

        <div className="flex items-baseline gap-6">
          <Link href="" className="transition-transform duration-300 hover:scale-105">Votações</Link>
          <Link href="/auth" className="text-white bg-primary px-5 py-1 rounded-2xl transition-transform duration-300 hover:scale-105 hover:opacity-80">Login</Link>
        </div>

        {/* <div className="flex items-baseline gap-4">
          <Link href="">Dashboard</Link>
        </div> */}

      </div>
    </header>
  )
}
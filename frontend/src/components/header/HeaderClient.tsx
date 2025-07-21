"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LinkButton } from "../linkButton";
import api from "@/lib/axios/config";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

type Props = {
  role: string | null;
  name?: string | null;
};

export function HeaderClient({ role, name }: Props) {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout")
      router.push("/auth")
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  //TODO:Extrair dropdown para component
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white md:h-20 shadow-sm flex-wrap">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto text-primary font-medium flex-wrap">
        <Link href="/" className="hover:font-bold transition-transform duration-300 hover:scale-105">
          <h1 className="font-bold text-2xl pl-1"><span>Vote</span>Easy</h1>
        </Link>

        <div className="flex items-center gap-6 uppercase flex-wrap relative">
          <Link href="/votings" className="hover:bg-primary-hover px-3 py-2 hover:rounded-full transition-transform duration-300">
            Votações
          </Link>

          {role === "ORGANIZER" && (
            <Link href="/dashboard" className="hover:bg-primary-hover px-3 py-2 hover:rounded-full transition-transform duration-300">
              Dashboard
            </Link>
          )}

          {role ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 bg-primary-hover px-3 py-2 rounded-full max-w-52"
              >
                <span className="truncate overflow-hidden whitespace-nowrap">
                  {name}
                </span>
                <IoIosArrowDown size={18} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <div className="px-4 py-2 text-sm text-gray-600 capitalize">Usuário Votante</div>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-primary-hover text-sm"
                  >
                    Sair
                    <IoIosLogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <LinkButton href="/auth" text="Login" />
          )}
        </div>
      </div>
    </header>
  );
}

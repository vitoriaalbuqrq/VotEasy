'use client'

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { CircleCheckBig, Home, Package, PanelBottom, Plus, Vote } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import api from "@/lib/axios/config";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
   try {
    await api.get('auth/logout')

    router.push("auth")
   }catch (err)  {
    console.error("Erro ao fazer logout", err);
   }
  }
  
  return (

    <div className="flex w-full flex-col bg-muted/40">

      <aside
        className="fixed inset-0 left-0 z-10 hidden w-14 border-r bg-white sm:flex"
      >
        <nav className="flex flex-col items-center gap-4 px-3 py-5">
          <TooltipProvider>
            <Link
              href="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full"
            >
              <CircleCheckBig className="h-5 w-5" />
              <span className="sr-only">Dashboard Avatar</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Início</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Início</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/votings"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Vote className="h-5 w-5" />
                  <span className="sr-only">Minhas votações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Minhas votações</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild className="mt-auto">
                <button onClick={handleLogout}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                  >
                  <FiLogOut className="h-5 w-5"/>
                  <span className="sr-only">Sair</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
            
          </TooltipProvider>
        </nav>
      </aside>


      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-white gap-4 sm:static sm:auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                  prefetch={false}
                >
                  <CircleCheckBig className="h-5 w-5 transition-all" />
                  <span className="sr-only">Logo do projeto</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-primary"
                  prefetch={false}
                >
                  <Home className="h-5 w-5 transition-all" />
                  Início
                </Link>
                
                <button onClick={handleLogout}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary">
                  <FiLogOut className="h-5 w-5"/>
                </button>
              </nav>

            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode}) {
  return (
    <div className="bg-gray-100 flex flex-col items-start justify-start min-h-[100vh]"> 
      <div className="w-full max-w-7xl mx-auto py-10 sm:px-20">
        { children }
      </div>
    </div>
  )
}
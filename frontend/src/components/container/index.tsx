import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode}) {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"> 
      <div className="w-auto min-w-[60%] max-w-5xl mx-auto md:py-2 md:px-4 lg:px-0">
        { children }
      </div>
    </div>
  )
}
"use client"
import { Container } from "@/components/container"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex w-full md:max-w-[60%] m-auto bg-white flex-col justify-center p-6 lg:px-8 rounded-2xl shadow-sm">
        {children}
      </div>
    </Container>
  )
}

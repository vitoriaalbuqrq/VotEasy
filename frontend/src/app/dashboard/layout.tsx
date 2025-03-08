import { Container } from "./components/container";
import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <Container>
        <main className="">
          {children}
        </main>
      </Container>
    </>
  );
}

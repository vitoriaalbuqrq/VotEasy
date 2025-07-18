'use client'
import { useParams } from "next/navigation"
import { AuthLayout } from "../../components/auth/AuthLayout"
import LoginForm from "../../components/auth/LoginForm"

export default function LoginPage() {
  const { role } = useParams() as { role: "USER" | "ORGANIZER" }

  return (
    <AuthLayout>
      <LoginForm role={role} />
    </AuthLayout>
  )
}
'use client'
import { useParams } from "next/navigation"
import { AuthLayout } from "../../components/auth/AuthLayout"
import RegisterForm from "../../components/auth/RegisterForm"

export default function RegisterPage() {
  const { role } = useParams() as { role: "USER" | "ORGANIZER" }

  return (
    <AuthLayout>
      <RegisterForm role={role} />
    </AuthLayout>
  )
}

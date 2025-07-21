'use client'
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod"
import { AuthHeader } from "./AuthHeader";
import { GoogleLoginButton } from "./GoogleLoginButton";

interface RegisterFormProps {
  role: "USER" | "ORGANIZER"
}

const registerFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório."),
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .toLowerCase(),
  password: z.string()
    .min(8, "A senha precisa de no mínimo 8 caracteres"),
  confirmPassword: z.string()
    .min(8, "A senha precisa de no mínimo 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem.",
  path: ["confirmPassword"],
})

type FormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm( { role } : RegisterFormProps) {
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      const res = await api.post("auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: role,
      });
      toast({
        variant: "success",
        title: res.data?.msg,
        description: "Verifique seu e-mail para confirmar sua conta."
      })
    } catch (error: any) {
      const msg = error.response?.data?.msg || "Ocorreu um erro inesperado. Tente novamente mais tarde."
      toast({
        variant: "error",
        title: "Erro ao cadastrar!",
        description: msg,
      });
      console.error("error ao registrar:", error)
    }
  }

  return (
    <>
      <AuthHeader title="Crie sua conta" role={role} />
      <form className="space-y-6 mb-5" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Nome</label>
          <div className="mt-2">
            <input {...register('name')} type="text" name="name" id="name" autoComplete="email" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-mail</label>
          <div className="mt-2">
            <input {...register('email')} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Senha</label>
          <div className="mt-2">
            <input {...register('password')} type="password" name="password" id="password" autoComplete="current-password" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            {errors.password && <span className="text-sm text-red-700">{errors.password.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirme a senha</label>
          <div className="mt-2">
            <input {...register('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" autoComplete="current-password" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            {errors.confirmPassword && <span className="text-sm text-red-700">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-full bg-primary px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Cadastrar</button>
        </div>

        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-500">ou</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
      </form>

      <GoogleLoginButton role={role} />

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Já tem uma conta?
        <a href={`/auth/${role}/register`} className="font-semibold text-primary hover:text-primary"> Faça login</a>
      </p>
    </>
  )
}

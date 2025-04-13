'use client'
import { Container } from "@/components/container";
import api from "@/lib/axios/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from 'zod';

//TODO: componentizar melhor

const registerFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .toLowerCase(),
  password: z.string()
    .min(8, "A senha precisa de no mínimo 8 caracteres")
})

type FormData = z.infer<typeof registerFormSchema>;

export default function OrganizerLogin() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const searchParams = useSearchParams();
  const emailConfirmed = searchParams.get('emailConfirmed') === 'true';

  const handleFormSubmit = async (data: FormData) => {
    try {
      const res = await api.post("auth/login", {
        email: data.email,
        password: data.password
      });
      console.log("Login bem-sucedido:", res.data);
      // redireciona após login
      //router.push("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.msg) {
        console.error("Erro da API:", error.response.data.msg);
      } else {
        console.error("Erro inesperado:", error.message);
      }
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3333/api/auth/auth/google";
  };

  return (
    <Container>
      {emailConfirmed && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Email confirmado com sucesso. Faça login para acessar sua conta.
        </div>
      )}
      <div className="flex md:max-w-[55%] lg:max-w-[40%] m-auto bg-white flex-col justify-center px-6 py-12 lg:px-8 rounded-2xl shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Faça seu login</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 mb-5" onSubmit={handleSubmit(handleFormSubmit)}>

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
              <button type="submit" className="flex w-full justify-center rounded-full bg-primary px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Entrar</button>
            </div>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">ou</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>
          </form>

          <button onClick={handleGoogleLogin}
            className="flex w-full border-2 gap-3 rounded-full justify-center items-center px-3 py-1.5 text-md font-semibold text-gray-700 shadow-xs hover:border-primary hover:text-primary">
            <FaGoogle />
            Entrar com Google
          </button>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Ainda não tem cadastro?
            <a href="/auth/organizer/register" className="font-semibold text-primary hover:text-primary"> Cadastre-se</a>
          </p>
        </div>
      </div>
    </Container>
  )
}
'use client'
import { Container } from "@/components/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';

//TODO: componentizar melhor

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

export default function OrganizerLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(registerFormSchema) });

  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <Container>
      <div className="flex md:max-w-[55%] lg:max-w-[40%] m-auto bg-white flex-col justify-center px-6 py-12 lg:px-8 rounded-2xl shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Crie sua conta</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Nome</label>
              <div className="mt-2">
                <input {...register('name')} type="text" name="name" id="name" autoComplete="email" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-mail</label>
              <div className="mt-2">
                <input {...register('email')} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Senha</label>
              <div className="mt-2">
                <input {...register('password')} type="password" name="password" id="password" autoComplete="current-password" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {errors.password && <span className="text-sm text-red-700">{errors.password.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirme a senha</label>
              <div className="mt-2">
                <input {...register('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" autoComplete="current-password" className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {errors.confirmPassword && <span className="text-sm text-red-700">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Já tem uma conta?
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Faça login</a>
          </p>
        </div>
      </div>
    </Container>
  )
}
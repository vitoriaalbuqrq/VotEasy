import { Container } from "@/components/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaCalendar, FaCalendarTimes, FaTimes } from "react-icons/fa";
import { FaArrowRightLong, FaCalendarDay, FaRegCalendar } from "react-icons/fa6";

export default function Votings() {
  return (
    <main className="bg-gray-100 flex flex-col items-start justify-start min-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-10 sm:px-20">
        <header className="mb-10">
          <h1 className="font-bold text-2xl text-start text-secondary">
            Votações públicas para você participar</h1>
          {/* <div className="h-1 bg-secondary w-16 rounded-sm mt-1"></div> */}
        </header>
        <div className="flex gap-3 items-end my-8">
          <p className="font-medium text-gray-600">Todas</p>
          <p className="font-medium text-gray-600">Ativas</p>
          {/* TODO: Criar componente para input search*/}
          <form className="min-w-[50%] ms-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <input type="search" id="default-search" className="block rounded-full w-full p-3 pe-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Pesquisar nome da votação" required />
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>
        </div>
        {/* TODO: criar componentes cards */}
        <section className="flex gap-5 flex-wrap">
          <Card className="max-w-[360px] cursor-pointer transition-transform duration-300 hover:scale-105">
            <CardHeader>
              <img src="/assets/images/img-voting-padrao.jpg" className="h-[200px] w-auto object-cover rounded-sm" />
              <Progress value={60} className="h-2"/>
              <div className="text-gray-400 flex justify-between text-sm">
                <p>22 de mar</p>
                <p>23 de mar</p>
              </div>
            </CardHeader>
            <CardContent className="px-5 flex flex-col gap-3">
              <h1 className="font-semibold text-2xl text-secondary">Votação para presidência</h1>
              <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, illo rerum? Perspiciatis praesentium distinctio</p>
              <FaArrowRightLong size={22} className="ms-auto text-primary" />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
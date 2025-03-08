"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { VoteStatus } from "../components/voteStatus";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, XAxis, BarChart } from "recharts";

export default function Voting() {

  const chartData = [
    { name: "Vitória", votes: 186, color: "#2563eb" },
    { name: "Felipe", votes: 305, color: "#34d399"},
    { name: "João", votes: 237, color: "#f59e0b"},
  ]
   
  const chartConfig = {
    votes: {
      label: "votes",
      color: "#2563eb",
    },
  } satisfies ChartConfig

  return (
    <main>
      <header className="flex justify-between mb-10">
        <div>
          <h1 className="font-bold text-2xl text-primary">Detalhes da Votação</h1>
          <p className="font-medium text-gray-500 text-lg">Nome da votação</p>
        </div>
        <p className="font-medium text-gray-500">Status: <VoteStatus status="Finalizada" /> </p>
      </header>
      <section className="flex flex-col gap-2 sm:flex-row">
        <article>
          <Card>
            <CardHeader className="font-semibold text-lg">Candidatos</CardHeader>
            <CardContent className="flex flex-col gap-2 sm:flex-row">
              <Card className="bg-blue-100 flex flex-col items-center p-4">
                <div className="rounded-full w-14 h-14 bg-gray-400"></div>
                <h1 className="font-medium mt-1">Nome do candidato</h1>
                <p className="text-gray-500">Nº 123456</p>
                <h2 className="font-bold text-2xl mt-3">85,32%</h2>
              </Card>
              <Card className="bg-green-100 flex flex-col items-center p-4">
                <div className="rounded-full w-14 h-14 bg-gray-400"></div>
                <h1 className="font-medium mt-1">Nome do candidato</h1>
                <p className="text-gray-500">Nº 123456</p>
                <h2 className="font-bold text-2xl mt-3">85,32%</h2>
              </Card>
              <Card className="bg-orange-100 flex flex-col items-center p-4">
                <div className="rounded-full w-14 h-14 bg-gray-400"></div>
                <h1 className="font-medium mt-1">Nome do candidato</h1>
                <p className="text-gray-500">Nº 123456</p>
                <h2 className="font-bold text-2xl mt-3">85,32%</h2>
              </Card>
            </CardContent>
          </Card>
        </article>
        <article>
          <Card>
            <CardHeader className="font-semibold text-lg">Resultados</CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false}/>
                  <XAxis 
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="votes" fill="var(--color-votes)" radius={4}/>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </article>
      </section>
    </main>
  )
}
"use client"
import { use } from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, CartesianGrid, XAxis, Bar, Cell, LabelList } from "recharts"
import { FaUser } from "react-icons/fa"
import { Candidate, Voting } from "@/types/voting"
import api from "@/lib/axios/config"
import { VoteStatus } from "../components/voteStatus"
import { calculateVotePercentages } from "@/utils/result"

interface VotingDetails {
  params: Promise<{ id: string }>;
}

export default function VotingDetails({ params }: VotingDetails) {
  const { id: votingId } = use(params);
  const [voting, setVoting] = useState<Voting | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    api.get(`voting/${votingId}`)
      .then(res => setVoting(res.data))
      .catch(err => console.error('Erro ao buscar votação:', err));
  }, []);

  useEffect(() => {
    api.get(`candidates/${votingId}`)
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Erro ao buscar votação:', err));
  }, []);

  const { totalVotes, candidatesWithPercentage } = calculateVotePercentages(candidates);

  const barColors = ["#3f88c5", "#55a630", "#f22b29"]

  const chartData = candidatesWithPercentage.map((c, i) => ({
    name: c.name,
    votes: c.votes,
    color: barColors[i % barColors.length],
  }))

  const chartConfig = {
    votes: {
      //label: "Votos",
      color: "#2563eb",
    },
  } satisfies ChartConfig

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="font-bold text-2xl text-primary">Detalhes da Votação</h1>
        <div className="flex justify-between mt-3">
          <p className="font-medium text-gray-600 text-lg">{voting?.name}</p>
          {voting?.status && (
            <p className="font-medium text-gray-500">
              Status: <VoteStatus status={voting.status} />
            </p>
          )}
        </div>

      </header>

      <section className="flex flex-col gap-4 sm:flex-row">
        <article className="flex-[2] min-w-0">
          <Card className="">
            <CardHeader className="font-semibold text-lg">Candidatos</CardHeader>
            <CardContent className="flex flex-col gap-2 sm:flex-row flex-wrap">
              {candidatesWithPercentage.map((c, i) => {
                const color = barColors[i % barColors.length]
                const bgColorWithOpacity = `${color}30`

                return (
                  <Card
                    key={c.id}
                    className="flex flex-col items-center p-4 text-center basis-48 max-w-sm"
                    style={{ backgroundColor: bgColorWithOpacity }}
                  >
                    <div className="flex justify-center items-center w-14 h-14 border rounded-full bg-gray-50">
                      <FaUser size={30} className="text-gray-400" />
                    </div>
                    <h1 className="font-medium mt-1">{c.name}</h1>
                    <p className="text-gray-600 font-bold">Nº {c.number}</p>
                    {c.party && <p className="text-gray-500 text-sm">{c.party}</p>}
                    <h2 className="font-bold text-2xl mt-3">{c.percentage.toFixed(2)}%</h2>
                    <p className="text-gray-600">{c.votes} votos</p>
                  </Card>
                )
              })}
            </CardContent>
          </Card>
        </article>

        <article className="flex-[1] min-w-0">
          <Card className="">
            <CardHeader className="font-semibold text-lg">Resultados</CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="votes" radius={4}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey={"votes"}
                      position="bottom"
                      style={{ fontSize: 12, fill: "#4b5563" }}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
              <p className="text-center text-sm text-gray-500 mt-2">
                Total de votos: <span className="font-semibold">{totalVotes}</span>
              </p>
            </CardContent>
          </Card>
        </article>
      </section>
    </main>
  )
}

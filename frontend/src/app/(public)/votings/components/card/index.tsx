import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaArrowRightLong } from "react-icons/fa6";

interface CardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

// TODO: tratar imagem do card ou padrao
export function VotingCard({id, name, description, startDate, endDate}: CardProps) {
  return (
    <Card className="max-w-[360px] cursor-pointer transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <img src="/assets/images/img-voting-padrao.jpg" className="h-[200px] w-auto object-cover rounded-sm" />
        <Progress value={60} className="h-2" />
        <div className="text-gray-400 flex justify-between text-sm">
          <p>{startDate}</p>
          <p>{endDate}</p>
        </div>
      </CardHeader>
      <CardContent className="px-5 flex flex-col gap-3">
        <h1 className="font-semibold text-2xl text-secondary line-clamp-2">{name}</h1>
        <p className="text-gray-600 line-clamp-3">{description}</p>
        <FaArrowRightLong size={22} className="ms-auto text-primary" />
      </CardContent>
    </Card>
  )
}
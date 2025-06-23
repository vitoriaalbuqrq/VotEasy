import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  name: string;
  quant: number;
  color: "green-500" | "yellow-500" | "blue-500" | "red-500";
}

const bgIconClasses = {
  "green-500": "bg-green-100",
  "yellow-500": "bg-yellow-100",
  "blue-500": "bg-blue-100",
  "red-500": "bg-red-100",
};

const textClasses = {
  "green-500": "text-green-500",
  "yellow-500": "text-yellow-500",
  "blue-500": "text-blue-500",
  "red-500": "text-red-500",
};

export function StatusCard({ icon, name, quant, color }: StatusCardProps) {
  return (
    <Card className="flex-1">
      <CardContent className="flex items-start justify-start p-4 gap-4">
        <div className="flex flex-col gap-2 items-center justify-center m-auto">
          <h1 className="font-medium text-gray-500">{name}</h1>
          <h2 className="text-3xl font-bold">{quant}</h2>
        </div>
        <div className={clsx("text-2xl p-2 rounded-lg", textClasses[color], bgIconClasses[color])}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
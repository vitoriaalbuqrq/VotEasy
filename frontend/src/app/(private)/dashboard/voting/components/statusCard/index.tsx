import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  name: string;
  quant: number;
  color: "green-500" | "yellow-500" | "blue-500" | "red-500";
}

const borderClasses = {
  "green-500": "border-s-green-500",
  "yellow-500": "border-s-yellow-500",
  "blue-500": "border-s-blue-500",
  "red-500": "border-s-red-500",
};

const textClasses = {
  "green-500": "text-green-500",
  "yellow-500": "text-yellow-500",
  "blue-500": "text-blue-500",
  "red-500": "text-red-500",
};

export function StatusCard({ icon, name, quant, color }: StatusCardProps) {
  return (
    <Card className={clsx("border-s-4 flex-1", borderClasses[color])}>
      <CardContent className="flex items-center justify-start p-4 gap-4">
        <div className={clsx("text-5xl", textClasses[color])}>
          {icon}
        </div>
        <div className="flex flex-col gap-2 items-center justify-center m-auto">
          <h1 className="font-medium text-gray-500">{name}</h1>
          <h2 className="text-3xl font-bold">{quant}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
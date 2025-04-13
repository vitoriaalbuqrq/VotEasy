"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

const DatePicker = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-grow-[2]">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(new Date(field.value), "dd/MM/yyyy") : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TimePicker = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-grow-[1]">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type="time"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const Step2 = () => {
  const { control } = useFormContext();

  return (
    <Card className="border-none flex flex-col gap-5">
      <CardHeader className="pl-0">
        <CardTitle>Visibilidade da Votação</CardTitle>
        <CardDescription>
          Escolha quem pode visualizar esta votação. A opção "Público" torna a votação acessível a todos, enquanto "Privado" pode ser acessada com um código.
        </CardDescription>
      </CardHeader>
      <FormField
        control={control}
        name="visibility"
        render={({ field }) => (
          <FormItem>
						<FormLabel>{"Visibilidade"}</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex space-x-6"
              >
                <label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="público" id="public" />
                  <span>Público</span>
                </label>
                <label htmlFor="private" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="privado" id="private" />
                  <span>Privado</span>
                </label>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2 w-full">
        <DatePicker name="startDate" label="Data de Início" />
        <TimePicker name="startTime" label="Horário" />
      </div>
      <div className="flex gap-2 w-full">
        <DatePicker name="endDate" label="Data de Término" />
        <TimePicker name="endTime" label="Horário" />
      </div>
    </Card>
  );
};

export default Step2;

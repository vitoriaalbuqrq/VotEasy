"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext, useFieldArray } from "react-hook-form";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const Step3 = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "candidates",
  });

  function addCandidate() {
    append({ name: "", number: 0 });
  }

  return (
    <Card className="border-none">
      <CardHeader className="pl-0">
        <CardTitle>{"Adicione os Candidatos"}</CardTitle>
        <CardDescription>
          {"Adicione pelo menos dois candidatos. Insira os nomes e números (opcional) dos candidatos para serem incluídos na votação."}
        </CardDescription>
      </CardHeader>

      <div className="flex flex-col gap-4">
        <label htmlFor="candidates" className="flex items-center justify-between">
          <span className="font-medium text-lg text-gray-600">Candidatos</span>
          <button
            type="button"
            onClick={addCandidate}
            className="bg-gray-300 rounded-lg py-1 px-2 flex gap-1 justify-around items-center font-medium hover:bg-opacity-80"
          >
            <FiPlus size={18} />
            Adicionar
          </button>
        </label>

        {fields.map((field, index) => (
          <Card key={field.id} className="rounded-lg p-4 flex items-center flex-wrap gap-2">
            <div className="w-full text-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-lg py-1 px-2 h-10 bg-red-200 text-red-800"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
            <FormField
              control={control}
              name={`candidates.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-grow-[3]">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do candidato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`candidates.${index}.number`}
              render={({ field }) => (
                <FormItem className="flex-grow-[1]">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Número do candidato"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`candidates.${index}.party`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Partido (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Partido do candidato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </Card>
        ))}
      </div>
    </Card>
  );
};

export default Step3;

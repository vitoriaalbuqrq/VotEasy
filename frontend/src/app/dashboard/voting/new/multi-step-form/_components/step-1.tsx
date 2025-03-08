"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useFormContext } from "react-hook-form";
const Step1 = () => {
	const { control } = useFormContext();
	return (
		<Card className="border-none flex flex-col gap-5">
			<CardHeader className="pl-0">
				<CardTitle>{"Informações Básicas da Votação"}</CardTitle>
				<CardDescription>{"Preencha as informações iniciais para criar a votação."}</CardDescription>
			</CardHeader>
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{"Nome da Votação"}</FormLabel>
						<FormControl>
							<Input placeholder="Digite o nome da votação" {...field} />
						</FormControl>
						{/* <FormDescription>{"Escolha um nome que represente claramente o objetivo da votação."}</FormDescription> */}
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{"Descrição (opcional)"}</FormLabel>
						<FormControl>
							<Textarea placeholder="Digite uma descrição" {...field} />
						</FormControl>
						{/* <FormDescription>{"Escolha um nome que represente claramente o objetivo da votação."}</FormDescription> */}
						<FormMessage />
					</FormItem>
				)}
			/>
		</Card>
	);
};

export default Step1;
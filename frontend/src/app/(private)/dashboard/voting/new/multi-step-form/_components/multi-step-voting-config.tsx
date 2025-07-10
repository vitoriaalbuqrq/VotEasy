import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import type { Form, UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import buildMultiStepForm from "@/lib/multi-step-form";
import api from "@/lib/axios/config";

//1 - Define all the fields for the entire form
export const VotingFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
  // visibility: z.enum(["privado", "público"]),
  startDate: z.string().nonempty("A data de início é obrigatório"),
  startTime: z.string().nonempty("O horário de início é obrigatório"),
  endDate: z.string().nonempty("A data de término é obrigatório"),
  endTime: z.string().nonempty("O horário de término é obrigatório"),
  //status: z.string().min(1),
  candidates: z.array(z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    number: z.coerce.number().optional(),
    party: z.string().optional(),
  })).min(2, 'Insira pelo menos 2 candidatos'),
})

//2 - CREATE THE TYPE
export type VotingFormType = z.infer<typeof VotingFormSchema>;

//3 - Initial Data for all the fiels
export const initialFormData: VotingFormType = {
  name: "",
  description: "",
  // visibility: "público",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  //status: "",
  candidates: [{ name: "", number: 0, party: "" }, { name: "", number: 0, party: "" }],
}

//4 - Define the final end step submit function
const saveFormData: SubmitHandler<VotingFormType> = async (values) => {

  try{
    const {candidates, ...rest} = values;

    const candidateNames = candidates.map(c => c.name);
    const candidateNumbers = candidates.map(c => c.number ?? 0);
    const candidateParties = candidates.map(() => "");
    
    //TODO: Verificar as datas e conversões
    const payload = {
      ...rest,
      startDate: values.startDate.split("T")[0],
      endDate: values.endDate.split("T")[0],
      candidateNames,
      candidateNumbers,
      candidateParties,
    };
    
    console.log(payload)
    await api.post("voting", payload);

    console.log("Votação criada com sucesso.", payload)
    
  } catch (error){
    console.error("Erro ao criar votação:", error);
  }
  
}

//5 - Define multistep data
export const forms: Form<VotingFormType>[] = [
  { id: 1, label: "Informações", form: Step1, fields: ["name", "description"] },
  { id: 2, label: "Visibilidade", form: Step2, fields: ["startDate", "endDate", "startTime", "endTime"] },
  { id: 3, label: "Candidatos", form: Step3, fields: ["candidates"] },
]

//6 - Define initial form options
const initialFormOptions: UseMultiStepFormTypeOptions<VotingFormType> = {
  schema: VotingFormSchema,
  currentStep: 0,
  setCurrentStep: (value) => { },
  forms,
  saveFormData,
};

//7 - Define FormContext and FormProvider
export const { FormContext: VotingFormContext, FormProvider: VotingProvider } = buildMultiStepForm(
  initialFormOptions,
  VotingFormSchema,
  initialFormData,
);
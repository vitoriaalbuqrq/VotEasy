import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { createContext, useState } from "react";

export default function buildMultiStepForm<T extends FieldValues, U extends UseMultiStepFormTypeOptions<T>>(
	initialFormOptions: U,
	schema: ZodSchema<T>,
	initialFormData: DefaultValues<T>,
) {
	const FormContext = createContext<UseMultiStepFormTypeOptions<T>>(initialFormOptions);
	const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const [currentStep, setCurrentStep] = useState(initialFormOptions.currentStep);
		const form = useForm<T>({
			resolver: zodResolver(schema),
			defaultValues: initialFormData,
		});

		return (
			<FormContext.Provider value={{ ...initialFormOptions, setCurrentStep, currentStep, form }}>
				{children}
			</FormContext.Provider>
		);
	};
	return {
		FormContext,
		FormProvider,
	};
}
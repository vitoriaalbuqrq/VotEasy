import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form"
import { Context, useCallback, useContext } from "react"
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { motion } from "framer-motion";
import { containerCurrentForm as container } from "@/constants/framer-motion";

// biome-ignore lint: must be any as it is any object
function useMultiStepForm<T extends UseMultiStepFormTypeOptions<any>>(context: Context<T>) {
	const { forms, schema, currentStep, setCurrentStep, form, saveFormData } = useContext(context);
	if (form === undefined) throw new Error("A react-hook-form must be defined");

	const steps = forms.length;

	const nextStep = () => {
		if (currentStep < steps - 1) setCurrentStep((step) => step + 1);
	};

	const previousStep = () => {
		if (currentStep > 0) setCurrentStep((step) => step - 1);
	};

	const goToStep = (index: number) => {
		if (index >= 0 && index < steps) setCurrentStep((step) => index);
	};

	const isFirstStep = currentStep === 0;

	const isLastStep = currentStep === steps - 1;

	const currentStepLabel = forms[currentStep].label;

	const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
		if (isLastStep) await saveFormData(values);
		nextStep();
	};

	const onErrors: SubmitErrorHandler<z.infer<typeof schema>> = (errors) => {
		const stepFields = forms[currentStep].fields.flat();
		const errorFields = new Set(Object.keys(errors).flat());
		let hasStepErrors = false;
		for (const field of stepFields) {
			if (errorFields.has(field as string)) hasStepErrors = true;
		}

		if (!hasStepErrors) {
			form?.clearErrors();
			nextStep();
		}
	};

	const labels = forms.map((form) => form.label);

	const CurrentForm: React.FC = useCallback(() => {
		const Step = forms[currentStep].form;
		return (
			<motion.div variants={container} className="flex flex-col gap-2" initial="hidden" animate="visible" exit="exit">
				<Step />
			</motion.div>
		);
	}, [forms, currentStep]);

	return {
		form,
		currentStep,
		steps,
		nextStep,
		previousStep,
		goToStep,
		isFirstStep,
		isLastStep,
		labels,
		currentStepLabel,
		CurrentForm,
		onSubmit,
		onErrors,
	};
}

export { useMultiStepForm };
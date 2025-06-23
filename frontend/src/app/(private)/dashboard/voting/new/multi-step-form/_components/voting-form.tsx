"use client";

import { useMultiStepForm } from "@/hooks/multi-step-form";
import { VotingFormContext } from "./multi-step-voting-config";
import MultiStepForm from "@/components/ui/extension/multi-step-form/multi-step-form";
import MultiStepNavbar from "@/components/ui/extension/multi-step-form/multi-step-navbar";
import { containerVotingForm as container } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import MultiStepNavButtons from "@/components/ui/extension/multi-step-form/multi-step-nav-buttons";

const VotingForm = () => {
	const { CurrentForm } = useMultiStepForm(VotingFormContext);

	return (
		<MultiStepForm title="Nova Votação" description="Entre com as informações da votação">
			<MultiStepNavbar context={VotingFormContext} />
			<div className="flex flex-col flex-1 rounded-lg p-3 min-w-fit">
				<motion.div variants={container} className="flex flex-col gap-2" initial="hidden" animate="visible" exit="exit">
					<CurrentForm />
				</motion.div>
				<MultiStepNavButtons
					context={VotingFormContext}
					previousLabel="Anterior"
					nextLabel="Próximo"
					endStepLabel="Finalizar"
				/>
			</div>
		</MultiStepForm>
	);
};

export default VotingForm;
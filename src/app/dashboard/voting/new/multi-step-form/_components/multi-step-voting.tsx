"use client";

import VotingForm from "./voting-form";
import { VotingProvider } from "./multi-step-voting-config";

const MultiStepVoting = () => {
  return (
    <VotingProvider>
      <VotingForm />
    </VotingProvider>
  );
};

export default MultiStepVoting;
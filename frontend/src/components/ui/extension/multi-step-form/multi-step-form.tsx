"use client";
import { containerMultiStepForm as container } from "@/constants/framer-motion";
import { VotingFormContext } from "@/app/dashboard/voting/new/multi-step-form/_components/multi-step-voting-config";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import React, { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../card";

interface Props extends PropsWithChildren {
  title: string;
  description: string;
};

const MultiStepForm = ({ title, description, children }: Props) => {
  const { form, onSubmit, onErrors } = useMultiStepForm(VotingFormContext);
  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit, onErrors)} className="w-full px-3 md:w-[60%]">
        <motion.div
          variants={container}
          className="flex flex-col gap-2"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary md:text-3xl">{title}</CardTitle>
              <CardDescription className="text-sm text-neutral-400 md:text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-2 m-2">
              {children}
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </Form>
  );
};

export default MultiStepForm;
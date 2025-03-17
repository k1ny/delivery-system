"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type StepperContextType = {
  currentStep: string;
  goToStep: (step: string) => void;
  nextStep: () => void;
  order: string[];
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const Stepper = {
  Root: ({ order, children }: { order: string[]; children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState(order[0]);

    const goToStep = (step: string) => {
      if (order.includes(step)) setCurrentStep(step);
    };

    const nextStep = () => {
      const currentIndex = order.indexOf(currentStep);
      if (currentIndex < order.length - 1) {
        setCurrentStep(order[currentIndex + 1]);
      }
    };

    return (
      <StepperContext.Provider
        value={{ currentStep, goToStep, nextStep, order }}
      >
        {children}
      </StepperContext.Provider>
    );
  },

  Step: ({ value, children }: { value: string; children: ReactNode }) => {
    const context = useContext(StepperContext);
    if (!context) throw new Error("Stepper.Step must be inside Stepper.Root");

    return context.currentStep === value ? <div>{children}</div> : null;
  },

  Controls: () => {
    const context = useContext(StepperContext);
    if (!context)
      throw new Error("Stepper.Controls must be inside Stepper.Root");

    const { currentStep, goToStep, order } = context;
    const currentIndex = order.indexOf(currentStep);

    return (
      <div className="flex gap-4">
        <button
          onClick={() => goToStep(order[currentIndex - 1])}
          disabled={currentIndex === 0}
          className="p-2 border rounded disabled:opacity-50"
        >
          Назад
        </button>
        <button
          onClick={() => goToStep(order[currentIndex + 1])}
          disabled={currentIndex === order.length - 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          Вперёд
        </button>
      </div>
    );
  },

  useStepper: () => {
    const context = useContext(StepperContext);
    if (!context) throw new Error("useStepper must be inside Stepper.Root");
    return context;
  },
};

"use client";
import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type StepperContextType = {
  currentStep: string;
  availibleStep: (step: string) => void;
  nextStep: () => void;
  stepsArray: string[];
};

export const StepperContext = createContext<StepperContextType | undefined>(
  undefined,
);

export const Stepper = {
  Root: ({
    stepsArray,
    children,
  }: {
    stepsArray: string[];
    children: ReactNode;
  }) => {
    const [currentStep, setCurrentStep] = useState(stepsArray[0]);

    const availibleStep = (step: string) => {
      if (stepsArray.includes(step)) setCurrentStep(step);
    };

    const nextStep = () => {
      const currentIndex = stepsArray.indexOf(currentStep);
      if (currentIndex < stepsArray.length - 1) {
        setCurrentStep(stepsArray[currentIndex + 1]);
      }
    };

    return (
      <StepperContext.Provider
        value={{ currentStep, availibleStep, nextStep, stepsArray }}
      >
        <div className="relative">
          <TransitionGroup>{children}</TransitionGroup>
        </div>
      </StepperContext.Provider>
    );
  },

  Step: ({ value, children }: { value: string; children: ReactNode }) => {
    const context = useContext(StepperContext);
    if (!context) throw new Error("Stepper.Step must be inside Stepper.Root");

    const nodeRef = useRef(null);

    return (
      <CSSTransition
        in={context.currentStep === value}
        timeout={500}
        classNames="step"
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef} key={value} className="absolute w-full">
          {children}
        </div>
      </CSSTransition>
    );
  },

  Controls: () => {
    const context = useContext(StepperContext);
    if (!context)
      throw new Error("Stepper.Controls must be inside Stepper.Root");

    const { currentStep, availibleStep, stepsArray } = context;
    const currentIndex = stepsArray.indexOf(currentStep);

    return (
      <div className="flex gap-4">
        <button
          onClick={() => availibleStep(stepsArray[currentIndex - 1])}
          disabled={currentIndex === 0}
          className="p-2 border rounded disabled:opacity-50"
        >
          Назад
        </button>
        <button
          onClick={() => availibleStep(stepsArray[currentIndex + 1])}
          disabled={currentIndex === stepsArray.length - 1}
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

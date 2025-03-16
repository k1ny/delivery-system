"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export const OrderForm = () => {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState("opacity-1 translate-x-0");

  useEffect(() => {
    setFade("opacity-0 translate-x-[-30px]");

    const timeout = setTimeout(() => {
      setFade("opacity-1 translate-x-0");
    }, 300);

    return () => clearTimeout(timeout);
  }, [step]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <form className="mt-20 mx-auto p-4 ">
      <div className={`transition-all duration-300 ${fade}`}>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Input placeholder="Введите имя" />
            <Button onClick={nextStep} className="self-end">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <Input placeholder="Введите email" />
            <div className="flex justify-between">
              <Button onClick={prevStep}>Prev</Button>
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-center text-lg">Форма заполнена!</p>
            <Button onClick={() => setStep(1)}>Начать заново</Button>
          </div>
        )}
      </div>
    </form>
  );
};

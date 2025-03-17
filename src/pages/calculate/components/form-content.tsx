"use client";
import { useEffect, useState } from "react";
import { DeliveryWayCard } from "./delivery-way-card";
import { Stepper } from "./stepper";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type Option = {
  id: string;
  days: number;
  name: string;
  price: number;
  type: string;
};

export type Order = {
  option: Option;
};

export const defaultOrderValues: Order = {
  option: {
    id: "",
    days: 0,
    name: "",
    price: 0,
    type: "",
  },
};

export const FormContent = ({ data }) => {
  const [fade, setFade] = useState("opacity-0 translate-x-full");
  const { nextStep, currentStep } = Stepper.useStepper();
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: defaultOrderValues,
  });

  useEffect(() => {
    setFade("opacity-0 translate-x-[-300px]");
    const timeout = setTimeout(() => setFade("opacity-1 translate-x-0"), 300);
    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <form className="mt-20 w-full">
      <div className={`transition-all duration-300 ${fade}`}>
        <Stepper.Step value="option">
          <div className="w-full">
            <h2>Способ отправки</h2>

            <div className="flex justify-between w-full">
              <Controller
                name="option"
                control={control}
                render={({ field }) => (
                  <>
                    {data.map((option: Option) => (
                      <DeliveryWayCard
                        key={option.id}
                        nextStep={() => {
                          field.onChange(option);
                          nextStep();
                        }}
                        option={option}
                        isSelected={field.value?.id === option.id}
                      />
                    ))}
                  </>
                )}
              />
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step value="recieverInfo">
          <div className="flex flex-col gap-4">
            <Input placeholder="Введите email" />
          </div>
          <Stepper.Controls />
        </Stepper.Step>

        <Stepper.Step value="senderInfo">
          <div className="flex flex-col gap-4">
            <p className="text-center text-lg">Форма заполнена!</p>
            <Button onClick={() => nextStep()}>Отправить</Button>
          </div>
        </Stepper.Step>
      </div>
    </form>
  );
};

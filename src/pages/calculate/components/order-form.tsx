"use client";
import { DeliveryWayCard } from "./delivery-way-card";
import { Stepper, StepperContext } from "./stepper";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

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

export const OrderForm = ({ data }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: defaultOrderValues,
  });

  return (
    <form className="mt-20 w-full">
      <Stepper.Root
        stepsArray={[
          "option",
          "recieverInfo",
          "senderInfo",
          "senderAdress",
          "receiverAdress",
          "payment",
        ]}
      >
        <StepperContext.Consumer>
          {({ nextStep }) => (
            <>
              <Stepper.Step value="option">
                <div className="w-full flex flex-col gap-6">
                  <h2 className="font-bold text-2xl">Способ отправки</h2>
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
                  <Stepper.Controls />
                </div>
              </Stepper.Step>
            </>
          )}
        </StepperContext.Consumer>
      </Stepper.Root>
    </form>
  );
};

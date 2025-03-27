"use client";
import { DeliveryWayCard } from "./components/delivery-way-card";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { AdressInfo } from "./components/adress-info";
import { ContactInfo } from "./components/contact-info";
import { Stepper, StepperContext } from "../stepper";
import { PayerInfo } from "./components/payer-info";
import { DataVerification } from "./components/data-verification/data-verification";
import { useContext } from "react";

export type Option = {
  id: string;
  days: number;
  name: string;
  price: number;
  type: string;
};

export type Contact = {
  firstname: string;
  lastname: string;
  middlename: string;
  phone: string;
};

export type Adress = {
  street: string;
  house: string;
  appartament: string;
  comment: string;
};

export type Order = {
  option: Option;
  receiver: Contact;
  sender: Contact;
  senderAdress: Adress;
  receiverAdress: Adress;
  payer: "RECEIVER" | "SENDER" | "";
};

export const defaultOrderValues: Order = {
  option: {
    id: "",
    days: 0,
    name: "",
    price: 0,
    type: "",
  },
  receiver: {
    firstname: "",
    lastname: "",
    middlename: "",
    phone: "",
  },
  sender: {
    firstname: "",
    lastname: "",
    middlename: "",
    phone: "",
  },
  senderAdress: {
    street: "",
    house: "",
    appartament: "",
    comment: "",
  },
  receiverAdress: {
    street: "",
    house: "",
    appartament: "",
    comment: "",
  },
  payer: "",
};

export const OrderForm = ({ data }) => {
  const orderForm = useForm({
    defaultValues: defaultOrderValues,
  });

  const { handleSubmit, control } = orderForm;

  return (
    <FormProvider {...orderForm}>
      <Stepper.Root
        stepsArray={[
          "option",
          "recieverInfo",
          "senderInfo",
          "senderAdress",
          "receiverAdress",
          "payer",
          "dataVerification",
        ]}
      >
        <StepperContext.Consumer>
          {({ nextStep, stepsArray, currentStep }) => (
            <form
              className="mt-20 w-full"
              onSubmit={handleSubmit((data) => {
                if (currentStep === stepsArray[stepsArray.length - 1]) {
                  console.log("Финальные данные:", data);
                }
              })}
            >
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
                <ContactInfo contact="receiver" header="Получатель" />
              </Stepper.Step>

              <Stepper.Step value="senderInfo">
                <ContactInfo contact="sender" header="Отправитель" />
              </Stepper.Step>

              <Stepper.Step value="senderAdress">
                <AdressInfo contact="senderAdress" header="Откуда забрать" />
              </Stepper.Step>

              <Stepper.Step value="receiverAdress">
                <AdressInfo contact="receiverAdress" header="Куда доставить" />
              </Stepper.Step>

              <Stepper.Step value="payer">
                <PayerInfo />
              </Stepper.Step>

              <Stepper.Step value="dataVerification">
                <DataVerification />
              </Stepper.Step>
            </form>
          )}
        </StepperContext.Consumer>
      </Stepper.Root>
    </FormProvider>
  );
};

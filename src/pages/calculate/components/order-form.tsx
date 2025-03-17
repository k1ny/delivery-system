"use client";
import { FormContent } from "./form-content";
import { Stepper } from "./stepper";

export const OrderForm = ({ data }) => {
  return (
    <Stepper.Root
      order={[
        "option",
        "recieverInfo",
        "senderInfo",
        "senderAdress",
        "receiverAdress",
        "payment",
      ]}
    >
      <FormContent data={data} />
    </Stepper.Root>
  );
};

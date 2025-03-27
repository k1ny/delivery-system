import { useFormContext } from "react-hook-form";
import { DataCard } from "./data-card";
import { useEffect } from "react";
import { DataCardLayout } from "./data-card-layout";
import { Stepper } from "../../../stepper";

export const DataVerification = () => {
  const { control, trigger, getValues } = useFormContext();
  const allFields = getValues();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-2xl">Проверка данных заказа</h2>
      <DataCard data={allFields} />
      <Stepper.Controls />
    </div>
  );
};

import { TextField } from "@/components/ui/text-field";
import { Controller, useFormContext } from "react-hook-form";
import { Stepper } from "../../stepper";
import { useState } from "react";

export const AdressInfo = ({
  contact,
  header,
}: {
  contact: string;
  header: string;
}) => {
  const { control, trigger } = useFormContext();
  const [isTouched, setIsTouched] = useState(false);

  const handleNextStep = async () => {
    setIsTouched(true);
    const isValid = await trigger(contact);
    return isValid;
  };

  return (
    <div className="flex flex-col gap-6 max-w-[464px]">
      <h2 className="font-bold text-2xl">{header}</h2>
      <Controller
        name={`${contact}.street`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Улица"
            placeholder="Улица"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.house`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Номер дома"
            placeholder="Дом"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.appartament`}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Номер квартиры"
            placeholder="Номер"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.comment`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Заметка"
            placeholder="Заметка для курьера"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Stepper.Controls handleNextStep={handleNextStep} />
    </div>
  );
};

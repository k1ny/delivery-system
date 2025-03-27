import { TextField } from "@/components/ui/text-field";
import { Controller, useFormContext } from "react-hook-form";
import { Stepper } from "../../stepper";
import { useState } from "react";

export const ContactInfo = ({
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
        name={`${contact}.lastname`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Фамилия"
            placeholder="Фамилия"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.firstname`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Имя"
            placeholder="Имя"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.middlename`}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Отчество"
            placeholder="Отчество (при наличии)"
            onChange={field.onChange}
            defaultValue={field.value}
            error={(isTouched && fieldState?.error?.message) || ""}
          />
        )}
      />
      <Controller
        name={`${contact}.phone`}
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <TextField
            labelName="Номер телефона"
            placeholder="Телефон"
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

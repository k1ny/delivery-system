import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Stepper } from "../../stepper";

export const PayerInfo = () => {
  const { control, trigger } = useFormContext();
  const [isTouched, setIsTouched] = useState(false);

  const handleNextStep = async () => {
    setIsTouched(true);
    const isValid = await trigger("payer");
    return isValid;
  };

  return (
    <div className="flex flex-col gap-6 max-w-[464px]">
      <h2 className="font-bold text-2xl">Оплата доставки</h2>
      <Controller
        name="payer"
        control={control}
        rules={{ required: "Выберите способ оплаты!" }}
        render={({ field, fieldState }) => (
          <RadioGroup defaultValue="RECEIVER" onChange={field.onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <label htmlFor="option-one">Получатель</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SENDER" id="option-two" />
              <label htmlFor="option-two">Отправитель</label>
            </div>

            <p>{(isTouched && fieldState?.error?.message) || ""}</p>
          </RadioGroup>
        )}
      />
      <Stepper.Controls handleNextStep={handleNextStep} />
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { BusFront, Plane } from "lucide-react";
import { ReactNode } from "react";
import { Option } from "./order-form";

export type DeliveryCard = {
  nextStep: () => void;
  option: Option;
  isSelected: boolean;
};
const getDayLabel = (days: number) => {
  if (days % 10 === 1 && days % 100 !== 11) return "рабочий день";
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100))
    return "рабочих дня";
  return "рабочих дней";
};

const nameIcons: Record<string, ReactNode> = {
  EXPRESS: <Plane className="w-6 h-6" />,
  DEFAULT: <BusFront className="w-6 h-6" />,
};

export const DeliveryWayCard = ({
  nextStep,
  option,
  isSelected,
}: DeliveryCard) => {
  return (
    <Button
      type="button"
      onClick={nextStep}
      className={`flex justify-start gap-4 w-[468px] h-full border rounded-3xl text-start items-start transition-all ${
        isSelected ? "border-blue-500 bg-blue-500" : "border-gray-200"
      }`}
    >
      <div className="bg-gray-200 p-4 rounded-full">
        {nameIcons[option.type]}
      </div>

      <div
        className={`flex flex-col gap-6 ${
          isSelected ? "text-white" : "text-black"
        }`}
      >
        <div>
          <p>{option.name}</p>
          <strong>{option.price} ₽</strong>
        </div>
        <p>
          {option.days} {getDayLabel(option.days)}
        </p>
      </div>
    </Button>
  );
};

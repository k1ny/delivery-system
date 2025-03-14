import { DeliveryPoint } from "@/api/points";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CitySelectProps {
  points: DeliveryPoint[];
  icon: React.ReactNode;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => unknown;
  pointsIdButton: number[];
}

export const CitySelect = ({
  points,
  icon,
  label,
  error,
  value,
  onChange,
  pointsIdButton,
}: CitySelectProps) => {
  return (
    <div>
      <label>{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="flex w-[296px]">
          <div className="flex gap-1 items-center">
            {icon}
            <SelectValue placeholder="Выберите город" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {points.map((point) => (
              <SelectItem key={point.id} value={point.name}>
                {point.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex gap-2 underline">
        {points.map((point) =>
          pointsIdButton.includes(Number(point.id)) ? (
            <Button
              type="button"
              key={point.id}
              value={point.name}
              className="w-fit h-fit p-0 text-gray-500"
              onClick={onChange}
            >
              {point.name}
            </Button>
          ) : null,
        )}
      </div>

      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

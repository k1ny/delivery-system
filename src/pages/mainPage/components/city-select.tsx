import { DeliveryPoint } from "@/api/points";
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
}

export const CitySelect = ({
  points,
  icon,
  label,
  error,
  value,
  onChange,
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
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

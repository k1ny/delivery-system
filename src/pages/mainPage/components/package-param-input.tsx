import { Input } from "@/components/ui/input";

export const PackageParamInput = ({
  label,
  value,
  onChangeValue,
  placeholder,
}: {
  label: string;
  value: number;
  onChangeValue: (value: number) => unknown;
  placeholder: string;
}) => {
  return (
    <div className="flex justify-between">
      <label>{label}</label>
      <Input
        value={value}
        placeholder={placeholder}
        className="w-50"
        onChange={(event) => onChangeValue(Number(event.target.value))}
      />
    </div>
  );
};

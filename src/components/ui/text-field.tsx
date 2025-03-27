import { Input } from "./input";

type TextFieldProps = {
  labelName: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
  error: string;
};

export const TextField = ({
  labelName,
  placeholder,
  onChange,
  defaultValue,
  error,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <label>{labelName}</label>
      <Input
        placeholder={placeholder}
        className="p-3"
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};

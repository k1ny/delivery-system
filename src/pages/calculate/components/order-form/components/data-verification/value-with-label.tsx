export const ValueWithLabel = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
};

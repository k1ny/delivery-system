export const DataCardLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-gray-100 rounded-3xl">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

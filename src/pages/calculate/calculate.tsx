import { redirect } from "next/navigation";
import { OrderForm } from "./components/order-form";

export default function Calculate({
  searchParams,
}: {
  searchParams: { data?: string };
}) {
  const data = searchParams?.data;

  if (!data) {
    redirect("/");
  }

  return (
    <div>
      <div className="w-[960px] mx-auto flex justify-between">
        <OrderForm data={data} />
        ddd
      </div>
    </div>
  );
}

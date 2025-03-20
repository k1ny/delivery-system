import { redirect } from "next/navigation";
import { OrderForm } from "./components/order-form";
import { postCalc } from "@/api/calc";
import { getPoints } from "@/api/points";
import { DeliveryPostValues } from "../mainPage/components/delivery-form";
import { Container } from "@/components/container";

export default async function Calculate({
  searchParams,
}: {
  searchParams: { data?: string };
}) {
  const rawData = searchParams?.data;
  if (!rawData) return redirect("/");

  const data = JSON.parse(rawData);
  const points = (await getPoints()).points;

  const fileredData: DeliveryPostValues = {
    senderPoint: {
      latitude: points.find((point) => point.id === data.senderPoint.id)
        ?.latitude,
      longitude: points.find((point) => point.id === data.senderPoint.id)
        ?.longitude,
    },
    receiverPoint: {
      latitude: points.find((point) => point.id === data.receiverPoint.id)
        ?.latitude,
      longitude: points.find((point) => point.id === data.receiverPoint.id)
        ?.longitude,
    },
    package: {
      length: data.package.length,
      width: data.package.width,
      weight: data.package.weight,
      height: data.package.height,
    },
  };

  const deliveryWays = await postCalc(fileredData);

  return (
    <div>
      <Container className="flex justify-between">
        <OrderForm data={deliveryWays.options} />
      </Container>
    </div>
  );
}

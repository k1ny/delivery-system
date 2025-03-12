import { getPackahes } from "@/api/package";
import { getPoints } from "@/api/points";

import Image from "next/image";
import DeliveryForm from "./components/delivery-form";

export default async function MainPage() {
  const { points } = await getPoints();
  const { packages } = await getPackahes();

  return (
    <div className="">
      <div>
        <Image src={"/plane.png"} alt="plane" width={500} height={500} />
        <h1>ЦФТ доставка - быстро, удобно, надежно!</h1>
      </div>

      <DeliveryForm points={points} packages={packages} />
    </div>
  );
}

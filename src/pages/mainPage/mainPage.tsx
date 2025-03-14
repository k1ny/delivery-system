import { getPackahes } from "@/api/package";
import { getPoints } from "@/api/points";

import Image from "next/image";
import DeliveryForm from "./components/delivery-form";

export default async function MainPage() {
  const { points } = await getPoints();
  const { packages } = await getPackahes();

  return (
    <div className="bg-[url(/mainPage-bg.png)] bg-no-repeat bg-cover h-screen flex items-center">
      <div className="w-[960px] mx-auto flex justify-between">
        <div className="flex flex-col gap-14">
          <Image src={"/plane.png"} alt="plane" width={566} height={356} />
          <h1 className="font-bold text-[32px] text-center max-w-[430px] text-white">
            ЦФТ доставка - быстро, удобно, надежно!
          </h1>
        </div>

        <DeliveryForm points={points} packages={packages} />
      </div>
    </div>
  );
}

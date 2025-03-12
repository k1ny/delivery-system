"use client";

import { MapPin, Navigation } from "lucide-react";
import { DeliveryPoint } from "@/api/points";
import { DeliveryPackage } from "@/api/package";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { CitySelect } from "./city-select";
import { PackageFieldValue, PackageSelect } from "./package-select";

export type DeliveryFormValues = {
  departure: string;
  destination: string;
  package: PackageFieldValue;
};

export const defaultDeliveryFormValues: DeliveryFormValues = {
  departure: "",
  destination: "",
  package: {
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    name: "",
  },
};

export default function DeliveryForm({
  points,
  packages,
}: {
  points: DeliveryPoint[];
  packages: DeliveryPackage[];
}) {
  const { handleSubmit, control, reset } = useForm<DeliveryFormValues>({
    defaultValues: defaultDeliveryFormValues,
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <h2>Рассчитать доставку</h2>

      <Controller
        name="departure"
        control={control}
        rules={{ required: "Заполните поле!" }}
        render={({ field, fieldState }) => (
          <CitySelect
            icon={<MapPin />}
            points={points}
            label="Город отправки"
            error={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="destination"
        control={control}
        rules={{ required: "Заполните поле!" }}
        render={({ field, fieldState }) => (
          <CitySelect
            icon={<Navigation />}
            points={points}
            error={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            label="Город назначения"
          />
        )}
      />

      <Controller
        name="package"
        control={control}
        render={({ field }) => (
          <PackageSelect
            packages={packages}
            value={field.value}
            onChange={field.onChange}
            reset={() => reset({ package: defaultDeliveryFormValues.package })}
          />
        )}
      />

      <Button>Рассчитать</Button>
    </form>
  );
}

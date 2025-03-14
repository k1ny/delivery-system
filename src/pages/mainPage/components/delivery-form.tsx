"use client";

import { MapPin, Navigation } from "lucide-react";
import { DeliveryPoint } from "@/api/points";
import { DeliveryPackage } from "@/api/package";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { CitySelect } from "./city-select";
import { PackageFieldValue, PackageSelect } from "./package-select";
import { postCalc } from "@/api/calc";

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

export type DeliveryPostValues = {
  senderPoint: {
    latitude?: number;
    longitude?: number;
  };
  receiverPoint: {
    latitude?: number;
    longitude?: number;
  };
  package: PackageFieldValue;
};

export default function DeliveryForm({
  points,
  packages,
}: {
  points: DeliveryPoint[];
  packages: DeliveryPackage[];
}) {
  const { handleSubmit, control, reset, getValues } =
    useForm<DeliveryFormValues>({
      defaultValues: defaultDeliveryFormValues,
    });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const fileredData: DeliveryPostValues = {
          senderPoint: {
            latitude: points.find((point) => point.name === data.departure)
              ?.latitude,
            longitude: points.find((point) => point.name === data.departure)
              ?.longitude,
          },
          receiverPoint: {
            latitude: points.find((point) => point.name === data.destination)
              ?.latitude,
            longitude: points.find((point) => point.name === data.destination)
              ?.longitude,
          },
          package: {
            length: data.package.length,
            width: data.package.width,
            weight: data.package.weight,
            height: data.package.height,
          },
        };
        const response = postCalc(fileredData);
        console.log(response);
      })}
      className="bg-white rounded-3xl py-8 px-[72px] flex flex-col gap-6"
    >
      <h2 className="font-bold text-2xl">Рассчитать доставку</h2>

      <Controller
        name="departure"
        control={control}
        rules={{
          required: "Обязательное поле!",
          validate: (value) =>
            value !== getValues("destination") || "Города должны быть разными!",
        }}
        render={({ field, fieldState }) => (
          <CitySelect
            icon={<MapPin />}
            points={points}
            label="Город отправки"
            error={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            pointsIdButton={[2, 3, 12]}
          />
        )}
      />

      <Controller
        name="destination"
        control={control}
        rules={{ required: "Обязательное поле!" }}
        render={({ field, fieldState }) => (
          <CitySelect
            icon={<Navigation />}
            points={points}
            error={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
            label="Город назначения"
            pointsIdButton={[1, 3, 12]}
          />
        )}
      />

      <Controller
        name="package"
        control={control}
        rules={{
          validate: (obj) =>
            Object.values(obj).every((value) => value != 0) ||
            "Заполните размеры!",
        }}
        render={({ field, fieldState }) => (
          <PackageSelect
            packages={packages}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            reset={() =>
              reset((formValues) => ({
                ...formValues,
                package: defaultDeliveryFormValues.package,
              }))
            }
          />
        )}
      />

      <Button className="bg-blue-500 rounded-[32px] py-7 text-white font-semibold">
        Рассчитать
      </Button>
    </form>
  );
}

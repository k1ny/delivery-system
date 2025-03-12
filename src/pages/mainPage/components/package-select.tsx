"use client";
import { DeliveryPackage } from "@/api/package";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PackageParamInput } from "./package-param-input";

export type PackageFieldValue = {
  length: number;
  width: number;
  height: number;
  weight: number;
  name: string;
};

export const PackageSelect = ({
  packages,
  value,
  onChange,
  reset,
}: {
  packages: DeliveryPackage[];
  value: PackageFieldValue;
  onChange: (value: PackageFieldValue) => unknown;
  reset: () => unknown;
}) => {
  const [selectedTab, setSelectedTab] = useState<"rough" | "accurate">("rough");
  const { length, width, height, weight, name } = value;

  const packageInfo =
    !length && !width && !height && !weight
      ? "Выберите посылку"
      : `${name ? `${name}, ` : ""} ${length || 0}x${width || 0}x${height || 0} см, ${weight || 0} кг`;

  return (
    <div>
      <label>Размер посылки</label>
      <Popover>
        <PopoverTrigger className="flex w-[296px]">
          <div className="flex gap-1 items-center">
            <Mail className="w-5 h-5" />
            {packageInfo}
          </div>
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent>
          <Tabs
            value={selectedTab}
            onValueChange={(value) => {
              setSelectedTab(value as "rough" | "accurate");
              reset();
            }}
          >
            <TabsList>
              <TabsTrigger value="rough">Примерные</TabsTrigger>
              <TabsTrigger value="accurate">Точные</TabsTrigger>
            </TabsList>

            <TabsContent value="rough" className="flex flex-col">
              {packages.map(({ id, name, width, weight, height, length }) => (
                <Button
                  key={id}
                  value={name}
                  className="justify-start text-black hover:bg-blue-600 hover:text-white text-base transition duration-0"
                  onClick={() => {
                    onChange({ name, length, width, height, weight });
                  }}
                >
                  {`${name}, ${length}x${width}x${height} см`}
                </Button>
              ))}
            </TabsContent>

            <TabsContent
              value="accurate"
              className="flex flex-col gap-4 text-black"
            >
              <PackageParamInput
                label="Длина"
                placeholder="cм"
                value={length}
                onChangeValue={(length) => onChange({ ...value, length })}
              />
              <PackageParamInput
                label="Ширина"
                placeholder="cм"
                value={width}
                onChangeValue={(width) => onChange({ ...value, width })}
              />
              <PackageParamInput
                label="Высота"
                placeholder="cм"
                value={height}
                onChangeValue={(height) => onChange({ ...value, height })}
              />
              <PackageParamInput
                label="Вес"
                placeholder="cм"
                value={weight}
                onChangeValue={(weight) => onChange({ ...value, weight })}
              />
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

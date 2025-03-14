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
  name?: string;
};

export const PackageSelect = ({
  packages,
  value,
  onChange,
  reset,
  error,
}: {
  packages: DeliveryPackage[];
  value: PackageFieldValue;
  onChange: (value: PackageFieldValue) => unknown;
  reset: () => unknown;
  error?: string;
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
        <PopoverTrigger className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full">
          <div className="flex gap-1 items-center">
            <Mail className="w-5 h-5" />
            {packageInfo}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </PopoverTrigger>
        <PopoverContent>
          <Tabs
            value={selectedTab}
            onValueChange={(value) => {
              setSelectedTab(value as "rough" | "accurate");
              reset();
            }}
          >
            <TabsList className="w-full">
              <TabsTrigger className="flex-1" value="rough">
                Примерные
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="accurate">
                Точные
              </TabsTrigger>
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
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

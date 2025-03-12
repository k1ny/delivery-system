import { API_BASE_URL } from "@/config/env";

export interface DeliveryPackage {
  id: string;
  name: string;
  length: number;
  width: number;
  weight: number;
  height: number;
}

export const getPackahes = (): Promise<{
  success: true;
  packages: DeliveryPackage[];
}> =>
  fetch(`${API_BASE_URL}/delivery/package/types`, {
    method: "GET",
    cache: "force-cache",
  }).then((response) => response.json());

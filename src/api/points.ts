import { API_BASE_URL } from "@/config/env";

export interface DeliveryPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const getPoints = (): Promise<{
  success: true;
  points: DeliveryPoint[];
}> =>
  fetch(`${API_BASE_URL}/delivery/points`, {
    method: "GET",
    cache: "force-cache",
  }).then((response) => response.json());

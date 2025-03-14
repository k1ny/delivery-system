import { API_BASE_URL } from "@/config/env";
import { DeliveryFormValues } from "@/pages/mainPage/components/delivery-form";

export const postCalc = async (
  data: DeliveryFormValues,
): Promise<{
  success: boolean;
  reason?: string;
  options?: {
    id: string;
    price: number;
    days: number;
    name: string;
    type: string;
  }[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/delivery/calc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return { success: true, options: result.options };
    } else {
      return { success: false, reason: result.reason || "Неизвестная ошибка" };
    }
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return { success: false, reason: (error as Error).message };
  }
};

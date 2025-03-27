import { z } from "zod";

export const receiverSchema = z.object({
  receiver: z.object({
    lastname: z.string().min(1, "Введите фамилию"),
    firstname: z.string().min(1, "Введите имя"),
    middlename: z.string().optional(),
    phone: z
      .string()
      .length(11)
      .regex(/^\+?\d{11}$/, "Некорректный номер телефона"),
  }),
});

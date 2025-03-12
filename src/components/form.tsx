"use client";

import { huesosAction } from "@/actions/huesos";
import { useActionState } from "react";

export const Form = () => {
  const [error, submitAction, isPending] = useActionState(huesosAction, null);

  return (
    <form action={submitAction}>
      {isPending && "ЖДИ ХУЕСОС"}
      <button>ХУЕСОС</button>
    </form>
  );
};

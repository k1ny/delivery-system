import { DataCardLayout } from "./data-card-layout";
import { ValueWithLabel } from "./value-with-label";

export const name = {
  receiver: "Получатель",
  sender: "Отправитель",
  receiverAdress: "Куда доставить",
  senderAdress: "Откуда доставить",
};

export const DataCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-6">
      <DataCardLayout title="Получатель">
        <ValueWithLabel
          value={`${data.receiver.lastname} ${data.receiver.firstname} ${data.receiver.middlename}`}
          label="ФИО"
        />
        <ValueWithLabel value={data.receiver.phone} label="Телефон" />
      </DataCardLayout>

      <DataCardLayout title="Отправитель">
        <ValueWithLabel
          value={`${data.sender.lastname} ${data.sender.firstname} ${data.sender.middlename}`}
          label="ФИО"
        />
        <ValueWithLabel value={data.sender.phone} label="Телефон" />
      </DataCardLayout>

      <DataCardLayout title="Откуда забрать">
        <ValueWithLabel
          value={`ул. ${data.senderAdress.street}, д. ${data.senderAdress.house}`}
          label="Адрес"
        />
        <ValueWithLabel value={data.senderAdress.comment} label="Заметка" />
      </DataCardLayout>

      <DataCardLayout title="Куда доставить">
        <ValueWithLabel
          value={`ул. ${data.receiverAdress.street}, д. ${data.receiverAdress.house}`}
          label="Адрес"
        />
        <ValueWithLabel value={data.receiverAdress.comment} label="Заметка" />
      </DataCardLayout>
    </div>
  );
};

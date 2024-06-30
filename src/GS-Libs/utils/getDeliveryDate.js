import { DaysOfWeek, Months } from "../../config";

export const getDeliveryDate = () => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);

  const dayName = DaysOfWeek[deliveryDate.getDay()];
  const monthName = Months[deliveryDate.getMonth()];
  const date = deliveryDate.getDate();

  return `${dayName}, ${date} ${monthName}`;
};

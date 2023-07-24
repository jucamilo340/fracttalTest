import { format } from "date-fns";
export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const formattedDate = format(date, "dd/MM/yy");
    return formattedDate;
  };
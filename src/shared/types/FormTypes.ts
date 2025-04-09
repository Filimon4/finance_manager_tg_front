export enum FormType {
  category,
  account,
  operations,
  reminder,
  edit_reminder
}

export type InputTypes = "number" | "date" | "text" | "operation" | "list" | 'boolean' | 'day_time' | "none";

export type FromConfig = {
  [k in FormType]: {
    title: string;
    items: {
      id: string;
      inputType: InputTypes;
      title?: string;
      placeholder?: string;
      listItems?: {
        id: string | number;
        item: string;
      }[];
    }[];
  };
};

export enum TransactionType {
  EXPENSIVE = 'expensive',
  INCOME = 'income',
  TRANSFER = 'transfer'
}

export enum OperationType {
    INCOME = "income",
    EXPENSIVE = "expensive",
    TRANSFER = "transfer",
}

export enum DayOfWeek {
    Mon = "mon",
    Tue = "tue",
    Wed = "wed",
    Thu = "thu",
    Fri = "fri",
    Sat = "sat",
    Sun = "sun",
}

export const ListDaysOfWeek = [
  { id: "mon", label: "Пн"},
  { id: "tue", label: "Вт"},
  { id: "wed", label: "Ср"},
  { id: "thu", label: "Чт"},
  { id: "fri", label: "Пт"},
  { id: "sat", label: "Сб"},
  { id: "sun", label: "Вс"}
] as const;

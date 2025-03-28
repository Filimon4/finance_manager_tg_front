export enum FormType {
  category,
  account,
  operations,
}

export type InputTypes = "number" | "date" | "text" | "operation" | "list";

export type FromConfig = {
  [k in FormType]: {
    title: string;
    items: {
      id: string;
      inputType: InputTypes;
      placeholder?: string;
      listItems?: {
        id: string | number;
        item: string;
      }[];
    }[];
  };
};

export enum EOperations {
  income = "income",
  expense = "expense",
}

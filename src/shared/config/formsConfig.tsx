import { FormType, FromConfig } from "@shared/types/FormTypes";

export const FormsCofnig: FromConfig = {
  [FormType.account]: {
    title: "Счет",
    items: [
      { id: "account_id", inputType: "none" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "currency_id", inputType: "list", placeholder: "Валюта" },
    ],
  },
  [FormType.category]: {
    title: "Категория",
    items: [
      { id: "base_type", inputType: "operation" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "account_id", inputType: "none" },
    ],
  },
  [FormType.operations]: {
    title: "Операция",
    items: [
      { id: "type", inputType: "operation" },
      { id: "amount", inputType: "number", placeholder: "Сумма" },
      { id: "cash_account_id", inputType: "list", placeholder: "Счет", listItems: [] },
      {
        id: "category_id",
        inputType: "list",
        placeholder: "Категории",
        listItems: [],
      },
      { id: "description", inputType: "text", placeholder: "Примечание" },
      { id: "date", inputType: "date" },
      { id: 'to_cash_account_id', inputType: 'none'}
    ],
  },
};

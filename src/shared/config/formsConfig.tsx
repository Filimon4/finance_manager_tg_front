import { FormType, FromConfig } from "@shared/types/FormTypes";

export const FormsConfig: FromConfig = {
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
      {
        id: "cash_account_id",
        inputType: "list",
        placeholder: "Счет",
        listItems: [],
      },
      {
        id: "category_id",
        inputType: "list",
        placeholder: "Категории",
        listItems: [],
      },
      { id: "description", inputType: "text", placeholder: "Примечание" },
      { id: "date", inputType: "date" },
      { id: "to_cash_account_id", inputType: "none" },
    ],
  },
  [FormType.reminder]: {
    title: "Напоминание",
    items: [
      { id: "account_id", inputType: "none" },
      { id: "day_of_week", inputType: "list", placeholder: "День недели" },
      { id: "hour", inputType: 'day_time' },
      { id: "is_active", inputType: 'boolean' },
    ]
  },
  [FormType.edit_reminder]: {
    title: "Изминение напоминаний",
    items: [
      { id: "id", inputType: "none" },
      { id: "day_of_week", inputType: "list", placeholder: "День недели" },
      { id: "hour", inputType: 'day_time' },
      { id: "is_active", inputType: 'boolean' },
    ]
  }
};
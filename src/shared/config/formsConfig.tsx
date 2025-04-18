import { FormType, FromConfig } from "@shared/types/FormTypes";

export const FormsConfig: FromConfig = {
  [FormType.account]: {
    title: "Новый счет",
    items: [
      { id: "account_id", inputType: "none" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "currency_id", inputType: "list", placeholder: "Валюта" },
    ],
  },
  [FormType.edit_account]: {
    title: "Изменить счет",
    items: [
      { id: "id", inputType: "none" },
      { id: "name", inputType: "text", placeholder: "Название" },
    ],
  },
  [FormType.category]: {
    title: "Новая категория",
    items: [
      { id: "base_type", inputType: "operation" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "account_id", inputType: "none" },
    ],
  },
  [FormType.edit_category]: {
    title: "Изменить категорию",
    items: [
      { id: "id", inputType: "none" },
      { id: "base_type", inputType: "operation" },
      { id: "name", inputType: "text", placeholder: "Название" },
    ],
  },
  [FormType.operations]: {
    title: "Новая операция",
    items: [
      { id: "type", inputType: "operation" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "amount", inputType: "number", placeholder: "Сумма" },
      {
        id: "cash_account_id",
        inputType: "list",
        placeholder: "Счет",
        listItems: [],
      },
      {
        id: "to_cash_account_id",
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
    ],
  },
  [FormType.edit_operation]: {
    title: "Изменить операцию",
    items: [
      { id: "type", inputType: "operation" },
      { id: "id", inputType: "none" },
      { id: "name", inputType: "text", placeholder: "Название" },
      { id: "amount", inputType: "number", placeholder: "Сумма" },
      { id: "description", inputType: "text", placeholder: "Примечание" },
      {
        id: "cash_account_id",
        inputType: "list",
        placeholder: "Счет",
        listItems: [],
      },
      {
        id: "to_cash_account_id",
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
      { id: "date", inputType: "date" },
    ],
  },
  [FormType.reminder]: {
    title: "Новое напоминание",
    items: [
      { id: "account_id", inputType: "none" },
      { id: "day_of_week", inputType: "list", placeholder: "День недели" },
      { id: "hour", inputType: "day_time" },
      { id: "is_active", inputType: "boolean" },
    ],
  },
  [FormType.edit_reminder]: {
    title: "Изменить напоминание",
    items: [
      { id: "id", inputType: "none" },
      { id: "day_of_week", inputType: "list", placeholder: "День недели" },
      { id: "hour", inputType: "day_time" },
      { id: "is_active", inputType: "boolean" },
    ],
  },
};

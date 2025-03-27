export enum ToolbarCategories {
  overview = "overview",
  history = "history",
  summary = "summary",
  accounts = "accounts",
}

export const ToolbarCategoriesNames: {
  [k in ToolbarCategories]: string;
} = {
  [ToolbarCategories.overview]: "Обзор",
  [ToolbarCategories.accounts]: "Счета",
  [ToolbarCategories.history]: "История",
  [ToolbarCategories.summary]: "Резюме",
};

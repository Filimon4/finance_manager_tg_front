import { useToolbarCategory } from "@shared/contexts/ToolbarCategory/useToolbarCategory";
import {
  ToolbarCategories,
  ToolbarCategoriesNames,
} from "@shared/types/Toolbar";

export const ToolCategories = () => {
  const { currentCategory, setCurrentCategory } = useToolbarCategory();

  return (
    <div className="flex flex-row justify-between items-center px-4 cursor-pointer">
      {Object.entries(ToolbarCategoriesNames).map(([category, name], i) => (
        <div
          key={i}
          className={`
          text-black p-1 m-1
          relative
          ${
            currentCategory === category
              ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-black"
              : ""
          }
        `}
          onClick={() => setCurrentCategory(category as ToolbarCategories)}
        >
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

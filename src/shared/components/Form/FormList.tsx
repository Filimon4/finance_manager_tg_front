import React, { FC, useState } from "react";
import BoxInfo from "../Info/BoxInfo/BoxInfo";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface FormListProps {
  items: { id: number | string; name: string }[];
  placeholder: string;
  value: number | string;
  setValue: React.Dispatch<React.SetStateAction<number | string>>;
}

const FormList: FC<FormListProps> = ({
  items,
  placeholder,
  value,
  setValue,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const selectedValues = items.find((i) => i.id == value);

  return (
    <div className="relative">
      <BoxInfo style="squre">
        <div className="flex justify-between px-2 items-center h-full">
          <div className="select-none">
            {!selectedValues ? placeholder : selectedValues.name}
          </div>
          <div
            className="h-full w-[40px] flex justify-center items-center cursor-pointer"
            onClick={() => setOpened(!opened)}
          >
            {!opened ? (
              <>
                <MdOutlineKeyboardArrowDown size={30} />
              </>
            ) : (
              <>
                <MdOutlineKeyboardArrowUp size={30} />
              </>
            )}
          </div>
        </div>
      </BoxInfo>
      {opened && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  index !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onClick={() => {
                  setValue(item.id);
                  setOpened(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormList;

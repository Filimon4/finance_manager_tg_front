import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";
import BoxInfo from "../Info/BoxInfo/BoxInfo";
import { ModalContainer } from "../containers/ModalContainer/ModalContainer";
import useClickOutside from "@shared/hooks/useClickOutside";

export const FormDatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({
    onClick: () => {
      setIsOpen(false);
    },
  });

  const handleSelectToday = () => {
    const today = new Date();
    setSelected(today);
    setIsOpen(false);
  };

  return (
    <>
      <BoxInfo style="squre">
        <div className="w-full h-full flex justify-between items-center px-4">
          <span>
            {selected ? selected.toLocaleDateString() : "Дата не выбрана"}
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
          >
            <FaCalendarAlt className="w-5 h-5" />
          </button>
        </div>
      </BoxInfo>

      <ModalContainer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ref={modalRef as unknown as React.RefObject<HTMLElement>}
      >
        <div className="flex flex-col justify-center items-center">
          <DayPicker
            locale={ru}
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              setIsOpen(false);
            }}
            className="border-0"
            styles={{
              caption: { color: "#3b82f6" },
            }}
          />
          <button
            onClick={handleSelectToday}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Выбрать сегодня
          </button>
        </div>
      </ModalContainer>
    </>
  );
};

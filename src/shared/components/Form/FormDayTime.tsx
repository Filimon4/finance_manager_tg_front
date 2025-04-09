import { FC, useState } from "react";
import BoxInfo from "../Info/BoxInfo/BoxInfo";
import { ModalContainer } from "../containers/ModalContainer/ModalContainer";
import useClickOutside from "@shared/hooks/useClickOutside";
import { FaClock } from "react-icons/fa";

interface FormDayTimeProps {
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const FormDayTime: FC<FormDayTimeProps> = ({setValue, title, value}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ 
    onClick: () => setIsOpen(false) 
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <BoxInfo style="squre">
        <div className="w-full h-full flex justify-between items-center px-4">
          <span>
            {value ? `${value}:00` : "Время не выбрано"}
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
          >
            <FaClock className="w-5 h-5" />
          </button>
        </div>
      </BoxInfo>

      <ModalContainer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ref={modalRef as unknown as React.RefObject<HTMLElement>}
      >
        <div className="p-4">
          <h3 className="text-lg font-medium text-center mb-4">{title}</h3>
          <div className="grid grid-cols-4 gap-2">
            {hours.map((hour) => (
              <button
                key={hour}
                onClick={() => {
                  setValue(+hour);
                  setIsOpen(false);
                }}
                className={`py-2 px-3 rounded-md transition-colors ${
                  +value === hour
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {hour}:00
              </button>
            ))}
          </div>
        </div>
      </ModalContainer>
    </>
  );
};
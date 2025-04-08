import { FC } from "react";
import BoxInfo from "../Info/BoxInfo/BoxInfo";

interface FormBooleanProps {
  title: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormBoolean: FC<FormBooleanProps> = ({ value, setValue, title }) => {
  return (
    <BoxInfo style="squre">
      <div className="flex justify-between items-center w-full h-full px-4">
        <span className="text-gray-800 ">{title}</span>
        <div
          onClick={() => setValue(!value)}
          className={`
            w-5 h-5 rounded-full cursor-pointer transition-colors duration-300
            ${value ? "bg-green-500" : "bg-red-500"}
          `}
        />
      </div>
    </BoxInfo>
  );
};

export default FormBoolean;

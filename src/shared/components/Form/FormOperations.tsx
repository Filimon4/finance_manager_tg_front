import React, { FC } from "react";
import BoxInfo from "../Info/BoxInfo/MoneyInfo";
import { EOperations } from "@shared/types/FormTypes";

interface FormOperationsProps {
  value: EOperations;
  setValue: React.Dispatch<React.SetStateAction<EOperations>>;
}

const FormOperations: FC<FormOperationsProps> = ({ setValue, value }) => {
  return (
    <BoxInfo style="squre">
      <div className="flex flex-row justify-between items-center h-full w-full select-none">
        <div
          className={`w-full h-full self-center flex flex-row items-center justify-center flex-1 cursor-pointer p-2 transition-colors rounded-2xl ${
            value === EOperations.expense && "bg-gray-100"
          }`}
          onClick={() => setValue(EOperations.expense)}
        >
          <img src="" alt="" />
          <p>Расход</p>
        </div>
        <div
          className={`w-full h-full self-center flex flex-row items-center justify-center flex-1 cursor-pointer p-2 transition-colors rounded-2xl ${
            value === EOperations.income && "bg-gray-100"
          }`}
          onClick={() => setValue(EOperations.income)}
        >
          <img src="" alt="" />
          <p>Доход</p>
        </div>
      </div>
    </BoxInfo>
  );
};

export default FormOperations;

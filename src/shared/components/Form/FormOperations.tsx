import React, { FC } from "react";
import BoxInfo from "../Info/BoxInfo/BoxInfo";
import { TransactionType } from "@shared/types/FormTypes";

interface FormOperationsProps {
  value: TransactionType;
  setValue: React.Dispatch<React.SetStateAction<TransactionType>>;
}

const FormOperations: FC<FormOperationsProps> = ({ setValue, value }) => {
  return (
    <BoxInfo style="squre">
      <div className="flex flex-row justify-between items-center h-full w-full select-none">
        <div
          className={`w-full h-full self-center flex flex-row items-center justify-center flex-1 cursor-pointer p-2 transition-colors rounded-2xl ${
            value === TransactionType.EXPENSIVE && "bg-gray-100"
          }`}
          onClick={() => setValue(TransactionType.EXPENSIVE)}
        >
          <img src="123" alt="" />
          <p>Расход</p>
        </div>
        <div
          className={`w-full h-full self-center flex flex-row items-center justify-center flex-1 cursor-pointer p-2 transition-colors rounded-2xl ${
            value === TransactionType.INCOME && "bg-gray-100"
          }`}
          onClick={() => setValue(TransactionType.INCOME)}
        >
          <img src="123" alt="" />
          <p>Доход</p>
        </div>
      </div>
    </BoxInfo>
  );
};

export default FormOperations;

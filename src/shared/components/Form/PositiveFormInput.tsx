import { FC } from "react";
import BoxInfo from "../Info/BoxInfo/BoxInfo";

interface PositiveFormInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder: string;
}

const PositiveFormInput: FC<PositiveFormInputProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    console.log(isNaN(+inputValue));

    const inputNumber = Number(inputValue);
    if (isNaN(inputNumber) || inputNumber < 0) return;
    setValue(inputValue);
  };
  return (
    <BoxInfo style="squre">
      <input
        className="outline-0 w-full h-full text-black text-lg p-5 select-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={"text"}
        inputMode="decimal"
        min="0"
      />
    </BoxInfo>
  );
};

export default PositiveFormInput;

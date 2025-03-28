import { FC } from "react";
import BoxInfo from "../Info/BoxInfo/MoneyInfo";

interface FormInputProps {
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder: string;
}

const FormInput: FC<FormInputProps> = ({
  value,
  setValue,
  placeholder,
  type,
}) => {
  return (
    <BoxInfo style="squre">
      <input
        className="outline-0 w-full h-full text-black text-lg p-5 "
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        type={type}
      />
    </BoxInfo>
  );
};

export default FormInput;

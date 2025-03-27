import ButtonSqureContainer from "../containers/Buttons/ButtonSqureContainer";

const FormInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder: string;
}) => {
  return (
    <ButtonSqureContainer>
      <input
        className="outline-0 w-full h-full text-black p-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        type="text"
      />
    </ButtonSqureContainer>
  );
};

export default FormInput;

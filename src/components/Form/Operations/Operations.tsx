import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import FormInput from "@shared/components/Form/FormInput";
import { FormsCofnig } from "@shared/config/formsConfig";
import { FormType } from "@shared/types/FormTypes";
import { useState } from "react";

const Operation = () => {
  const config = FormsCofnig[FormType.operations];

  const [formData, setFormData] = useState<Record<string, any>>(
    config.items.reduce((acc, item) => {
      acc[`${item.id}`] = "";
      return acc;
    }, {} as Record<string, any>)
  );

  const onFormChange = (fieldName: string, value: any) => {
    console.log("onFormChange: ", fieldName, value);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex flex-2 pl-8 items-end w-full">
        <h1 className="pb-7 text-3xl">{config.title}</h1>
      </div>
      <div className="h-full w-full flex flex-col flex-8 gap-1">
        <WhitePanelContainer>
          <div className="p-4 flex flex-col justify-between h-full">
            <div className="space-y-4">
              {config.items.map((item, index) => (
                <div key={index} className="mb-4">
                  {["number", "text"].includes(item.inputType) && (
                    <>
                      <FormInput
                        placeholder={item.placeholder ?? ""}
                        setValue={(v) => onFormChange(item.id, v)}
                        type={item.inputType}
                        value={formData[`${item.id}`] || ""}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <CallbackButton
              style="round"
              callback={() => console.log("callback account")}
            >
              <div className="flex w-full justify-center items-center cursor-pointer">
                <p>Добавить</p>
              </div>
            </CallbackButton>
          </div>
        </WhitePanelContainer>
      </div>
    </div>
  );
};

export default Operation;

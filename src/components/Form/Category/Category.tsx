import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import FormInput from "@shared/components/Form/FormInput";
import FormOperatonCategory from "@shared/components/Form/FormOperatonCategory";
import { FormsConfig } from "@shared/config/formsConfig";
import { FormType } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const config = FormsConfig[FormType.category];

  const [formData, setFormData] = useState<Record<string, any>>(
    config.items.reduce((acc, item) => {
      acc[`${item.id}`] = null;
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

  const createCategoryMutation = useMutation({
    mutationFn: async (newCategory: typeof formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories`,
        newCategory
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      setFormData({
        id: null,
        cash_account_id: null,
        to_cash_account_id: null,
        category_id: null,
        amount: null,
        description: null,
        type: null,
      });
      navigate(ERoutes.main);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });


  const handleSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.account_id = window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150;
    createCategoryMutation.mutate(operationData);
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
                  {["number", "text"].includes(item.inputType) ? (
                    <>
                      <FormInput
                        placeholder={item.placeholder ?? ""}
                        setValue={(v) => onFormChange(item.id, v)}
                        type={item.inputType}
                        value={formData[`${item.id}`] || ""}
                      />
                    </>
                  ) : ["operation"].includes(item.inputType) ? (
                    <>
                      <FormOperatonCategory
                        setValue={(v) => onFormChange(item.id, v)}
                        value={formData[`${item.id}`] || ""}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <CallbackButton style="round" callback={handleSubmit}>
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

export default Category;

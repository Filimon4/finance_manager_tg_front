import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { FormDatePicker } from "@shared/components/Form/FormDatePicker";
import FormInput from "@shared/components/Form/FormInput";
import FormList from "@shared/components/Form/FormList";
import FormOperations from "@shared/components/Form/FormOperations";
import { FormsCofnig } from "@shared/config/formsConfig";
import { FormType } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const config = FormsCofnig[FormType.account];

  const [formData, setFormData] = useState<Record<string, any>>(
    config.items.reduce((acc, item) => {
      acc[`${item.id}`] = null;
      return acc;
    }, {} as Record<string, any>)
  );

  const onFormChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const createAccountMutation = useMutation({
    mutationFn: async (newCashAccount: typeof formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/create`,
        newCashAccount
      );
      return response.data;
    },
    onSuccess: () => {
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

  const { data: allCurrencies } = useQuery({
    queryKey: ["allCurrencies"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/currencies/all`
      );
      return res;
    },
    staleTime: 1200000,
  });

  const handleSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.account_id = 1289261150;

    if (operationData.currency_id) {
      operationData.currency_id =
        allCurrencies?.data?.all.find(
          (t: any) => t.code === operationData.currency_id
        ).id || null;
    }
    createAccountMutation.mutate(operationData);
  };

  const getItemsForField = (fieldId: string) => {
    if (fieldId === "currency_id") {
      return allCurrencies?.data?.all.map((t: any) => t?.code || "none") || [];
    }
    return [];
  };

  return (
    <div className="flex flex-col h-full py-5 text-lg">
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
                      <FormOperations
                        setValue={(v) => onFormChange(item.id, v)}
                        value={formData[`${item.id}`] || ""}
                      />
                    </>
                  ) : ["list"].includes(item.inputType) ? (
                    <>
                      <FormList
                        setValue={(v) => {
                          console.log(JSON.stringify(v, null, 2));
                          onFormChange(item.id, v);
                        }}
                        value={formData[item.id] || ""}
                        items={getItemsForField(item.id)}
                        placeholder={String(item.placeholder)}
                      />
                    </>
                  ) : ["date"].includes(item.inputType) ? (
                    <>
                      <FormDatePicker />
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

export default Account;

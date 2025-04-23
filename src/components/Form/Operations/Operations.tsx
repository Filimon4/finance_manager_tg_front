import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { FormDatePicker } from "@shared/components/Form/FormDatePicker";
import FormInput from "@shared/components/Form/FormInput";
import FormList from "@shared/components/Form/FormList";
import FormOperations from "@shared/components/Form/FormOperations";
import PositiveFormInput from "@shared/components/Form/PositiveFormInput";
import { FormsConfig } from "@shared/config/formsConfig";
import { FormType, TransactionType } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Operation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = FormsConfig[FormType.operations];

  const [formData, setFormData] = useState<Record<string, any>>(
    config.items.reduce((acc, item) => {
      acc[`${item.id}`] = null;
      return acc;
    }, {} as Record<string, any>)
  );

  const onFormChange = (fieldName: string, value: any) => {
    if (fieldName == "type") {
      setFormData((prev) => ({
        ...prev,
        category_id: null,
        to_cash_account_id: null,
        [fieldName]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const createOperationMutation = useMutation({
    mutationFn: async (newOperation: typeof formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/operations`,
        newOperation
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["operations"] });
      queryClient.refetchQueries({ queryKey: ["balance"] });
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["cashAccounts"] });
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

  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories/all`,
        {
          params: {
            tg_id: window?.Telegram.WebApp.initDataUnsafe?.user?.id || null,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  const { data: allCashAccounts } = useQuery({
    queryKey: ["allCashAccounts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/cash_accounts/all`,
        {
          params: {
            tg_id: window?.Telegram.WebApp.initDataUnsafe?.user?.id || null,
          },
        }
      );
      return res;
    },
    staleTime: 30000,
  });

  const getItemsForField = (fieldId: string) => {
    if (fieldId === "cash_account_id" || fieldId === "to_cash_account_id") {
      return (
        allCashAccounts?.data?.all.map((t: any) => ({
          id: t.id,
          name: t?.name,
        })) || []
      );
    }
    if (fieldId === "category_id") {
      return (
        allCategories?.data?.all.map((t: any) => ({
          id: t.id,
          name: t.name,
        })) || []
      );
    }
    return [];
  };

  const handleSubmit = () => {
    const operationData = structuredClone(formData);
    if (isNaN(operationData.amount)) return;
    operationData.amount = Number(operationData.amount);
    operationData.date = operationData.date
      ? operationData.date
      : new Date().toJSON();

    operationData.account_id =
      window?.Telegram.WebApp.initDataUnsafe?.user?.id || null;

    createOperationMutation.mutate(operationData);
  };

  const getVisibleFields = () => {
    const { type } = formData;

    if (type === TransactionType.TRANSFER) {
      return config.items.filter(
        (item) =>
          item.id === "name" ||
          item.id === "type" ||
          item.id === "amount" ||
          item.id === "cash_account_id" ||
          item.id === "to_cash_account_id" ||
          item.id === "description" ||
          item.id === "date"
      );
    } else {
      return config.items.filter(
        (item) =>
          item.id === "name" ||
          item.id === "type" ||
          item.id === "amount" ||
          item.id === "cash_account_id" ||
          item.id === "category_id" ||
          item.id === "description" ||
          item.id === "date"
      );
    }
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
              {getVisibleFields().map((item, index) => (
                <div key={index} className="mb-4">
                  {["text"].includes(item.inputType) ? (
                    <>
                      <>
                        <FormInput
                          placeholder={item.placeholder ?? ""}
                          setValue={(v) => onFormChange(item.id, v)}
                          type={item.inputType}
                          value={formData[`${item.id}`] || ""}
                        />
                      </>
                    </>
                  ) : ["number"].includes(item.inputType) ? (
                    <>
                      <PositiveFormInput
                        placeholder={item.placeholder ?? ""}
                        setValue={(v) => onFormChange(item.id, v)}
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
                          onFormChange(item.id, v);
                        }}
                        value={formData[item.id] || ""}
                        items={getItemsForField(item.id)}
                        placeholder={String(item.placeholder)}
                      />
                    </>
                  ) : ["date"].includes(item.inputType) ? (
                    <>
                      <FormDatePicker
                        setValue={(v) => onFormChange(item.id, v)}
                        value={formData[`${item.id}`] || null}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <CallbackButton
              style="round"
              callback={handleSubmit}
              disabled={createOperationMutation.isPending}
            >
              <div className="flex w-full justify-center items-center cursor-pointer">
                <p>
                  {createOperationMutation.isPending
                    ? "Добавление..."
                    : "Добавить"}
                </p>
              </div>
            </CallbackButton>
          </div>
        </WhitePanelContainer>
      </div>
    </div>
  );
};

export default Operation;

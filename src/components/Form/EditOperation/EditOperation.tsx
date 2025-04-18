import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { FormDatePicker } from "@shared/components/Form/FormDatePicker";
import FormInput from "@shared/components/Form/FormInput";
import FormList from "@shared/components/Form/FormList";
import FormOperations from "@shared/components/Form/FormOperations";
import PositiveFormInput from "@shared/components/Form/PositiveFormInput";
import { FormsConfig } from "@shared/config/formsConfig";
import {
  FormType,
  OperationType,
  TransactionType,
} from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditOperation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const config = FormsConfig[FormType.edit_operation];

  const { state } = useLocation();
  const { id: currentOperationId } = state;

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

  const updateOperation = useMutation({
    mutationFn: async (newOperation: typeof formData) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACK_END_URL}/api/operations`,
        newOperation
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["operations"],
      });
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["cashAccounts"] });
      setFormData({
        id: null,
        name: null,
        amount: null,
        description: null,
        date: null,
        type: null,
        cash_account_id: null,
        to_cash_account_id: null,
        category_id: null,
      });
      navigate(ERoutes.main);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const deleteOperations = useMutation({
    mutationFn: async (operation: typeof formData) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACK_END_URL}/api/operations`,
        {
          method: "delete",
          params: {
            id: operation.id,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["operations"],
      });
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["cashAccounts"] });
      setFormData({
        id: null,
        name: null,
        amount: null,
        description: null,
        date: null,
        type: null,
        cash_account_id: null,
        to_cash_account_id: null,
        category_id: null,
      });
      navigate(ERoutes.main);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const {
    data: currentOperation,
    isSuccess: currCategoryIsSuccess,
    refetch: refetchCurrentOperation,
  } = useQuery<{
    data: { operation: any };
  }>({
    queryKey: ["currentOperations"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/api/operations/${currentOperationId}`
      );
      return res;
    },
    enabled: false
  });

  useEffect(() => {
    if (
      !currCategoryIsSuccess ||
      !currentOperation ||
      !("data" in currentOperation) ||
      !("operation" in currentOperation.data)
    )
      return;
    const operation = currentOperation.data.operation;
    console.log(JSON.stringify(operation, null, 2));
    setFormData({
      id: operation?.id,
      name: operation?.name,
      amount: operation?.amount,
      description: operation?.description,
      date: new Date(operation?.created_at),
      type:
        operation.type === "INCOME"
          ? OperationType.INCOME
          : operation.type === "EXPENSIVE"
          ? OperationType.EXPENSIVE
          : OperationType.TRANSFER,
      cash_account_id: operation.cash_account_id,
      to_cash_account_id: operation.to_cash_account_id,
      category_id: operation.category_id,
    });
  }, [currCategoryIsSuccess]);

  useEffect(() => {
    setFormData({
      id: null,
      name: null,
      amount: null,
      description: null,
      date: null,
      type: null,
      cash_account_id: null,
      to_cash_account_id: null,
      category_id: null,
    });
    queryClient.resetQueries({ queryKey: ["currentOperations"] });
    refetchCurrentOperation();
  }, [currentOperationId]);

  const handleDeleteSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.id = currentOperationId;
    deleteOperations.mutate(operationData);
  };

  const handleUpdateSubmit = () => {
    const operationData = structuredClone(formData);
    if (isNaN(operationData.amount)) return;
    operationData.id = currentOperationId;
    updateOperation.mutate(operationData);
  };

  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories/all`,
        {
          params: {
            tg_id:
              window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150,
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
            tg_id:
              window?.Telegram.WebApp.initDataUnsafe?.user?.id || 1289261150,
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
          id: t?.id,
          name: t?.name,
        })) || []
      );
    }
    if (fieldId === "category_id") {
      return (
        allCategories?.data?.all.map((t: any) => ({
          id: t?.id,
          name: t?.name,
        })) || []
      );
    }
    return [];
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
                        setValue={(v) => {
                          setFormData({
                            ...formData,
                            to_cash_account_id: null,
                            category_id: null,
                          });
                          onFormChange(item.id, v);
                        }}
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
            <div className="flex flex-col justify-center gap-5">
              <CallbackButton style="round" callback={handleDeleteSubmit}>
                <div className="flex w-full justify-center items-center cursor-pointer">
                  <p>Удалить</p>
                </div>
              </CallbackButton>
              <CallbackButton style="round" callback={handleUpdateSubmit}>
                <div className="flex w-full justify-center items-center cursor-pointer">
                  <p>Сохранить</p>
                </div>
              </CallbackButton>
            </div>
          </div>
        </WhitePanelContainer>
      </div>
    </div>
  );
};

export default EditOperation;

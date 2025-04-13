import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import FormInput from "@shared/components/Form/FormInput";
import FormOperatonCategory from "@shared/components/Form/FormOperatonCategory";
import { FormsConfig } from "@shared/config/formsConfig";
import { FormType, TransactionType } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Category = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const config = FormsConfig[FormType.edit_category];

  const { state } = useLocation();
  const { id: currentCategoryId } = state;

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

  const updateCashAccount = useMutation({
    mutationFn: async (newCashAccount: typeof formData) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories`,
        newCashAccount
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "currentCashAccount"],
      });
      setFormData({
        id: null,
        base_type: null,
        name: null,
      });
      navigate(ERoutes.main);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const deleteCashAccount = useMutation({
    mutationFn: async (newCashAccount: typeof formData) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories`,
        { data: newCashAccount }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "currentCashAccount"],
      });
      setFormData({
        id: null,
        base_type: null,
        name: null,
      });
      navigate(ERoutes.main);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const { data: currentCategory, isSuccess: currCategoryIsSuccess } = useQuery<{
    data: { category: any };
  }>({
    queryKey: ["currentCashAccount"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/api/categories/${currentCategoryId}`
      );
      return res;
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    if (!currCategoryIsSuccess) return;
    const category = currentCategory.data.category;
    console.log(JSON.stringify(category, null, 2));
    setFormData({
      id: category.id,
      base_type: category.base_type == 'EXPENSIVE' ? TransactionType.EXPENSIVE : TransactionType.INCOME,
      name: category.name,
    });
  }, [currCategoryIsSuccess]);

  const handleDeleteSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.id = currentCategoryId;
    deleteCashAccount.mutate(operationData);
  };

  const handleUpdateSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.id = currentCategoryId;
    updateCashAccount.mutate(operationData);
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

export default Category;

import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import { FormDayTime } from "@shared/components/Form/FormDayTime";
import FormList from "@shared/components/Form/FormList";
import { FormsConfig } from "@shared/config/formsConfig";
import { FormType, ListDaysOfWeek } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reminder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = FormsConfig[FormType.reminder];

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

  const createReminderMutation = useMutation({
    mutationFn: async (newReminder: typeof formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/reminders`,
        newReminder
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      setFormData({
        id: null,
        cash_account_id: null,
        to_cash_account_id: null,
        category_id: null,
        amount: null,
        description: null,
        type: null,
      });
      navigate(ERoutes.reminders);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const getItemsForField = (fieldId: string) => {
    if (fieldId == "day_id") {
      return ListDaysOfWeek.map((t) => t.label);
    }
    return [];
  };

  const handleSubmit = () => {
    const operationData = structuredClone(formData);
    operationData.id = 1289261150;

    createReminderMutation.mutate(operationData);
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
                  {["list"].includes(item.inputType) ? (
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
                  ) : ["day_time"].includes(item.inputType) ? (
                    <>
                      <FormDayTime />
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
              disabled={createReminderMutation.isPending}
            >
              <div className="flex w-full justify-center items-center cursor-pointer">
                <p>
                  {createReminderMutation.isPending
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

export default Reminder;

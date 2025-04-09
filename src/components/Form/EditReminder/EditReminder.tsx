import CallbackButton from "@shared/components/Buttons/CallbackButton/CallbackButton";
import WhitePanelContainer from "@shared/components/containers/WhitePanelContainer/WhitePanelContainer";
import FormBoolean from "@shared/components/Form/FormBoolean";
import { FormDayTime } from "@shared/components/Form/FormDayTime";
import FormList from "@shared/components/Form/FormList";
import { FormsConfig } from "@shared/config/formsConfig";
import { FormType, ListDaysOfWeek } from "@shared/types/FormTypes";
import { ERoutes } from "@shared/types/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditReminder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = FormsConfig[FormType.edit_reminder];

  const { id: currentReminderId } = state;

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


  const deleteReminderMutation = useMutation({
    mutationFn: async (reminder: typeof formData) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACK_END_URL}/api/reminders`,
        reminder
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      setFormData({
        id: null,
        day_of_week: null,
        hour: null,
        is_active: null,
      });
      navigate(ERoutes.reminders);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const changeReminderMutation = useMutation({
    mutationFn: async (reminder: typeof formData) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACK_END_URL}/api/reminders`,
        reminder
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      setFormData({
        account_id: null,
        day_of_week: null,
        hour: null,
        is_active: null,
      });
      navigate(ERoutes.reminders);
    },
    onError: (error) => {
      console.error("Error creating operation:", error);
    },
  });

  const { data: currentReminder, isSuccess: currReminderIsSuccess } = useQuery<any>({
    queryKey: ["currentReminder"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/reminders/one`,
        {
          params: {
            id: currentReminderId,
          },
        }
      );
      return res;
    },
  });

  useEffect(() => {
    if (!currReminderIsSuccess) return
    const reminder = currentReminder.data.reminder
    setFormData({
      id: +(reminder.id),
      day_of_week: ListDaysOfWeek.find(d => d.id == String(reminder.day_of_week).toLowerCase())?.label,
      hour: +(reminder.hour),
      is_active: reminder.is_active,
    });
  }, [currReminderIsSuccess])

  const getItemsForField = (fieldId: string) => {
    if (fieldId == "day_of_week") {
      return ListDaysOfWeek.map((t) => t.label);
    }
    return [];
  };

  const handleDeleteSubmit = () => {
    deleteReminderMutation.mutate({ id: currentReminderId });
  };
  
  const handleChangeSubmit = () => {
    if (!currentReminder) return
    const operationData = structuredClone(formData);
    operationData.id = currentReminderId
    operationData.hour = `${operationData.hour}`
    operationData.day_of_week = ListDaysOfWeek.find(d => d.label == operationData.day_of_week)?.id || null
    changeReminderMutation.mutate(operationData)
  }

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
                      <FormDayTime
                        setValue={(v) => {
                          onFormChange(item.id, v);
                        }}
                        title="Выберете час"
                        value={formData[item.id] || null}
                      />
                    </>
                  ) : ["boolean"].includes(item.inputType) ? (
                    <>
                      <FormBoolean
                        setValue={(v) => {
                          onFormChange(item.id, v);
                        }}
                        title="Активна"
                        value={formData[item.id] || false}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-5">
              <CallbackButton
                style="round"
                callback={handleDeleteSubmit}
                disabled={deleteReminderMutation.isPending}
              >
                <div className="flex w-full justify-center items-center cursor-pointer">
                  <p>
                    {deleteReminderMutation.isPending
                      ? "Удаление..."
                      : "Удалить"}
                  </p>
                </div>
              </CallbackButton>
              <CallbackButton
                style="round"
                callback={handleChangeSubmit}
                disabled={deleteReminderMutation.isPending}
              >
                <div className="flex w-full justify-center items-center cursor-pointer">
                  <p>
                    {deleteReminderMutation.isPending
                      ? "Изменение..."
                      : "Изменить"}
                  </p>
                </div>
              </CallbackButton>
            </div>
          </div>
        </WhitePanelContainer>
      </div>
    </div>
  );
};

export default EditReminder;

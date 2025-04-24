import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { ERoutes } from "@shared/types/Routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const { data } = useQuery<{ data: { operations: any[] } }>({
    queryKey: ["operations"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_URL
        }/api/operations/main_cash_account_operations`,
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

  return (
    <div className="flex flex-col gap-5">
      {data &&
      "operations" in data.data &&
      data.data?.operations?.length > 0 ? (
        data.data.operations.map((op, i) => {
          const isIncome = op.type === "INCOME";
          const amountPrefix = isIncome ? "+" : "-";
          const operationDate = moment(op.created_at).format("DD.MM.YY");

          return (
            <BoxInfo style={"squre"} key={i}>
              <div
                className="flex flex-row justify-between items-center w-full h-full px-3 cursor-pointer"
                onClick={() =>
                  navigate(ERoutes.edit_operation, { state: { id: op.id } })
                }
              >
                <p className="flex flex-col gap-0">
                  <span className="truncate max-w-full">
                    {op.name?.length > 20
                      ? op.name.slice(0, 20) + "..."
                      : op.name || "Название отсутствует"}
                  </span>
                  <span className="text-sm text-gray-500">
                    Дата: {operationDate}
                  </span>
                </p>
                <p
                  className={`text-2xl whitespace-nowrap ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {amountPrefix} {Math.abs(op.amount) || 0}
                </p>
              </div>
            </BoxInfo>
          );
        })
      ) : (
        <>
          <p className="flex w-full justify-center">Нет операций</p>
        </>
      )}
    </div>
  );
};

export default History;

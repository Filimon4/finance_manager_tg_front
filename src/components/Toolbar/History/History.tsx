import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

const History = () => {
  const { data } = useQuery<{ data: { operations: any[] } }>({
    queryKey: ["operations"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/operations`,
        {
          params: {
            tg_id: 1289261150,
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
        data.data.operations.map((oper, i) => {
          const isIncome = oper.type === "INCOME";
          const amountPrefix = isIncome ? "+" : "-";
          const operationDate = moment(oper.created_at).format(
            "DD.MM.YY hh:mm"
          );

          return (
            <BoxInfo style={"squre"} key={i}>
              <div className="flex flex-row justify-between items-center w-full h-full px-3">
                <p className="flex flex-col gap-0">
                  {oper.name || "Название отсутствует"}
                  <span className="text-sm text-gray-500">{operationDate}</span>
                </p>
                <p
                  className={`text-2xl ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {amountPrefix} {Math.abs(oper.amount) || 0}
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

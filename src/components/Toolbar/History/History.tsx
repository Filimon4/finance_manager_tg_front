import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
        data.data.operations.map((oper, i) => (
          <BoxInfo style={"squre"} key={i}>
            <div className="flex flex-row justify-between items-center w-full h-full px-3">
              <p>{oper.type}</p>
              <p className="text-2xl">{oper.amount || 0}</p>
            </div>
          </BoxInfo>
        ))
      ) : (
        <>
          <p className="flex w-full justify-center">Нет операций</p>
        </>
      )}
    </div>
  );
};

export default History;

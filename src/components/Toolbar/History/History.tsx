import BoxInfo from "@shared/components/Info/BoxInfo/MoneyInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const History = () => {
  const { data } = useQuery({
    queryKey: ["operations"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/operations/get`,
        {
          params: {
            tg_id: 1289261150,
          },
        }
      );
      return res;
    },
    staleTime: 1,
  });


  return (
    <div className="flex flex-col gap-5">
      {data &&
        "operations" in data.data &&
        (data.data.operations as any[])!.map((oper, i) => (
          <BoxInfo style={"squre"} key={i}>
            <div className="flex flex-row justify-between items-center w-full h-full px-3">
              <p>{oper.type}</p>
              <p className="text-2xl">{oper.amount || 0}</p>
            </div>
          </BoxInfo>
        ))}
    </div>
  );
};

export default History;

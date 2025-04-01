import NavigationButton from "@shared/components/Buttons/NavigationButton/NavigationButton";
import BoxInfo from "@shared/components/Info/BoxInfo/BoxInfo";
import { ERoutes } from "@shared/types/Routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Categories = () => {
  const { data } = useQuery<{data: {overview: any[]}}>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_END_URL}/api/categories/overview`,
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
    <div className="flex flex-col justify-between gap-2 h-full">
      {data?.data?.overview && data?.data?.overview?.length > 0 ?
        data?.data?.overview.map((data: any, i: number) => (
          <BoxInfo style="squre" key={i}>
            <div className="flex flex-row justify-between items-center w-full h-full px-3">
              <p>{data.category_name || "Без названия"}</p>
              <p className="text-2xl">{data.total_spent || 0}</p>
            </div>
          </BoxInfo>
        )) : <>
          <p className="flex w-full justify-center">
            Нет категорий
          </p>
        </>}

      <NavigationButton link={ERoutes.category} style="round">
        <div className="flex w-full justify-center items-center cursor-pointer">
          <p>Добавить категорию</p>
        </div>
      </NavigationButton>
    </div>
  );
};

export default Categories;

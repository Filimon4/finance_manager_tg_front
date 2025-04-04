const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const Mounth = ({ mounth }: { mounth: number }) => {
  return (
    <div className="self-center py-0.5 px-5 rounded-2xl bg-purple-800">
      <p>{monthNames[mounth]}</p>
    </div>
  );
};

import React, { useState } from "react";
import SingleCalendarItem from "../../shared/components/calendar/SingleCalendarItem";

interface CalendarProps {
  selectedDays: Date[];
  setSelectedDays: (days: Date[]) => void;
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const [calendar, setCalendar] = useState<Date[]>([
    new Date(2020, 9, 1),
    new Date(2020, 10, 2),
    new Date(2020, 11, 3),
    new Date(2020, 12, 4),
    new Date(2021, 1, 1),
    new Date(2021, 2, 2),
    new Date(2021, 3, 3),
    new Date(2021, 4, 4),
    new Date(2021, 5, 1),
    new Date(2021, 6, 2),
    new Date(2021, 7, 3),
    new Date(2021, 8, 4),
    new Date(2021, 9, 1),
    new Date(2021, 10, 2),
    new Date(2021, 11, 3),
    new Date(2021, 12, 4),
    new Date(2022, 1, 1),
    new Date(2022, 2, 2),
    new Date(2022, 3, 3),
    new Date(2022, 4, 4),
    new Date(2022, 5, 1),
    new Date(2022, 6, 2),
    new Date(2022, 7, 3),
    new Date(2022, 8, 4),
  ]);
  return (
    <div style={{ width: "90%" }}>
      {calendar.map((x) => (
        <SingleCalendarItem
          key={x.toString()}
          date={x}
          setSelectedDays={() => {
            if (props.selectedDays.includes(x)) {
              props.setSelectedDays(
                props.selectedDays.filter((day) => day !== x)
              );
            } else {
              props.setSelectedDays([...props.selectedDays, x]);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Calendar;

import React, { useState, useRef, useEffect } from "react";
import SingleCalendarItem from "../../shared/components/calendar/SingleCalendarItem";
import FlatList from "flatlist-react";
import { DailyMeals } from "../../shared/models/DailyMeals";
import { add, isSameDay, sub } from "date-fns";
import styles from "./Calendar.module.scss";
import SelectedDay from "../../shared/components/calendar/SelectedDay";

interface CalendarProps {
  selectedDays: Date[];
  setSelectedDays: (days: Date[]) => void;
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const [calendar, setCalendar] = useState<Date[]>([new Date()]);
  const [event, setEvent] = useState<DailyMeals[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstElement = useRef<any>(null);

  function addDays() {
    const lastDate = calendar[calendar.length - 1];
    let newDates = [];
    for (let i = 1; i < 10; i++) {
      newDates.push(add(lastDate, { days: i }));
    }
    setCalendar([...calendar, ...newDates]);
  }

  const renderItem = (day: Date, index: number) => {
    return (
      <SingleCalendarItem
        isSelected={props.selectedDays.includes(day)}
        className={styles.singleCalendarItem}
        ref={index === 0 ? firstElement : null}
        scheduledMeals={event.find((x) => isSameDay(x.date, day))?.meals}
        key={day.toString()}
        date={day}
        setSelectedDays={() => {
          if (props.selectedDays.includes(day)) {
            props.setSelectedDays(props.selectedDays.filter((x) => x !== day));
          } else {
            props.setSelectedDays([...props.selectedDays, day]);
          }
          console.dir(props.selectedDays);
        }}
        onClick={() => {
          if (event.find((x) => isSameDay(x.date, day))?.meals) {
            setSelectedDay(day);
          }
        }}
      />
    );
  };

  const fetchData = () => {
    setTimeout(() => {
      addDays();
      setEvent([
        {
          date: new Date(2021, 1, 3),
          meals: [
            {
              name: "Pszczoly z miodem",
              recipe: "miod i pszczoly wymixuj w blenderze",
              additionalInfo: "",
              ingredients: ["miod", "pszczoly"],
            },
            {
              name: "Jablecznik",
              recipe: "umiem",
              additionalInfo: "",
              ingredients: ["jablka", "ciasto", "1kg cukru"],
            },
          ],
        },
      ]);
    }, 10);
  };

  const fetchDataOnTop = () => {
    setTimeout(() => {
      const lastDate = calendar[0];
      let newDates = [];
      for (let i = 10; i > 0; i--) {
        newDates.push(sub(lastDate, { days: i }));
      }
      setCalendar([...newDates, ...calendar]);
      if (containerRef.current != null)
        containerRef.current.scrollTop = firstElement.current?.getYPosition();
    }, 10);
  };

  const counter = useRef(0);

  useEffect(() => {
    if (counter.current++) {
      if (containerRef.current !== null) {
        containerRef.current.scrollTop = 570;
      }
    }
  }, [calendar]);

  return (
    <div
      className={styles.flatList}
      ref={containerRef}
      onScroll={() => {
        if (!containerRef.current?.scrollTop) {
          fetchDataOnTop();
        }
      }}>
      {selectedDay ? (
        <SelectedDay
          onClose={() => setSelectedDay(null)}
          day={selectedDay}
          meals={event.find((x) => isSameDay(x.date, selectedDay))?.meals}
        />
      ) : (
        <FlatList
          list={calendar}
          renderItem={renderItem}
          renderWhenEmpty={() => <div>XD</div>}
          hasMoreItems={true}
          loadMoreItems={fetchData}
        />
      )}
    </div>
  );
};

export default Calendar;

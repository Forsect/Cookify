import React, { useState, useRef, useEffect } from "react";
import SingleCalendarItem from "../../shared/components/calendar/SingleCalendarItem";
import FlatList from "flatlist-react";
import { DailyMeals } from "../../shared/models/DailyMeals";
import { add, isSameDay, sub } from "date-fns";
import styles from "./Calendar.module.scss";
import SelectedDay from "../../shared/components/calendar/SelectedDay";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/stores/Store";

interface CalendarProps {
  selectedDays: DailyMeals[];
  setSelectedDays: (days: DailyMeals[]) => void;
}

const getDateWithoutHours = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};

const Calendar: React.FC<CalendarProps> = observer((props: CalendarProps) => {
  const { mealsStore } = useStore();

  const [calendar, setCalendar] = useState<Date[]>([getDateWithoutHours()]);
  // const [event, setEvent] = useState<DailyMeals[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstElement = useRef<any>(null);
  const selectedElementRef = useRef<any>(null);

  const addDays = () => {
    const lastDate = calendar[calendar.length - 1];
    let newDates = [];
    for (let i = 1; i < 10; i++) {
      newDates.push(add(lastDate, { days: i }));
    }
    setCalendar([...calendar, ...newDates]);
  };

  useEffect(() => {
    mealsStore.getDailyMeals();
    //eslint-disable-next-line
  }, []);

  const renderItem = (day: Date, index: number) => {
    console.dir(mealsStore.dailyMealsList.find((x) => isSameDay(x.date, day)));
    return (
      <SingleCalendarItem
        isSelected={props.selectedDays.some((x) => isSameDay(day, x.date))}
        className={styles.singleCalendarItem}
        ref={
          index === 0
            ? firstElement
            : selectedDay && isSameDay(day, selectedDay)
            ? selectedElementRef
            : null
        }
        scheduledMeals={
          mealsStore.dailyMealsList.find((x) => isSameDay(x.date, day))?.meals
        }
        key={day.toString()}
        date={day}
        setSelectedDays={() => {
          if (props.selectedDays.some((x) => isSameDay(day, x.date))) {
            props.setSelectedDays(
              props.selectedDays.filter((x) => !isSameDay(day, x.date))
            );
          } else {
            let checkedDay = mealsStore.dailyMealsList.find((x) =>
              isSameDay(x.date, day)
            );
            if (checkedDay) {
              props.setSelectedDays([...props.selectedDays, checkedDay]);
            }
          }
        }}
        onClick={() => {
          // let mealExists = event.find((x) => isSameDay(x.date, day));
          // if (mealExists) setSelectedDay(mealExists);
          setSelectedDay(day);
        }}
      />
    );
  };

  const fetchData = () => {
    setTimeout(() => {
      addDays();
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
    if (counter.current < 2) {
      if (containerRef.current !== null) {
        containerRef.current.scrollTop = 570;
      }
    }
  }, [calendar]);

  useEffect(() => {
    mealsStore.getDailyMeals();
    //eslint-disable-next-line
  }, []);

  return selectedDay ? (
    <SelectedDay
      onClose={() => {
        setSelectedDay(null);
        // if (
        //   selectedElementRef.current !== null &&
        //   containerRef.current !== null
        // ) {
        //   containerRef.current.scrollTop = selectedElementRef.current.scrollTop;
        // }
      }}
      onDelete={(dailyMeal) => {
        mealsStore.removeDailyMeal(dailyMeal);
      }}
      date={selectedDay}
    />
  ) : (
    <div
      className={styles.flatList}
      ref={containerRef}
      onScroll={() => {
        if (!containerRef.current?.scrollTop) {
          fetchDataOnTop();
        }
      }}>
      <FlatList
        list={calendar}
        renderItem={renderItem}
        renderWhenEmpty={() => <div></div>}
        hasMoreItems={true}
        loadMoreItems={fetchData}
      />
    </div>
  );
});

export default Calendar;

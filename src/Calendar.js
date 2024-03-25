import React from 'react';
import './Calendar.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  // Функция для создания массива дней для конкретного месяца и года
  createDaysForMonth(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    const today = new Date();
    const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < emptyDays; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${month}-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      const dayClass = isToday ? "calendar-day today" : "calendar-day";
      days.push(
        <div className={dayClass} key={`${month}-${day}`}>
          {day}
        </div>
      );
    }

    return days;
  }

  // Функция для отображения названия месяца
  monthName(month, year) {
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return `${monthNames[month]} ${year}`;
  }

  renderCalendar(year, month) {
    return (
      <div className="calendar-container">
        <h2>{this.monthName(month, year)}</h2>
        <div className="calendar-weekdays">
          {this.renderWeekdays()}
        </div>
        <div className="calendar-days">
          {this.createDaysForMonth(year, month)}
        </div>
      </div>
    );
  }

  renderWeekdays() {
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return weekdays.map(day => (
      <div className="calendar-weekday" key={day}>
        {day}
      </div>
    ));
  }

  render() {
    const { currentDate } = this.state;
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return (
      <div>
        {this.renderCalendar(prevYear, prevMonth)}
        {this.renderCalendar(currentYear, currentMonth)}
        {this.renderCalendar(nextYear, nextMonth)}
      </div>
    );
  }
}

export default Calendar;
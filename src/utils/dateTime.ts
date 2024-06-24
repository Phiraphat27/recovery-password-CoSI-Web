import { Week } from "@/type/dataTime";

function formatDateWithOffset(date: Date, isStart: boolean, offset: number): string {
    const offsetNumber = offset.toString().padStart(2, '0');
    const datePart = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    if (isStart) {
        return `${datePart}T00:00:00+${offsetNumber}:00`;
    } else {
        return `${datePart}T23:59:59+${offsetNumber}:00`;
    }
}

function getStartAndEndDates(year: number, month: number, day: number, UTC: number, isStart: boolean): { date: Date } {
    const currentDate = new Date(year, month - 1, day);
    const dateString = formatDateWithOffset(currentDate, isStart, UTC);

    return {
        date: new Date(dateString)
    };
}

export function getStartAndEndOfDayUTC(UTC: number = 7) {
    const currentDateUTC = new Date();
    const { date: start } = getStartAndEndDates(currentDateUTC.getFullYear(), currentDateUTC.getMonth() + 1, currentDateUTC.getDate(), UTC, true);
    const { date: end } = getStartAndEndDates(currentDateUTC.getFullYear(), currentDateUTC.getMonth() + 1, currentDateUTC.getDate(), UTC, false);

    return {
        startOfDayUTC: start,
        endOfDayUTC: end
    };
}

export function getStartAndEndOfMonthUTC(year: number, month: number, UTC: number = 7) {
    const { date: start } = getStartAndEndDates(year, month, 1, UTC, true);

    const endOfMonthUTC = new Date(start);
    endOfMonthUTC.setMonth(endOfMonthUTC.getMonth() + 1);
    endOfMonthUTC.setDate(endOfMonthUTC.getDate() - 1);

    return {
        startOfMonthUTC: start,
        endOfMonthUTC: getStartAndEndDates(endOfMonthUTC.getFullYear(), endOfMonthUTC.getMonth() + 1, endOfMonthUTC.getDate(), UTC, false).date
    };
}

export function getWeekStartEndDaysUTC(year: number, month: number, UTC: number = 7): Week[] {
    const weeks: Week[] = [];
    const lastDayOfMonth = new Date(year, month, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let currentWeek: { day: number; date: Date }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay();

        if (dayOfWeek === 0 && currentWeek.length > 0) {
            weeks.push({
                startDay: new Date(formatDateWithOffset(currentWeek[0].date, true, UTC)),
                endDay: new Date(formatDateWithOffset(currentWeek[currentWeek.length - 1].date, false, UTC)),
            });
            currentWeek = [];
        }

        currentWeek.push({
            day,
            date: currentDate
        });

        if (day === daysInMonth && currentWeek.length > 0) {
            weeks.push({
                startDay: new Date(formatDateWithOffset(currentWeek[0].date, true, UTC)),
                endDay: new Date(formatDateWithOffset(currentWeek[currentWeek.length - 1].date, false, UTC)),
            });
        }
    }

    return weeks;
}

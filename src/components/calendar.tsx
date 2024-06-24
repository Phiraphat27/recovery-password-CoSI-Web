// components/Calendar.tsx
import { holiday } from '@/data/holidey';
import { hoursToHumanReadable } from '@/utils/timeRead';
import { UserWithTime } from '@/type/dataTime';
import React from 'react';
interface CalendarProps {
    data: UserWithTime;
    month: number;
    year: number;
}
const Calendar: React.FC<CalendarProps> = (dataTime) => {
    const currentDate = new Date();
    const currentMonth = dataTime.month - 1;
    const currentYear = dataTime.year;

    // Function to get the number of days in a month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(new Date(year, month + 1, 0)).getDate();
    };

    // Get the number of days in the current month
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Array to store the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthHoildays = holiday.filter((item) => item.month == currentMonth + 1);

    return (
        <div className="hidden xl:grid container mx-auto mt-8 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 gap-2 p-4">
                {/* Calendar header */}
                <div className="col-span-7 text-center font-bold text-lg mb-4">
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                </div>

                {/* Weekday labels */}
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="col-span-1 font-bold">{day}</div>
                ))}

                {/* Blank spaces for the days before the first day of the month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="col-span-1"></div>
                ))}

                {/* Calendar days with frame */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const holiday = monthHoildays.find((item) => item.date == index + 1);
                    const time = dataTime.data.time_entry.find((item) => new Date(item.entryTime).getDate() == index + 1);
                    const toTolHours = time?.time_hours ?? 0;
                    const dateCommits = Object.keys(dataTime.data.cntCommits as object).find((item) => new Date(item).getDate() == index + 1);
                    const cntCommits = dataTime.data.cntCommits?.[dateCommits as string] ?? 0;
                    return (
                        <div key={index} className={`col-span-1 border p-2 text-left h-32 overflow-auto ${toTolHours == 0 && " bg-gray-300" }`}>
                            {holiday ? (
                                <>
                                    <div className='text-red-600 font-bold'>{index + 1}</div>
                                    <div className='text-red-500 font-bold'>{holiday.holidayDescription}</div>
                                </>
                            ) : (
                                // You can customize the content for days without holidays here
                                <>
                                    <div className='flex justify-between'>
                                        <div className={`${toTolHours > 0 ? "text-green-600" : "text-red-600"} font-bold text-base`}>{index + 1}</div>
                                        <div>{` ${cntCommits ? cntCommits : 0} Commits`}</div>
                                    </div>
                                    
                                    Entry : {time?.entryTime ? new Date(time.entryTime).toLocaleTimeString('en-GB', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    }) : "-"}<br />
                                    Exit : {time?.exitTime ? new Date(time?.exitTime).toLocaleTimeString('en-GB', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    }) : "-"}<br />
                                    Total: {hoursToHumanReadable(toTolHours, true)}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;

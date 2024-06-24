// pages/timeentries.tsx
"use client"
import React, { useState, useEffect, use } from 'react';
import Head from 'next/head';
import { UserWithTime } from '@/type/dataTime';
import { useSearchParams } from 'next/navigation';
import { hoursToHumanReadable } from '@/utils/timeRead';
import Calendar from '@/components/calendar';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { getWorkingHoursById } from '@/server-action/working-hours';

export default function TimeEntries({ params }: { params: { slug: any; }}) {
    // const params = useSearchParams();
    const userid = decodeURIComponent(params.slug[0]) as string;
    const year = params.slug[1]
    const month = params.slug[2]
    const [dataEntries, setDataEntries] = useState<UserWithTime>();
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState(year ? parseInt(year) : new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(month ? parseInt(month) : new Date().getMonth() + 1); // JavaScript months are 0-indexed
    const [totalHours, setTotalHours] = useState<number>(0);

    const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
    const localActive = useLocale();

    useEffect(() => {
        async function fetchData() {
            const getDate = getWorkingHoursById(userid, selectedYear, selectedMonth).then((data) => {
                if (typeof data === 'string') {
                    setError(data);
                    return;
                }

                setDataEntries(data as UserWithTime);
            })
        }

        fetchData();
    }, [selectedYear, selectedMonth]); // Empty dependency array means this effect runs once on mount.

    return (
        <div className="max-w-6xl mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            <Head>
                <title>User Time Entries</title>
            </Head>
            <div className="overflow-x-auto">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4">User Time Entries</h2>
                    {/* Selector Container */}
                    <div className="flex flex-row justify-center md:justify-start items-center mb-4">
                        {/* Year Selector */}
                        <label className="block md:mb-0 md:mr-4">
                            Year:
                            <select
                                className="ml-2 form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={selectedYear}
                                onChange={e => setSelectedYear(parseInt(e.target.value))}
                            >
                                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </label>
                        {/* Month Selector */}
                        <label className="block ml-4 md:mt-0">
                            Month:
                            <select
                                className="ml-2 form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={selectedMonth}
                                onChange={e => setSelectedMonth(parseInt(e.target.value))}
                            >
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <h3 className="text-xl mt-6 font-bold mb-2">{dataEntries?.profile.filter(
                        (profile) => profile.language_code === localActive
                    )[0]?.name}</h3>
                    <div className="mb-4">
                        <p className="font-bold">Total Hours: {hoursToHumanReadable(dataEntries?.sumHours || 0)}</p>
                        <p className="font-bold">Hours/Day: {hoursToHumanReadable(dataEntries?.avgHoursPerDay || 0)}</p>
                        <p className="font-bold pb-6">Git Work : <Link className={`text-blue-700 underline ${dataEntries?.user_git ? '' : 'pointer-events-none'}`} target="_blank" href={`/statistics/commits?year=${selectedYear}&month=${selectedMonth}&user=${userid}`}>{dataEntries?.user_git ? dataEntries?.user_git : "No git ID"}</Link></p>
                        {
                            dataEntries?.weeks?.map((week, index) => {
                                return (
                                    <p key={index} className="font-bold">
                                        Week {index + 1} ({new Date(week.start).getDate().toString().padStart(2, '0')} - {new Date(week.end).getDate().toString().padStart(2, '0')}): {hoursToHumanReadable(dataEntries?.weeklyHours?.[index] ?? 0)}
                                    </p>
                                );
                            })
                        }
                    </div>
                </div>
                {dataEntries?.time_entry && <Calendar data={dataEntries} month={selectedMonth} year={selectedYear} />}
                <table className="mt-8 mx-auto container overflow-hidden bg-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Entry Time</th>
                            <th className="border px-4 py-2">Exit Time</th>
                            <th className="border px-4 py-2">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataEntries && dataEntries.time_entry && dataEntries.time_entry.length !== 0 ? (
                            dataEntries?.time_entry.map((entry) => {
                                return (
                                    <tr key={entry.id}>
                                        <td className="border px-4 py-2">{new Date(entry.entryTime).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}</td>
                                        <td className="border px-4 py-2">{new Date(entry.entryTime).toLocaleTimeString('en-GB', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })}</td>
                                        <td className="border px-4 py-2">{entry.exitTime ? new Date(entry.exitTime).toLocaleTimeString('en-GB', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        }) : '—'}</td>
                                        <td className="border px-4 py-2">{hoursToHumanReadable(entry.time_hours as number)}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="border px-4 py-2 text-center">
                                    No time entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

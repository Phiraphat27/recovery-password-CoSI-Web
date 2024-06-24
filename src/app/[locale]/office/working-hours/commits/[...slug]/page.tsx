// CommitsPage.tsx
"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Commit, Data } from '@/type/git';
import GitLog from '@/components/gitLog';
import { getCommitHistoryByUserAndDate } from '@/server-action/git';
import { getStartAndEndOfMonthUTC } from '@/utils/dateTime';

const CommitsPage = ({ params }: { params: { slug: any; }}) => {
    const userid = decodeURIComponent(params.slug[0]) as string;
    const year = params.slug[1]
    const month = params.slug[2]
    const [commits, setCommits] = useState<Commit | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [selectName, setSelectName] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(year ? parseInt(year) : new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(month ? parseInt(month) : new Date().getMonth() + 1);

    const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { startOfMonthUTC, endOfMonthUTC } = getStartAndEndOfMonthUTC(selectedYear, selectedMonth);
                const datalist = await getCommitHistoryByUserAndDate(userid, startOfMonthUTC, endOfMonthUTC);

                console.log(datalist);

                setCommits(datalist.dataHistory);
                setSelectName(datalist.userName);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, [selectedYear, selectedMonth, userid]);

    return (
        <div className="container mx-auto flex items-center flex-col p-4">
            <h1 className="text-3xl font-bold mb-4">Commits Timeline</h1>
            <p className="text-xl font-bold mr-2 pb-4">User: {selectName}</p>
            <div className="flex flex-row justify-center md:justify-start items-center mb-4">
                {/* Year Selector */}
                <label className="block md:mb-0 md:mr-4">
                    Year:
                    <select
                        className="ml-2 form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Month Selector */}
                <label className="block ml-4 md:mt-0">
                    Month:
                    <select
                        className="ml-2 form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (commits && Object.keys(commits).length > 0) ? (
                <GitLog data={commits as unknown as Commit[]} />
            ) : (typeof commits === 'object') ? (
                <div>No data commits</div>
            )
                : (
                    <div>Loading...</div>
                )}
        </div>
    );
};

export default CommitsPage;

"use server"

import prisma from '@/lib/prisma';
import { isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';
import { UserWithTime, Week } from "@/type/dataTime";
import { getStartAndEndOfMonthUTC, getWeekStartEndDaysUTC } from "@/utils/dateTime";
import { getCommitHistoryByUserAndDate } from '@/server-action/git';

export async function getWorkingHoursList() {
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    const workingHours = await prisma.time_entry.findMany({
        include: {
            user: {
                include: {
                    profile: {
                        where: {
                            language_code: lang
                        },
                        select: {
                            name: true
                        }
                    },
                },
            },
        },
    });

    const data = workingHours.map((item) => {
        const dateNow = new Date();
        if (item.user.user_position === "29p6O9AE" || item.user.user_position === "A87Mx1hY" || item.user.user_position === "nPMO2K36") {
            return {
                id: item.user.user_id,
                name: item.user.profile[0].name,
                toDay: item.entryTime.getUTCFullYear() === dateNow.getUTCFullYear() && item.entryTime.getUTCMonth() === dateNow.getUTCMonth() && item.entryTime.getUTCDate() === dateNow.getUTCDate() ? true : false,
                totalHours: item.time_hours,
                totalCommits: 5,
            };
        }
    });

    return data;
}

export async function getWorkingHoursById(id: string, year: number, month: number) {

    // Validate year and month
    if (!year || !month || month < 1 || month > 12) {
        return new Response(JSON.stringify({ error: 'Invalid year or month' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const { startOfMonthUTC, endOfMonthUTC } = getStartAndEndOfMonthUTC(year, month);
        const timeentries: UserWithTime | null = (await prisma.user.findFirst({
            where: {
                user_id: id, // Use the parsed user ID in the query
            },
            include: {
                time_entry: {
                    where: {
                        entryTime: {
                            gte: startOfMonthUTC,
                            lte: endOfMonthUTC,
                        },
                    },
                },
                profile: true,
            },
        })) as UserWithTime;

        const datalist = await getCommitHistoryByUserAndDate(id, startOfMonthUTC, endOfMonthUTC);

        timeentries.sumHours = (timeentries?.time_entry as { time_hours: number | null; entryTime: Date | null }[]).reduce((total: number, entry: { time_hours: number | null; entryTime: Date | null }) => total + (entry.time_hours || 0), 0) || 0;
        timeentries.avgHoursPerDay = timeentries.sumHours / timeentries.time_entry.length || 0;
        const cntCommits = datalist && !datalist?.message ? datalist.dataHistory as {
            commit_sha: string;
            commit_author: string;
            commit_branch: string;
            commit_date: Date | null;
            commit_message: string;
            commit_repo: string;
            commit_url: string;
        }[] : [];

        const cntCommitsByDate: { [key: string]: number } = cntCommits.reduce((countByDate: { [key: string]: number }, commit) => {
            const commitDate = commit.commit_date?.toDateString();
        
            if (commitDate) {
                countByDate[commitDate] = (countByDate[commitDate] || 0) + 1;
            }
        
            return countByDate;
        }, {});

        timeentries.cntCommits = cntCommitsByDate;
        timeentries.weeks = [];
        timeentries.weeklyHours = [];
        const weeksInMonth: Week[] = getWeekStartEndDaysUTC(year, month);
        for (const week of weeksInMonth) {
            const weekEntries = timeentries.time_entry.filter((entry) => {
                const entryDate = new Date(entry.entryTime);
                return entryDate >= week.startDay && entryDate <= week.endDay;
            });
            const weekHours = weekEntries.reduce((total: number, entry: { time_hours: number | null; entryTime: Date | null }) => total + (entry.time_hours || 0), 0) || 0;
            timeentries.weeks.push({ start: week.startDay.toISOString(), end: week.endDay.toISOString() });
            timeentries.weeklyHours.push(weekHours);
        }
        return timeentries;
    } catch (error) {
        return error
    }
}
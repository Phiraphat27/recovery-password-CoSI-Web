import { Prisma } from '@prisma/client';

export type UserWithTime = Prisma.userGetPayload<{
    include: { time_entry: true,profile: true};
}> & {
    sumHours?: number;
    avgHoursPerDay?: number;
    weeks?: Array<{ start: string; end: string }> | null;
    weeklyHours?: number[] | null;
    cntCommits?: {
        [key: string]: number;
    } | null;
};

export interface Week {
    startDay: Date;
    endDay: Date;
}
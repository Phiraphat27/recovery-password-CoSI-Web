"use server"

import { GroupedCommits } from "@/type/git";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export async function getCommitHistoryByUserAndDate(userId: string, startDate: Date, endDate: Date): Promise<any> {
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    try {
        const dataHistory: GroupedCommits = {};

        const usersWithKeyId = await prisma.user.findFirst({
            where: {
                user_id: userId
            },
            include: {
                profile: {
                    select: {
                        name: true,
                        language_code: true
                    }
                }
            }
        });

        if (!usersWithKeyId) {
            console.error("User not found!");
            return {message: "User not found!"};
        }

        const githubCommits = await prisma.git_commit.findMany({
            where: {
                commit_author: usersWithKeyId.user_git || undefined,
                commit_date: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                }
            }
        });

        githubCommits.forEach((commit) => {
            const repoKey = commit.commit_repo;
            const branchKey = commit.commit_branch;
        
            // Create an entry for the repository if it doesn't exist
            if (!dataHistory[repoKey]) {
                dataHistory[repoKey] = {};
            }
        
            // Create an entry for the branch if it doesn't exist within the repository
            if (!dataHistory[repoKey][branchKey]) {
                dataHistory[repoKey][branchKey] = [];
            }
        
            // Add the commit to the corresponding repository and branch
            dataHistory[repoKey][branchKey].push(commit);
        });

        return { userName: usersWithKeyId?.profile.filter(
            (profile) => profile.language_code === lang
        )[0]?.name || "", dataHistory:githubCommits };
        
    } catch (error) {
        console.error(`Error fetching commit history for user ${userId}: ${(error as Error).message}`);
        return {message: `Error fetching commit history for user ${userId}: ${(error as Error).message}`};
    }
    finally {
        await prisma.$disconnect();
    }
}

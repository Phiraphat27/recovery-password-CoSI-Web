import { Data, Branch, Commit } from '@/type/git';
import Link from 'next/link';

// Assuming data is of type Data
const GitLog: React.FC<{ data: Commit[] }> = ({ data }) => {
    // Sort the commits by date in descending order
    const sortedData = data.sort((a, b) => {
        const dateA = a.commit_date ? new Date(a.commit_date).getTime() : 0;
        const dateB = b.commit_date ? new Date(b.commit_date).getTime() : 0;
        return dateB - dateA;
    });

    // Group the commits by date
    const groupedData: Record<string, Commit[]> = {};
    sortedData.forEach((commit) => {
        const date = new Date(commit.commit_date?.toString() as string).toDateString();
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(commit);
    });

    return (
        <div>
            {Object.keys(groupedData).map((date) => (
                <div key={date}>
                    <h2 className="font-bold text-lg">
                        {new Date(date as string).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour12: false,
                        })}
                    </h2>
                    <ul className="space-y-8 pb-12 pt-4">
                        {groupedData[date].map((commit) => (
                            <li key={commit.commit_sha} className="">
                                <div className="flex items-start space-x-4">
                                    <div className="w-4 h-4 mt-[6px] bg-orange-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-gray-500">
                                            {new Date(commit.commit_date?.toString() as string).toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                                hour12: false,
                                            })}{" "}|{" "}
                                            <Link href={commit.commit_url} className="hover:text-gray-950 hover:underline">
                                                <strong>{commit.commit_sha.slice(0, 8)}</strong>
                                            </Link>{" "}

                                        </div>
                                        <div className="py-2">
                                            <span className="inline-block px-2 py-1 text-xs font-mono bg-git-badges-sec text-git-badges-main rounded-md no-underline">
                                                {commit.commit_branch}
                                            </span>{" "}
                                            <span className="inline-block px-2 py-1 text-xs font-mono bg-git-badges-sec text-git-badges-main rounded-md no-underline">
                                                {commit.commit_repo}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-gray-700 mb-2">
                                            <p className="whitespace-pre-line">{commit.commit_message} </p>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GitLog;

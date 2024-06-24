export interface Commit {
    commit_sha: string;
    commit_author: string;
    commit_branch: string;
    commit_date: Date | null;
    commit_message: string;
    commit_repo: string;
    commit_url: string;
}

export interface GroupedCommits {
    [repo: string]: {
        [branch: string]: Commit[];
    };
}

export interface Branch {
    [branch: string]: Commit[];
}

export interface Repository {
    [repo: string]: Branch;
}

export interface Data {
    Commits: Repository;
}
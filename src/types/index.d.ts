export type SearchParams = { [key: string]: string | string[] | undefined; };

export type BranchStatus = "validating-images" | "showing-in-app" | "hidden-in-app";
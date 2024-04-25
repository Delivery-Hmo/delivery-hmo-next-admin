export type SearchParams = { [key: string]: string | string[] | undefined; };

export type BranchStatus = "validating-images" | "showing-in-app" | "hidden-in-app";

export type TypeControl = 'input' | 'select' | 'date' | 'checkbox' | 'radio' | 'autocomplete' | 'textarea' | 'file' | 'timeRangePicker' | 'phone';
export type TypeInput = 'text' | 'number' | 'password' | 'email';
export type UploadListType = 'text' | 'picture' | 'picture-card' | 'picture-circle';
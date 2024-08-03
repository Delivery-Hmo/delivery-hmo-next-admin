export const getHeaders = (token: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
});

export const handleError = (error: any) => {
  console.log(error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
};

export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  let result: ReturnType<T> | undefined;

  const wrappedFn: (...args: Parameters<T>) => ReturnType<T> = (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result as ReturnType<T>;
  };

  return wrappedFn as T;
};
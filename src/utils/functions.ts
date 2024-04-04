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
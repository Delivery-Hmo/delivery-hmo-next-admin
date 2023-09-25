import { User, getAuth, onIdTokenChanged } from "firebase/auth";

export const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

export const getCurrentToken = () => new Promise<string>((resolve, reject) => {
  const uns = onIdTokenChanged(
    getAuth(),
    async (user: User | null) => {
      uns();

      if (!user) {
        reject("Error de autenticación");
        return;
      }

      const token = await user.getIdToken();
      resolve(token);
    },
    () => reject("Error de autenticación")
  );
});

export const handleError = (error: any) => {
  console.log(error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
};
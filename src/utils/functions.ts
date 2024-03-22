import { auth } from "@src/firebase";
import { User, onIdTokenChanged } from "firebase/auth";

export const getHeaders = (token: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
});

export const getCurrentToken = () => new Promise<string>((resolve, reject) => {
  const uns = onIdTokenChanged(
    auth,
    async (user: User | null) => {
      uns();

      if (!user) {
        reject("Error de autenticación.");
        return;
      }

      const token = await user.getIdToken();

      resolve(token);
    },
    (error) => {
      console.log(error);
      reject("Error de autenticación.");
    }
  );
});

export const handleError = (error: any) => {
  console.log(error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
};
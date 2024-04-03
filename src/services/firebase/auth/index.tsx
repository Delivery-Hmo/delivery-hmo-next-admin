import { auth } from "..";
import { User, UserCredential, createUserWithEmailAndPassword, getAuth, onIdTokenChanged, signInWithEmailAndPassword } from "firebase/auth";

export const createUserWithEmail = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    // await updateProfile(result.user, { displayName: "SuperAdmin" });
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const getCurrentUser = () => new Promise<User>((resolve, reject) => {
  const uns = onIdTokenChanged(
    getAuth(),
    (user) => {
      uns();

      if (!user) {
        reject("Error de autenticación");
        return;
      }

      resolve(user);
    },
    () => reject("Error de autenticación")
  );
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

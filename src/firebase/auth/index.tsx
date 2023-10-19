import { auth } from "../";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const createUserWithEmail = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export const signInWithEmail = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
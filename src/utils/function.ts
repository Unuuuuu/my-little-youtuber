import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getNicknameFromUserId = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const nickname: string =
    (await getDoc(userDocRef)).data()?.displayName ?? "Empty display name";
  return nickname;
};

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getNicknameFromUserId = async (
  userId: string,
  channelId: string
) => {
  const userDocRef = doc(db, "users", userId);
  const data = (await getDoc(userDocRef)).data();
  if (data === undefined) {
    return "Empty nickname";
  }
  const displayName = data.displayName;
  const nicknames = data.nicknames;
  const nickname: string =
    nicknames[channelId] ?? displayName ?? "Empty nickname";
  return nickname;
};

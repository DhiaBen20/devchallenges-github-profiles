import { useContext } from "react";
import { ProfileDetailsContext } from "./ProfileDetailsContext";

export function useProfileDetails() {
  const value = useContext(ProfileDetailsContext);

  if (!value) throw new Error("useProfileDetails error");

  return value;
}

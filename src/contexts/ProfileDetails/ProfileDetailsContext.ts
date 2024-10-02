import { createContext, Dispatch, SetStateAction } from "react";

export const ProfileDetailsContext = createContext<null | {
  activeProfile: string;
  setActiveProfile: Dispatch<SetStateAction<string>>;
}>(null);

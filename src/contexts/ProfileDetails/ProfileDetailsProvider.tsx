import { ReactNode, useState } from "react";
import { ProfileDetailsContext } from "./ProfileDetailsContext";

export default function ProfileDetailsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeProfile, setActiveProfile] = useState("");

  return (
    <ProfileDetailsContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ProfileDetailsContext.Provider>
  );
}

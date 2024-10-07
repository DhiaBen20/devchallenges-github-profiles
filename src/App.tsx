import Hero from "./components/Hero";
import ProfileDetails from "./components/ProfileDetails";
import { useProfileDetails } from "./contexts/ProfileDetails/useProfileDetails";

function App() {
  const { activeProfile } = useProfileDetails();
  return (
    <div className="bg-[#20293A] min-h-screen text-[#CDD5E0]">
      <Hero />
      {activeProfile && <ProfileDetails />}
    </div>
  );
}

export default App;

import Hero from "./components/Hero";
import { useProfileDetails } from "./contexts/ProfileDetails/useProfileDetails";

function App() {
  const { showDetails } = useProfileDetails();
  return (
    <div className="bg-[#20293A] min-h-screen">
      <Hero />
      {showDetails && <div>Profile Details</div>}
    </div>
  );
}

export default App;

import hero from "../assets/hero-image-github-profile.png";
import SearchPopover from "./SearchInput";

export default function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${hero})` }}
      className="bg-cover bg-center bg-no-repeat h-48 pt-10 px-4"
    >
      <div className="max-w-xl mx-auto">
        <SearchPopover />
      </div>
    </div>
  );
}

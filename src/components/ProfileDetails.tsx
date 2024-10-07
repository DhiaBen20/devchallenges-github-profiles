import { GitFork, ShieldEllipsis, Star } from "lucide-react";
import { useState } from "react";
import { useProfileDetails } from "../contexts/ProfileDetails/useProfileDetails";
import { Profile, useProfile, useRepos } from "../queries";

export default function ProfileDetails() {
  const { activeProfile } = useProfileDetails();

  const profileQuery = useProfile(activeProfile);

  if (!profileQuery.data) return;

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="flex items-start">
        <div className="shrink-0 size-28 mr-2 rounded-md overflow-hidden outline outline-8 outline-[#20293A] -translate-y-8">
          <img
            src={profileQuery.data.avatar_url}
            alt=""
            className="size-full object-cover bg-[#20293A]"
          />
        </div>

        <Stats
          followers={profileQuery.data!.followers}
          following={profileQuery.data!.following}
          location={profileQuery.data!.location}
        />
      </div>

      <div className="mt-6">
        <h1 className="text-4xl font-medium">{profileQuery.data.name}</h1>
        <p className="mt-2">{profileQuery.data.bio}</p>
      </div>

      <Repos />
    </div>
  );
}

function Stats({
  followers,
  following,
  location,
}: {
  followers: Profile["followers"];
  following: Profile["following"];
  location: Profile["location"];
}) {
  return (
    <div className="flex flex-wrap gap-4 ml-8 mt-5">
      <StatItem label="Followers" value={followers} />
      <StatItem label="Following" value={following} />
      <StatItem label="Location" value={location} />
    </div>
  );
}

function StatItem({
  label,
  value,
}: {
  label: string;
  value: number | string | null;
}) {
  return (
    value !== null && (
      <div className="bg-[#111729] text-sm font-medium flex items-center px-4 py-2 rounded-xl gap-4">
        <div className="text-[#4A5567]">{label}</div>
        <div className="w-px h-9 bg-[#4A5567]" />
        <div>{value}</div>
      </div>
    )
  );
}

function Repos() {
  const [showAll, setShowAll] = useState(false);

  const { activeProfile } = useProfileDetails();

  const { data, isLoading, error } = useRepos(activeProfile);

  if (isLoading) return <p>Loading repositories…</p>;

  if (error) return "error";

  if (data)
    return (
      <div className="mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          {data.slice(0, showAll ? data.length : 4).map((repo) => (
            <div
              key={repo.name}
              className="flex flex-col relative p-4 bg-gradient-to-r from-[#111729] to-[#1D1B48] rounded-lg"
            >
              <a href={repo.html_url} target="_blank" className="text-xl">
                {repo.name}
                <span className="absolute inset-0"></span>
              </a>
              <p className="text-sm my-3">{repo.description}</p>

              <div className="mt-auto flex flex-wrap items-center gap-4">
                {repo.license && (
                  <div className="flex items-center gap-2">
                    <ShieldEllipsis className="size-5" />
                    {repo.license.name}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <GitFork className="size-5" />
                  {repo.forks_count}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5" />
                  {repo.stargazers_count}
                </div>
                <div className="text-xs">
                  updated {relativeDate(new Date(repo.updated_at))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-10">
          {data.length > 4 && (
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "View few repositories" : "View all repositories"}
            </button>
          )}
        </div>
      </div>
    );
}

function relativeDate(date: Date) {
  const now: Date = new Date();
  const diff: number = now.getTime() - date.getTime();
  const seconds: number = Math.floor(diff / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  const months: number = Math.floor(days / 30);
  const years: number = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

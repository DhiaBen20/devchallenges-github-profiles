import useSWR from "swr";

export type Profile = {
  login: string;
  avatar_url: string;
  bio: string;
  name: string | null;
  following: number;
  followers: number;
  location: string | null;
};

async function fetchJson(url: string) {
  const res = await fetch(url);

  if (res.ok) {
    return await res.json();
  }

  throw await res.json();
}

export function useProfile(
  username: string,
  options: { onSuccess?: () => void; onError?: () => void } = {}
) {
  return useSWR<Profile, { message: string }>(
    () => (username ? `profile.${username}` : false),
    () => fetchJson(`https://api.github.com/users/${username}`),
    {
      ...options,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

export function useRepos(username: string) {
  return useSWR<
    {
      name: string;
      description: string;
      html_url: string;
      stargazers_count: number;
      forks_count: number;
      license: null | { name: string };
      updated_at: string;
    }[]
  >(
    () => (username ? `repos.${username}` : false),
    () => fetchJson(`https://api.github.com/users/${username}/repos`)
  );
}

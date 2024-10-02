import useSWR from "swr";

export function useProfile(username: string, onSuccess?: () => void) {
  return useSWR<{
    login: string;
    avatar_url: string;
    bio: string;
    name: string | null;
    following: number;
    followers: number;
    location: string | null;
  }>(
    () => (username ? `profile.${username}` : false),
    () =>
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          throw res.json();
        })
        .catch((err) => err.message),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess,
    }
  );
}

export function useRepos(username: string) {
  return useSWR(
    () => false && `repos.${username}`,
    () =>
      fetch(`https://api.github.com/users/${username}/repos`).then((res) =>
        res.json()
      )
  );
}

import * as Popover from "@radix-ui/react-popover";
import { LoaderCircle, SearchIcon } from "lucide-react";
import {
  ComponentPropsWithRef,
  Dispatch,
  forwardRef,
  SetStateAction,
  useState,
} from "react";
import { useSWRConfig } from "swr";
import { useProfile, useRepos } from "../queries";
import { useSearchQuery } from "../contexts/SearchQuery/useSearchQuery";
import { useProfileDetails } from "../contexts/ProfileDetails/useProfileDetails";

const SearchInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<"input"> & { isLoading?: boolean }
>(function SearchInput({ isLoading, ...props }, ref) {
  return (
    <div className="relative">
      <input
        {...props}
        type="text"
        className="bg-[#20293A] rounded-lg pl-14 pr-4 py-4 font-medium w-full text-[#CDD5E0] placeholder:text-[#4A5567] focus:outline-none focus:ring-2 ring-[#3763E2]"
        placeholder="username"
        ref={ref}
      />
      <SearchIcon
        stroke="#4A5567"
        className="absolute top-1/2 -translate-y-1/2 left-4 size-6 pointer-events-none"
      />
      {isLoading && (
        <LoaderCircle
          stroke="#3763E2"
          className="absolute top-1/2 -mt-3 right-4 size-6 animate-spin pointer-events-none"
        />
      )}
    </div>
  );
});

function Trigger({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { setQuery, debouncedQuery } = useSearchQuery();
  const { isLoading } = useProfile(debouncedQuery, {
    onSuccess: () => setIsOpen(true),
    onError: () => setIsOpen(true),
  });
  useRepos(debouncedQuery);

  const { cache } = useSWRConfig();

  const existsInCache = (username: string) =>
    Boolean(cache.get(`profile.${username}`));

  return (
    <Popover.Trigger asChild>
      <SearchInput
        isLoading={isLoading}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!e.target.value) setIsOpen(false);
          if (existsInCache(e.target.value)) setIsOpen(true);
        }}
      />
    </Popover.Trigger>
  );
}

function Content({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { debouncedQuery } = useSearchQuery();
  const { data, error } = useProfile(debouncedQuery);
  const { setActiveProfile } = useProfileDetails();

  return (
    <Popover.Portal>
      <Popover.Content
        className="bg-[#121729] text-[#CDD5E0] rounded-lg mt-2 p-2 w-[--radix-popover-trigger-width]"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={() => setIsOpen(false)}
        onInteractOutside={(e) => {
          const target = e.target;

          if (target && target instanceof Element && !target.closest("input")) {
            setIsOpen(false);
          }
        }}
      >
        {error && (
          <div className="text-center text-sm py-1 font-medium text-red-500">
            {error.message}
          </div>
        )}
        {data && (
          <div className="flex items-center gap-3 relative">
            <div className="size-16 overflow-hidden rounded-lg shrink-0">
              <img
                src={data?.avatar_url}
                alt=""
                className="size-full object-cover"
              />
            </div>
            <div>
              <a
                href="#"
                className="font-medium"
                onClick={() => {
                  setActiveProfile(debouncedQuery);
                  setIsOpen(false);
                }}
              >
                {data?.name || data?.login}{" "}
                <span className="absolute inset-0"></span>
              </a>
              <p className="mt-1 text-xs text-[#CDD5E0]/80">{data?.bio}</p>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover.Portal>
  );
}

export default function SearchPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen}>
      <Trigger setIsOpen={setIsOpen} />
      <Content setIsOpen={setIsOpen} />
    </Popover.Root>
  );
}

import { createContext, Dispatch, SetStateAction } from "react";

export const SearchQueryContext = createContext<null | {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  debouncedQuery: string;
}>(null);

import { useContext } from "react";
import { SearchQueryContext } from "./SearchQueryContext";

export function useSearchQuery() {
  const value = useContext(SearchQueryContext);

  if (!value) throw new Error("useSearchQueryContext error");

  return value;
}

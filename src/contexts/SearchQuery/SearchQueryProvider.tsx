import { useDebounce } from "@react-hooks-library/core";
import { ReactNode, useState } from "react";
import { SearchQueryContext } from "./SearchQueryContext";

export default function SearchQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  return (
    <SearchQueryContext.Provider value={{ query, setQuery, debouncedQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

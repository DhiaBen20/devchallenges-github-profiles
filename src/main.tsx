import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ProfileDetailsProvider from "./contexts/ProfileDetails/ProfileDetailsProvider.tsx";
import SearchQueryProvider from "./contexts/SearchQuery/SearchQueryProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchQueryProvider>
      <ProfileDetailsProvider>
        <App />
      </ProfileDetailsProvider>
    </SearchQueryProvider>
  </StrictMode>
);

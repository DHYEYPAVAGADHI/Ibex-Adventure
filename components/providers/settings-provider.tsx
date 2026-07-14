"use client";

import { createContext, useContext } from "react";

export interface WebsiteSettings {
  logoUrl: string | null;
}

const SettingsContext = createContext<WebsiteSettings>({
  logoUrl: null,
});

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: WebsiteSettings;
}) {
  return (
    <SettingsContext.Provider value={initialSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

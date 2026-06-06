"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

import { SettingsTabs } from "@/features/settings/components/settings-tabs";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  currentPath?: string;
}

export const DashboardShell: React.FC<Props> = ({ children, currentPath }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  console.log("currentRoute", currentPath);

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container antialiased">
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <TopBar
        isMobileNavOpen={isMobileNavOpen}
        onMenuClick={() => setIsMobileNavOpen(true)}
      >
        {currentPath?.startsWith("settings") ? <SettingsTabs /> : null}
      </TopBar>

      <main className="md:pl-64 pt-16 min-h-screen">{children}</main>
    </div>
  );
};

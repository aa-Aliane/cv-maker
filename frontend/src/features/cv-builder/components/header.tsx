"use client";

import React from "react";
import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";

export function WorkspaceHeader() {
  // We can pull the draft status or user data from your existing store if needed later
  const cvData = useCvStore((state) => state.cvData);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-[64px] items-center justify-between border-b border-border bg-card px-6 shadow-sm">
      {/* Left Context: Branding & Status */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          Resume Builder
        </h2>
        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Draft
        </span>
      </div>

      {/* Right Context: Actions */}
      <div className="flex items-center gap-3">
        {/* Icon Tools */}
        <button
          className="flex items-center justify-center rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Version History"
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
        </button>

        <button
          className="flex items-center justify-center rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Preview Settings"
        >
          <span className="material-symbols-outlined text-[20px]">
            visibility
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-border"></div>

        {/* Primary Actions */}
        <button className="rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Share Link
        </button>

        <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]">
          Export PDF
        </button>
      </div>
    </header>
  );
}

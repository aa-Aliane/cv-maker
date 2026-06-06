import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"nav"> {
  onMenuClick: () => void;
  isMobileNavOpen: boolean;
}

export const TopBar: React.FC<Props> = ({
  children,
  onMenuClick,
  isMobileNavOpen,
}) => {
  return (
    <nav
      aria-label="Top toolbar"
      className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-lg h-16"
    >
      <div className="flex items-center gap-md">
        {/* Hamburger — mobile only */}
        <button
          aria-label="Open navigation menu"
          aria-controls="main-sidebar"
          aria-expanded={isMobileNavOpen}
          className="p-sm text-on-surface-variant hover:text-primary transition-colors md:hidden"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            menu
          </span>
        </button>

        <span className="font-headline-md text-headline-md font-bold text-primary">
          Resume Builder
        </span>

        <span
          aria-label="Document status: Draft"
          className="px-sm py-[2px] bg-surface-container text-secondary text-label-xs font-bold rounded uppercase tracking-wider"
        >
          Draft
        </span>
      </div>

      {children && (
        <div className="hidden md:flex items-center h-full">{children}</div>
      )}

      <div className="flex items-center gap-md">
        <button
          aria-label="View edit history"
          className="p-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            history
          </span>
        </button>

        <button
          aria-label="Preview resume"
          className="p-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            visibility
          </span>
        </button>

        <div
          className="h-6 w-[1px] bg-outline-variant mx-xs"
          aria-hidden="true"
        />

        <button className="px-md py-sm text-secondary border border-outline-variant text-label-md font-label-md rounded hover:bg-surface-container transition-colors">
          Share Link
        </button>

        <button className="px-md py-sm bg-primary text-on-primary text-label-md font-label-md rounded hover:opacity-90 transition-all">
          Export PDF
        </button>
      </div>
    </nav>
  );
};

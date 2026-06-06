import { GlobalNavLinks } from "./global-nav-links";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        id="main-sidebar"
        aria-label="Main navigation"
        className={`
          h-screen w-64 fixed left-0 top-0
          bg-background border-r border-outline-variant
          flex flex-col py-lg px-md z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <SidebarHeader />

        <button
          aria-label="Create a new resume"
          className="mb-lg w-full bg-primary-container text-on-primary text-label-md font-label-md py-md rounded transition-all hover:opacity-90 flex items-center justify-center gap-sm"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden="true"
          >
            add
          </span>
          New Resume
        </button>

        <GlobalNavLinks />

        <SidebarFooter />
      </aside>
    </div>
  );
};

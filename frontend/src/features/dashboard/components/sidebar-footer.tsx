// src/features/dashboard/components/sidebar-footer.tsx
import Link from "next/link";
import { UserProfile } from "./ui/profile"; // Adjust relative path if needed

export function SidebarFooter() {
  return (
    <div className="mt-auto pt-lg border-t border-outline-variant">
      <Link
        href="/help"
        className="flex items-center gap-md px-md py-sm text-secondary hover:bg-surface-container-high transition-colors rounded"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          help
        </span>
        <span className="font-body-md text-body-md">Help Center</span>
      </Link>

      {/* Dynamic Profile Session Layer */}
      <UserProfile />
    </div>
  );
}

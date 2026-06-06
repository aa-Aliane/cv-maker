import Link from "next/link";

export function SidebarHeader() {
  return (
    <div className="mb-xl">
      <Link href="/dashboard" className="block">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          CV Architect
        </span>
      </Link>
      <p className="font-label-sm text-label-sm text-secondary mt-xs">
        Professional Plan
      </p>
    </div>
  );
}

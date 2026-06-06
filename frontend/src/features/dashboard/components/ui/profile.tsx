import { useCurrentUser } from "@/features/auth/queries/use-auth-mutations";

export const UserProfile = () => {
  // Pull data, loading state, and error state directly from the server query
  const { data: user, isLoading, isError } = useCurrentUser();

  // Fallbacks for loading states or guest sessions
  const displayName = user?.fullName || user?.username || "Guest";
  const userTier = user?.plan || "Standard User";

  if (isError) {
    // Handle authentication failure gracefully (e.g., fallback UI or redirect trigger)
    return <div className="text-label-xs text-error">Session Error</div>;
  }

  return (
    <button className="flex items-center gap-3 ...">
      {/* ... Avatar Container ... */}

      <div className="flex flex-col text-left">
        {isLoading ? (
          // Skeleton loader to prevent layout shifts while fetching
          <div className="space-y-1">
            <div className="h-4 w-24 animate-pulse rounded bg-surface-variant/40" />
            <div className="h-3 w-16 animate-pulse rounded bg-surface-variant/30" />
          </div>
        ) : (
          <>
            <span className="text-label-sm font-label-md text-on-surface">
              {displayName}
            </span>
            <span className="text-label-xs text-secondary">{userTier}</span>
          </>
        )}
      </div>
    </button>
  );
};

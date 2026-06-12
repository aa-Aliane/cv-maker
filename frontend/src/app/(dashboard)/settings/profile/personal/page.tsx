import { PersonalIdentityCard } from "@/features/settings/components/personal-identity-card";
import { SocialPresenceCard } from "@/features/settings/components/social-presence-card";

export default function PersonalPage() {
  return (
    <div className="space-y-lg">
      <PersonalIdentityCard />
      <SocialPresenceCard />
    </div>
  );
}

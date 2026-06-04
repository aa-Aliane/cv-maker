"use client";

import PersonalInfoSection from "./personal-info";
import EducationSection from "./education";
import SkillsSection from "./skills";
import ExperienceSection from "./experience";

export default function ResumeSections() {
  return (
    <div className="space-y-6 p-6">
      <PersonalInfoSection />

      <EducationSection />
      <SkillsSection />

      <ExperienceSection />
    </div>
  );
}

"use client";

import React from "react";
import { CvData } from "@/features/cv-builder/types";

// ── CSS: tokens first, then layout, then section modules ────────────────
import "./tokens.css";
import layout from "./layout.module.css";
import sidebar from "./sidebar.module.css";
import main from "./main.module.css";

interface Props {
  data: CvData;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Split a newline-delimited textarea value into non-empty bullet strings. */
function toBullets(text?: string): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Sub-components (flat, no extra files needed at this stage)
// ---------------------------------------------------------------------------

function SidebarSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className={sidebar.section}>
      <h3 className={sidebar.sectionHeading}>{heading}</h3>
      {children}
    </div>
  );
}

function MainSection({
  heading,
  icon,
  children,
}: {
  heading: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className={main.section}>
      <h3 className={main.sectionHeading}>
        <span className={`material-symbols-outlined ${main.sectionIcon}`}>
          {icon}
        </span>
        {heading}
      </h3>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Aurora Template
// ---------------------------------------------------------------------------

const AuroraTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, skills, experience, education } = data;

  return (
    <div className={`aurora-root ${layout.canvas}`}>
      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
      <aside className={layout.sidebar}>
        {/* Profile photo */}
        <div className={sidebar.photoWrap}>
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.fullName} profile`}
              className={sidebar.photo}
            />
          ) : (
            <div className={sidebar.photoPlaceholder}>Photo</div>
          )}
        </div>

        {/* Contact */}
        <SidebarSection heading="Contact">
          <ul className={sidebar.contactList}>
            {personalInfo.phone && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  call
                </span>
                {personalInfo.phone}
              </li>
            )}
            {personalInfo.email && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  mail
                </span>
                {personalInfo.email}
              </li>
            )}
            {personalInfo.location && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  location_on
                </span>
                {personalInfo.location}
              </li>
            )}
            {personalInfo.linkedin && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  link
                </span>
                {personalInfo.linkedin}
              </li>
            )}
          </ul>
        </SidebarSection>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <SidebarSection heading="Skills">
            <div className={sidebar.skillList}>
              {skills.map((skill) =>
                typeof skill === "string" ? (
                  /* Plain string skill — render as tag */
                  <div key={skill} className={sidebar.skillItem}>
                    <div className={sidebar.skillMeta}>
                      <span>{skill}</span>
                    </div>
                  </div>
                ) : (
                  /* Skill object with level — render with progress bar */
                  <div key={(skill as any).name} className={sidebar.skillItem}>
                    <div className={sidebar.skillMeta}>
                      <span>{(skill as any).name}</span>
                      <span className={sidebar.skillPercent}>
                        {(skill as any).level}%
                      </span>
                    </div>
                    <div className={sidebar.skillTrack}>
                      <div
                        className={sidebar.skillFill}
                        style={{ width: `${(skill as any).level}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </SidebarSection>
        )}

        {/* Languages */}
        {personalInfo.languages && personalInfo.languages.length > 0 && (
          <SidebarSection heading="Languages">
            <ul className={sidebar.langList}>
              {personalInfo.languages.map((lang: any) => (
                <li key={lang.name ?? lang} className={sidebar.langItem}>
                  <span className={sidebar.langName}>{lang.name ?? lang}</span>
                  {lang.level && (
                    <span className={sidebar.langLevel}>{lang.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {/* Interests */}
        {personalInfo.interests && personalInfo.interests.length > 0 && (
          <SidebarSection heading="Interests">
            <div className={sidebar.tagCloud}>
              {personalInfo.interests.map((interest: string) => (
                <span key={interest} className={sidebar.tag}>
                  {interest}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}
      </aside>

      {/* ── RIGHT MAIN COLUMN ─────────────────────────────────────────── */}
      <div className={layout.main}>
        {/* Header */}
        <header className={main.header}>
          <h1 className={main.name}>{personalInfo.fullName || "Your Name"}</h1>
          <h2 className={main.title}>
            {personalInfo.title || "Professional Title"}
          </h2>
          {personalInfo.summary && (
            <p className={main.summary}>{personalInfo.summary}</p>
          )}
        </header>

        {/* Experience */}
        <MainSection heading="Professional Experience" icon="work">
          {experience && experience.length > 0 ? (
            <div className={main.timeline}>
              {experience.map((exp, i) => {
                const bullets = toBullets(exp.responsibilities);
                return (
                  <div
                    key={exp.id}
                    className={`${main.entry} ${i > 0 ? main.entrySecondary : ""}`}
                  >
                    <h4 className={main.entryTitle}>{exp.role}</h4>
                    <div className={main.entryMeta}>
                      <span className={main.entryOrg}>{exp.company}</span>
                      {exp.startDate && (
                        <>
                          <span className={main.entrySep}>•</span>
                          <span className={main.entryDates}>
                            {exp.startDate} — {exp.endDate || "Present"}
                          </span>
                        </>
                      )}
                    </div>
                    {bullets.length > 0 && (
                      <ul className={main.bulletList}>
                        {bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={main.empty}>No experience added yet.</p>
          )}
        </MainSection>

        {/* Education */}
        <MainSection heading="Education" icon="school">
          {education && education.length > 0 ? (
            <div className={main.timeline}>
              {education.map((edu) => (
                <div key={edu.id} className={main.eduEntry}>
                  <h4 className={main.entryTitle}>{edu.degree}</h4>
                  <div className={main.entryMeta}>
                    <span className={main.entryOrg}>{edu.institution}</span>
                  </div>
                  {(edu as any).note && (
                    <p className={main.eduNote}>{(edu as any).note}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={main.empty}>No education added yet.</p>
          )}
        </MainSection>
      </div>
    </div>
  );
};

export default AuroraTemplate;

export interface Language {
  name: string;
  level: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface PersonalInfo {
  // From User model
  first_name: string;
  last_name: string;
  email: string;

  // From Profile model
  headline?: string | null;
  bio?: string | null;
  picture_url?: string | null;
  phone_number?: string | null;
  location?: string | null;
  driving_license?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  website_url?: string | null;
  tier?: string;

  // Frontend only (for now)
  languages?: Language[];
  interests?: string[];

  // Compatibility (Optional)
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
  phoneNumber?: string;
  drivingLicense?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description?: string | null;
  
  // Compatibility
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description?: string | null;

  // Compatibility
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
}

export interface CvData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: (string | Skill)[];
  experience: WorkExperience[];
}

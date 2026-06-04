export interface Language {
  name: string;
  level: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
  linkedin?: string;
  summary?: string;
  languages?: Language[];
  interests?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  note?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface CvData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: (string | Skill)[];
  experience: WorkExperience[];
}

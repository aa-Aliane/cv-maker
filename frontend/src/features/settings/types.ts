export interface Profile {
  headline?: string;
  bio?: string;
  picture_url?: string;
  phone_number?: string;
  location?: string;
  driving_license?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  tier?: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  bullets?: string[];
}

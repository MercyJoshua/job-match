export interface Resume {
  id: number;
  name: string;
  url: string;
  file?: File; 
  extractedSkills?: string[];
  text?: string;
}

  export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    requiredSkills: string[];
    matchScore: number;
  }
  
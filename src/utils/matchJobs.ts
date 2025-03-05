interface JobListing {
    id: string;
    title: string;
    requiredSkills: string[];
  }
  
  export const matchJobs = (resumeSkills: string[], jobListings: JobListing[]) => {
    return jobListings
      .map((job) => {
        const matchCount = resumeSkills.filter((skill) => job.requiredSkills.includes(skill)).length;
        const similarity = matchCount / job.requiredSkills.length;
  
        return { ...job, matchScore: similarity };
      })
      .sort((a, b) => b.matchScore - a.matchScore); 
  };
  
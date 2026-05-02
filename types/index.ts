export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  default_branch: string;
  pushed_at: string;
  created_at: string;
  size: number;
  forks_count: number;
  open_issues_count: number;
}

export interface EnhancedRepo extends GitHubRepo {
  bannerUrl?: string;
  priority?: boolean;
}

export interface ProjectDetailData extends EnhancedRepo {
  readme?: string;
  languages?: Record<string, number>;
}

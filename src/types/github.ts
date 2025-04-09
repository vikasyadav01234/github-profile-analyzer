export interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
  }
  
  export interface UserData {
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
  }
  
  export interface CommitActivity {
    date: string;
    count: number;
  }
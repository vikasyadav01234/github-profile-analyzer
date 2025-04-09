const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUserData(username: string): Promise<UserData> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

export async function fetchUserRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
}

// Note: This is a simplified version. GitHub's API has rate limits
export async function fetchCommitActivity(username: string): Promise<CommitActivity[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch commit activity');
  }
  const events = await response.json();
  
  // Process push events to get commit counts
  const commitsByDate = new Map<string, number>();
  events
    .filter((event: any) => event.type === 'PushEvent')
    .forEach((event: any) => {
      const date = event.created_at.split('T')[0];
      commitsByDate.set(date, (commitsByDate.get(date) || 0) + event.payload.size);
    });

  return Array.from(commitsByDate.entries()).map(([date, count]) => ({
    date,
    count,
  }));
}
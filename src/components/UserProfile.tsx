import { useEffect, useState } from 'react';
import { UserData, Repository, CommitActivity } from '../types/github';
import { fetchUserData, fetchUserRepositories, fetchCommitActivity } from '../api/github';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserProfileProps {
  username: string;
}

export function UserProfile({ username }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commitActivity, setCommitActivity] = useState<CommitActivity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [user, repos, commits] = await Promise.all([
          fetchUserData(username),
          fetchUserRepositories(username),
          fetchCommitActivity(username),
        ]);

        setUserData(user);
        setRepositories(repos);
        setCommitActivity(commits);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt={username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <CardTitle>{userData.name || username}</CardTitle>
              <p className="text-sm text-gray-500">{userData.bio}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div>Repositories: {userData.public_repos}</div>
            <div>Followers: {userData.followers}</div>
            <div>Following: {userData.following}</div>
          </div>
        </CardContent>
      </Card>

      {/* Commit Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={commitActivity}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Repositories List */}
      <div className="grid gap-4 md:grid-cols-2">
        {repositories.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  {repo.name}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{repo.description}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>🔤 {repo.language}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
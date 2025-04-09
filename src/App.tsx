import { useState } from 'react';
import { UserProfile } from './components/UserProfile';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

function App() {
  const [username, setUsername] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedUsername(username);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold">GitHub Profile Analyzer</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="max-w-xs"
          />
          <Button type="submit">Search</Button>
        </form>

        {searchedUsername && <UserProfile username={searchedUsername} />}
      </main>
    </div>
  );
}

export default App;
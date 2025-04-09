# GitHub Profile Analyzer

A React application built with TypeScript that fetches and displays GitHub user profile information and repository statistics.

## Features

- View detailed GitHub user profile information
- Display user repositories with stats (stars, forks, language)
- Search functionality for GitHub usernames
- Responsive UI built with Tailwind CSS
- Type-safe implementation with TypeScript
- Fast development build with Vite

## Technologies Used

- React 18
- TypeScript 5
- Vite
- Tailwind CSS
- GitHub REST API
- React DOM
- ESLint (for code linting)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vikasyadav01234/github-profile-analyzer.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Enter a GitHub username in the search field
2. View the user's:
   - Profile information (avatar, name, bio)
   - Repository statistics
   - Most used programming languages
3. Click on repository cards to visit them on GitHub

## Project Structure

```
github-profile-analyzer/
├── src/
│   ├── api/           # GitHub API integration
│   ├── components/    # React components
│   ├── types/         # TypeScript interfaces
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── vite.config.ts     # Vite configuration
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the production build

## Configuration

The application uses the public GitHub API. For higher rate limits, you can:

1. Create a GitHub personal access token
2. Add it to your environment variables as `VITE_GITHUB_TOKEN`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

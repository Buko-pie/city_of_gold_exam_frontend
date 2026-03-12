# Book Explorer

A React-based web application for browsing, searching, and managing books from the Gutenberg Project catalog.

## Features

- **Book Discovery & Search**: Browse paginated catalog and search by title, author, or subject
- **Detailed Information**: View comprehensive book metadata including authors, translators, subjects, and available formats
- **Collection Management**: Create custom collections and manage favorite books
- **Related Works**: Explore books related to your current selection
- **Responsive UI**: Intuitive interface with real-time loading indicators

## Tech Stack

- **React 18.2** - UI framework
- **TypeScript 5.3** - Type-safe development
- **Zustand 4.4** - State management
- **Vite 5.0** - Build tool and dev server
- **Vitest 1.0** - Unit testing

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:5173` with HMR enabled.

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Testing

```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

## Configuration

### Environment Variables

Create a `.env` file in the project root to configure the backend API URL:

```
VITE_API_URL=http://localhost:3000
```

The default is `http://localhost:3000` if not specified.

## Project Structure

```
src/
├── components/      # React UI components
├── hooks/          # Custom React hooks for business logic
├── stores/         # Zustand state management stores
├── types/          # TypeScript type definitions
├── App.tsx         # Root application component
└── main.tsx        # Application entry point
```

## Development Guidelines

- **Components**: One component per file with co-located CSS
- **Naming**: PascalCase for components, camelCase for hooks/stores
- **TypeScript**: Explicit interfaces for all props and return types
- **State**: Use Zustand stores for global state, custom hooks for business logic
- **Styling**: CSS files co-located with components using kebab-case class names

# ErrandMate - Base MiniApp

Your neighborhood's on-demand helper network. A Base MiniApp connecting neighbors for local errand running and task completion, facilitating easy posting, matching, and payment.

## Features

- **Task Posting**: Create detailed task listings with photos, location, and budget
- **Runner Matching**: Browse and accept tasks in your area
- **In-App Messaging**: Secure communication between task posters and runners
- **Secure Payments**: Base wallet integration for safe transactions
- **Rating System**: Build trust through user ratings and reviews
- **Route Optimization**: Basic route suggestions for runners with multiple tasks

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Coinbase L2)
- **Wallet Integration**: OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your OnchainKit API key:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
├── post-task/          # Task posting page
├── messages/           # Chat functionality
├── profile/            # User profile and stats
├── settings/           # App settings and themes
├── theme-preview/      # Theme customization
├── globals.css         # Global styles and themes
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page with task feed
└── providers.tsx       # OnchainKit provider setup

lib/
├── types.ts            # TypeScript type definitions
└── mock-data.ts        # Sample data for development
```

## Design System

ErrandMate features a warm, community-focused design with:

- **Default Theme**: Dark teal background with coral accents (#ff6b6b)
- **Multiple Themes**: Support for Celo, Solana, Base, and Coinbase themes
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Accessibility**: ARIA labels and keyboard navigation support

## Key Components

- **AppShell**: Main layout with bottom navigation
- **TaskCard**: Displays task information with status badges
- **Avatar**: User profile pictures with fallback initials
- **RatingStars**: Interactive and display rating components
- **Button**: Multiple variants (primary, secondary, outline, destructive)
- **Input/Textarea**: Form components with validation states

## Development

The app uses mock data for development. Key files:

- `lib/mock-data.ts`: Sample users and tasks
- `lib/types.ts`: TypeScript interfaces
- `app/components/`: Reusable UI components

## Deployment

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Any platform supporting Node.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the Base ecosystem using OnchainKit.

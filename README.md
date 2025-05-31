# Tindev - Developer-Client Matching Platform

Tindev is a modern platform that connects developers with potential clients, similar to how Tinder matches people. The platform allows developers to showcase their skills and clients to find the perfect developer for their projects.

## Features

- User authentication for both developers and clients
- Profile creation with skills, experience, and portfolio
- Swipe-based matching system
- Real-time chat between matched users
- Project proposal and negotiation system
- Rating and review system

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Real-time Communication: Socket.io
- Authentication: NextAuth.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add necessary environment variables (see `.env.example`)

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
tindev/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/         # Utility functions
│   ├── models/      # Database models
│   └── styles/      # Global styles
├── public/          # Static files
└── server/         # Backend server code
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 
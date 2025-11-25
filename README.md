# Bounty Creation Platform

A comprehensive multi-step form application for creating and managing bounties on the Impact Miner platform. This application allows users to create digital or physical bounties with detailed information about rewards, sponsors, and impact certificates.

## ✅ Project Overview

This is a Next.js-based web application that provides a user-friendly interface for creating bounties. The application features:

- **Multi-step Form**: A 6-step wizard for creating bounties (Brief, Criteria, Microtasks, Config, Backer, Rewards)
- **Form Validation**: Real-time validation with error messages
- **Dynamic Form Fields**: Conditional fields based on bounty type (digital/physical)
- **Currency Conversion**: Automatic USD conversion for multiple currencies (INR, USD, EUR, GBP)
- **File Upload**: Logo upload functionality with preview
- **Success Page**: Confirmation page with bounty details and print functionality
- **Draft Saving**: Save as draft functionality on the first step

### Navigation Flow

1. **Step 1 (Brief)**: Enter basic bounty details (title, description, project, type, impact core, mode)
2. **Step 5 (Backer)**: Configure sponsor/backer information (optional)
3. **Step 6 (Rewards)**: Set budget, winners, impact points, and certificates
4. **Confirmation**: Review and confirm bounty creation
5. **Success**: View created bounty details with countdown redirect

## ✅ Technology Stack

### Core Framework
- **Next.js 16.0.4** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Development Tools
- **ESLint** - Code linting with Next.js config
- **TypeScript** - Static type checking

### Key Libraries
- **next/image** - Optimized image component
- **next/navigation** - Client-side navigation

## ✅ Code Structure Explanation

```
bounty-creation/
├── app/                          # Next.js App Router directory
│   ├── page.tsx                  # Main bounty creation form (multi-step)
│   ├── success/
│   │   └── page.tsx              # Success page after bounty creation
│   ├── layout.tsx                # Root layout component
│   └── globals.css               # Global styles
│
├── components/                    # Reusable React components
│   ├── Button.tsx                # Primary/secondary button component
│   ├── CurrencySelect.tsx        # Currency dropdown with custom styling
│   ├── Dropdown.tsx              # Generic dropdown/select component
│   ├── FileUpload.tsx            # File upload with preview
│   ├── InputField.tsx            # Text/number input with variants
│   ├── NavigationButtons.tsx     # Back/Next/Create buttons
│   ├── RequiredStar.tsx          # Required field indicator
│   ├── StepCircle.tsx            # Step indicator circles
│   ├── TextAreaField.tsx         # Textarea component
│   ├── Toggle.tsx               # Toggle switch component
│   └── ToggleGroup.tsx           # Radio button group
│
├── constants/                     # Application constants
│   └── index.ts                  # All constants (options, limits, rates)
│
├── public/                        # Static assets
│   ├── *.png                     # Images
│   └── *.gif                     # Animations
│
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                   # Dependencies and scripts
```

### Component Architecture

The application follows a component-based architecture with:

- **Reusable Components**: All form inputs, buttons, and UI elements are extracted into reusable components
- **Type Safety**: Full TypeScript support with proper type definitions
- **Centralized Constants**: All configuration values, options, and limits are stored in `constants/index.ts`
- **Separation of Concerns**: Business logic in page components, UI logic in reusable components

### Key Features

1. **Form State Management**: Uses React hooks (`useState`, `useMemo`, `useEffect`) for state management
2. **Validation**: Step-by-step validation with error messages
3. **Currency Conversion**: Real-time USD conversion using rates from constants
4. **Local Storage**: Bounty payload stored in localStorage for success page
5. **Responsive Design**: Mobile-first responsive layout using Tailwind CSS

## ✅ Setup & Run Instructions

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## ✅ Build & Deployment Instructions

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Live Vercel Link



### Environment Variables

Currently, no environment variables are required. If you need to add API endpoints or configuration:

1. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

2. Access in code:
   ```typescript
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   ```

## ✅ Assumptions or Limitations

### Assumptions

1. **No Backend Integration**: The application currently uses localStorage for data persistence. In production, you would need to:
   - Integrate with a backend API for saving bounties
   - Implement authentication/authorization
   - Add database persistence

2. **Currency Rates**: Currency conversion rates are hardcoded in constants. In production:
   - Rates should be fetched from a currency API
   - Rates should update periodically
   - Consider historical rate tracking

3. **File Upload**: File uploads create object URLs. In production:
   - Files should be uploaded to cloud storage (S3, Cloudinary, etc.)
   - Implement file size and type validation on the server
   - Add image optimization/compression

4. **Form Validation**: Client-side validation only. In production:
   - Add server-side validation
   - Implement CSRF protection
   - Add rate limiting

5. **Success Page Data**: Success page reads from localStorage. In production:
   - Fetch bounty data from API using ID
   - Handle cases where data doesn't exist
   - Add error handling for missing data

### Limitations

1. **No Authentication**: The app doesn't include user authentication. Users cannot:
   - Log in/log out
   - View their created bounties
   - Edit existing bounties

2. **No Data Persistence**: Bounty data is only stored in localStorage:
   - Data is lost if localStorage is cleared
   - No server-side backup
   - Cannot share bounties between devices

3. **Limited Error Handling**: Error handling is basic:
   - No retry mechanisms
   - Limited error messages
   - No error logging/monitoring

4. **No Draft Loading**: "Save as draft" button exists but doesn't persist drafts:
   - Drafts are not saved anywhere
   - Cannot load previously saved drafts

5. **Static Options**: Dropdown options are hardcoded:
   - Cannot dynamically add projects, bounty types, etc.
   - Requires code changes to update options

6. **No Image Optimization**: Uploaded images are not optimized:
   - Large files may cause performance issues
   - No automatic resizing/compression

7. **Browser Compatibility**: Uses modern JavaScript features:
   - May not work in older browsers
   - Requires modern browser with ES6+ support



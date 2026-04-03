# Pomodoro Timer

A simple, elegant Pomodoro timer built with React and Vite.

**Live Demo**: <https://pomodoro-eight-omega.vercel.app/>

## Features

- **Pomodoro Timer**: Customizable work sessions with automatic cycle tracking
- **Short & Long Breaks**: Automatic alternation between short breaks and a long break after every 4 pomodoro sessions
- **Customizable Durations**: Adjust pomodoro, short break, and long break durations via the settings panel (1-60 minutes)
- **Persistent Settings**: Timer preferences are saved to localStorage
- **Browser Notifications**: Desktop notifications when a session or break ends
- **Sound Effects**: Audio feedback for button clicks and session transitions
- **Tab Title Timer**: Remaining time displayed in the browser tab title
- **Responsive Design**: Works on desktop and mobile browsers

## Tech Stack

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **use-sound** - Audio playback hooks
- **@mdi/react** - Material Design Icons
- **CSS Modules** - Scoped styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/miljab/pomodoro.git

cd pomodoro

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open <http://localhost:5173> in your browser.

### Build

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

### Lint

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
pomodoro/
├── src/
│   ├── components/
│   │   ├── Timer.jsx        # Timer logic and display
│   │   └── Settings.jsx     # Settings modal with sliders
│   ├── styles/
│   │   ├── App.module.css
│   │   ├── Timer.module.css
│   │   ├── Settings.module.css
│   │   └── index.css
│   ├── assets/
│   │   ├── click.mp3
│   │   ├── notification.mp3
│   │   └── tomato-icon.png
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## How It Works

1. **Start a Pomodoro**: Click the play button to begin a 25-minute work session (default)
2. **Take Breaks**: After each pomodoro, a short break starts automatically. After 4 pomodoros, a long break begins
3. **Skip/Reset**: Use the skip button to advance to the next cycle, or reset to start fresh
4. **Customize**: Click the gear icon to adjust timer durations to your preference

## Deployment

This project is deployed on [Vercel](https://vercel.com/).

## License

MIT

# Ballistic Bullseye

A browser-based multiplication quiz game where math questions fly across the screen and players type answers to shoot them down.

## How It Works

Questions appear as moving objects scrolling across the screen at three vertical lanes. Players type a numeric answer and press Enter — if the answer matches any active question, that question is eliminated and a point is scored. Each correct answer is worth 5 points.

The game ends when either the timer runs out or all questions have passed off screen.

## Difficulty Levels

| Difficulty | Questions | Timer   |
|------------|-----------|---------|
| Easy       | 10        | 30 sec  |
| Medium     | 20        | 60 sec  |
| Hard       | 30        | 120 sec |

## Features

- Animated questions powered by GSAP
- Online leaderboard with optional 3-letter initial submission
- Offline fallback — works without a server, saves high score locally
- Scores tracked per-user session via MongoDB

## Stack

**Frontend:** Vanilla JS, HTML, CSS, GSAP (animations), jQuery, CryptoJS  
**Backend:** Node.js, Express, Mongoose, MongoDB

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB connection string:
   ```
   URI=mongodb+srv://...
   PORT=4200
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open `index.html` in a browser (or serve the root directory statically).

> The game will automatically fall back to offline mode if the backend is unreachable.

## Project Structure

```
├── index.html       # Difficulty selector / home page
├── game.html        # Game screen
├── gameEnd.html     # End screen with score and leaderboard
├── engine.js        # Core game logic, input handling, server communication
├── game.js          # Animation and question rendering
├── main.js          # End screen data fetching and leaderboard rendering
├── selector.js      # Difficulty selection and navigation
├── styles.css       # Shared styles
├── backend/
│   ├── app.js       # Express app and API routes
│   └── models/
│       ├── user.js  # User schema
│       └── score.js # Score schema
└── server.js        # HTTP server entry point
```

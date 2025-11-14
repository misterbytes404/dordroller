# Dord Roller: Twitch D&D Stream Manager

A modular, real-time web application suite for managing D&D games on Twitch streams.

## Project Structure

```
DordRoller/
├── backend/          # Node.js server with Express & Socket.io
├── gm-client/        # GM control panel web app
├── player-client/    # Player remote interface web app
├── obs-client/       # OBS browser source display
└── shared/           # Shared utilities and types
```

## Technology Stack

- **Backend**: Node.js, Express.js, Socket.io, SQLite
- **Frontend**: Modern JavaScript (ES6+)
- **Real-time**: WebSocket via Socket.io

## Development Roadmap

1. **MVP 1**: GM-to-OBS Dice Roller
2. **MVP 2**: GM Stat Tracker
3. **MVP 3**: Player Client Integration

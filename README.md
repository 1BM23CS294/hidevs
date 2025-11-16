# Self-Managed Logging Aggregator

This project is an AI-driven log aggregator designed to retrieve and analyze logs, detect patterns, and provide insights without relying on external logging services. It showcases a real-time dashboard for monitoring logs and infrastructure health, with an integrated AI analysis feature powered by the Google Gemini API.

## Features

- **Real-Time Log Streaming:** A continuously updating, auto-scrolling view of incoming logs, color-coded by log level for easy readability.
- **AI-Powered Analysis:** Leverages the Google Gemini API to analyze recent logs, identify patterns, detect anomalies, and provide actionable recommendations.
- **Metrics Dashboard:** Visualizes key performance indicators, including real-time processing latency and log completeness percentage.
- **Infrastructure Health Monitoring:** Displays the simulated status (Healthy, Degraded, Unhealthy) of critical infrastructure components like AWS, Kubernetes, and a SQL database.
- **Self-Contained Simulation:** Uses a mock service to generate a realistic stream of logs, simulating a live production environment.
- **Modern & Responsive UI:** Built with React, TypeScript, and Tailwind CSS for a clean, responsive, and intuitive user experience.

## Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Data Visualization:** Recharts
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

## Getting Started

To run this application, you need a Google Gemini API key.

### API Key Setup

The application is configured to use an API key from the environment variable `process.env.API_KEY`. Please ensure this variable is set in your execution environment before running the application.

The application will automatically pick up this key for all interactions with the Gemini service.

## Project Structure

```
.
├── components/          # Reusable React components
│   ├── AiAnalysis.tsx
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── InfrastructureStatus.tsx
│   ├── LogStream.tsx
│   └── MetricsDashboard.tsx
├── services/            # Logic for external interactions
│   ├── geminiService.ts   # Handles communication with the Gemini API
│   └── mockLogService.ts  # Simulates log generation
├── App.tsx              # Main application component
├── index.html           # HTML entry point
├── index.tsx            # React application root
├── metadata.json        # Application metadata
└── types.ts             # TypeScript type definitions
```

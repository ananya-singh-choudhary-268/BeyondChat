BeyondChats Article Improver

An end-to-end system that scrapes articles from BeyondChats, enhances them using AI with external references, and allows users to compare the original and AI-improved versions through a simple web interface.

Overview

This project demonstrates a modular, multi-service architecture designed to showcase web scraping, AI-assisted content enhancement, and frontend–backend integration.

The system performs the following tasks:

Scrapes and stores articles from BeyondChats

Automatically discovers relevant external reference articles

Uses AI to improve clarity, structure, and depth while avoiding plagiarism

Allows users to compare original and AI-enhanced versions side by side

The primary focus of this project is system design, correctness, robustness, and AI integration, rather than visual UI polish.

Architecture and Design Decisions

The application is intentionally split into independent services to ensure clarity, scalability, and fault isolation.

Laravel (Backend)

Scrapes articles from BeyondChats using a custom command

Stores articles and metadata in a relational database

Exposes REST APIs consumed by both the frontend and AI service

Acts as the single source of truth for article data

Node.js (AI Service)

Fetches the latest scraped articles from the backend

Discovers relevant external reference articles automatically

Uses an LLM to rewrite and improve content while preserving factual correctness

Saves AI-improved versions as separate records linked to the original article

Includes graceful fallback handling when AI API quota is exceeded

React (Frontend)

Fetches article data via REST APIs

Displays a list of scraped articles

Allows users to toggle between original and AI-improved versions

Renders article content safely as HTML for accurate formatting

This separation ensures that scraping, AI processing, and presentation remain loosely coupled and independently testable.

Tech Stack
Backend

Laravel

SQLite (chosen for simplicity and easy local setup)

AI Service

Node.js

Axios

SerpAPI (for reference discovery)

OpenAI API (for content improvement)

Frontend

React

React Hooks

Fetch API

How to Run Locally
Backend (Laravel)
cd backend
composer install
php artisan migrate
php artisan serve


Backend runs at:
http://127.0.0.1:8000

AI Service (Node.js)
cd ai-service
npm install
node index.js


Required environment variables:

OPENAI_API_KEY

SERPAPI_API_KEY

Frontend (React)
cd frontend
npm install
npm start


Frontend runs at:
http://localhost:3000

Application Flow

The Laravel backend scrapes articles from BeyondChats and stores them in the database

The AI service:

Fetches stored articles

Discovers relevant external reference content

Generates AI-improved versions linked to the original articles

The React frontend:

Fetches article data via APIs

Displays original and AI-improved content

Enables side-by-side comparison through a simple toggle

Key Features

Automated article scraping

Reference-aware AI content enhancement

Clear separation of concerns across services

Side-by-side comparison of original and improved articles

Graceful handling of AI API quota limitations

Minimal but functional UI focused on clarity and correctness

Error Handling and Robustness

The frontend handles API failures gracefully without crashing

The AI service provides fallback placeholder content if the AI API quota is exceeded

No secrets or API keys are committed to the repository

All services can run independently for easier debugging

Notes and Limitations

AI-generated content depends on external API availability and quota limits

When the AI quota is exceeded, placeholder content is shown instead of failing silently

The UI is intentionally minimal to emphasize backend logic and AI workflows

This project prioritizes correctness and system design over production-scale optimizations

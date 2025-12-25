BeyondChats Article Improver

An end-to-end system that scrapes articles from BeyondChats, enriches them using AI with external references, and allows users to compare the original and AI-improved versions through a simple web interface.

Overview

This project demonstrates a multi-service architecture where:

-Articles are scraped and stored from BeyondChats

-External reference articles are discovered automatically

-AI rewrites improve clarity, structure, and depth without plagiarism

-Users can view original and AI-enhanced versions side by side

The focus of this project is system design, correctness, and AI integration rather than UI polish.

Architecture

Laravel (Backend)

-Scrapes articles from BeyondChats

-Stores articles in the database

-Exposes REST APIs

Node.js (AI Service)

-Finds relevant reference articles

-Uses an LLM to improve original articles

-Saves AI-updated versions

React (Frontend)

-Lists scraped articles

-Allows toggling between original and AI versions

-Renders article content as HTML

Tech Stack

Backend

-Laravel

-SQLite

AI Service

-Node.js

-Axios

-SerpAPI

-OpenAI API

Frontend

-React

-Hooks

-Fetch API

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

-Laravel backend scrapes BeyondChats articles and stores them

-AI service fetches articles, finds reference content, and generates improved versions

-React frontend fetches data from the backend and displays original and AI-improved articles

Key Features

-Automated article scraping

-Reference-aware AI content improvement

-Clean separation of services

-Side-by-side article comparison

-Graceful fallback when AI quota is exceeded

Notes and Limitations

-AI-generated content depends on API quota availability

-If the AI quota is exceeded, placeholder content is shown

-The UI is intentionally minimal to focus on backend and AI logic

License

This project was created for assignment and evaluation purposes.

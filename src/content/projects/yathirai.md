---
title: "Yathir.ai"
description: "AI-driven route optimization platform solving the Traveling Salesperson Problem with Time Windows (TSPTW) using FastAPI, Next.js, and geospatial radial clustering."
date: 2024-05-10
url: "https://yathirai-eight.vercel.app"
github: "https://github.com/AloysiusSundar"
tags: ["Python", "FastAPI", "Next.js", "TypeScript", "Geospatial", "Dynamic Programming", "AI"]
featured: true
---

Yathir.ai (formerly TripIt) is a high-performance travel planning and route optimization engine. It solves the Traveling Salesperson Problem with Time Windows (TSPTW) to deliver hyper-optimized, multi-day itineraries backed by real-time traffic data and semantic AI intelligence.

## Core Architecture & Features

### 1. Deterministic Time-Window Routing (TSPTW)
Standard routing engines optimize purely for spatial distance; Yathirai treats time as a strict topological dimension. The core Held-Karp dynamic programming solver locks hard bookings (e.g., a 7:00 PM dinner reservation) into the execution matrix as immutable graph anchors. By executing parallel fetches against TomTom’s live traffic matrices, the engine mathematically guarantees wait-time efficiency and actively prevents transit delays from causing schedule drift.

### 2. Geospatial Load Balancing (Multi-Day Partitioning)
To bypass the exponential complexity of massive itineraries, the partitioning layer pre-processes geographic POIs through a radial clustering algorithm. It dynamically segments high-density markers into logical "Daily Sectors," utilizing the user's accommodation as the priority centroid anchor. This constraint-aware clustering minimizes inter-daily travel overhead and enforces realistic travel pacing.

### 3. The Intelligence Pipeline (LLM & Vector Search)
Yathirai utilizes a dual-engine AI architecture to drive itinerary generation:
- **The Magic Parser:** An LLM agent extracts entities, temporal constraints, and base coordinates directly from unstructured natural language prompts.
- **Semantic Discovery:** Integrates Cohere AI (`embed-english-v3.0`) for high-dimensional vector similarity ranking, converting user intent into dynamic OpenStreetMap Overpass QL queries to surface context-aware, hyper-relevant locations.

## Tech Stack
- **Frontend:** Next.js 16 (React 19), TypeScript, Leaflet, Globe.gl, Framer Motion, Tailwind CSS
- **Backend:** FastAPI (Python), NumPy/SciPy, TomTom API, OpenRouteService (ORS)
- **Intelligence:** Gemini 1.5 Flash (NLP), Cohere V3 (Vector Search & Ranking)

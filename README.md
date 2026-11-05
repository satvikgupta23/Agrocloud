<div align="center">

# 🌾 AgroCloud

### Next-Generation Cloud Platform for Precision Agriculture & Field Intelligence

[![GitHub Repo](https://img.shields.io/badge/GitHub-satvikgupta23%2FAgrocloud-blue?logo=github)](https://github.com/satvikgupta23/Agrocloud)
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD_3--Clause-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**AgroCloud** fuses satellite observation, live hyper-local weather telemetry, soil science, and computer-vision diagnostics to deliver explainable, data-driven agricultural intelligence.

</div>

---

## 📌 Overview

**AgroCloud** is a modular precision agronomy and crop intelligence platform designed to bridge the gap between raw environmental sensors, satellite telemetry, and actionable farm-level insights.

Rather than only showing that vegetation health has dropped, AgroCloud correlates multi-spectral imagery with live meteorological data (temperature, rainfall, evapotranspiration) and soil physical chemistry (texture, pH, organic carbon) to explain **why** changes occur (e.g., distinguishing acute water stress from fungal infections before chemical sprays are misapplied).

---

## ✨ Key Features & Latest Updates

### 🔬 1. Soil & Crop Diagnostic Studio
* **Interactive Diagnostic Studio:** Instant upload or live camera capture for multi-spectral crop leaf and soil photo analysis.
* **Real-Time Camera Integration:** Full HTML5 `getUserMedia` camera support with rear/front lens switching (`environment` vs `user`), live preview, and fallback image picker.
* **In-Browser Computer Vision Pixel Extraction:**
  * Client-side canvas sampling for average RGB, Hue, Saturation, Brightness, and Luminance.
  * Correlation with standard **Munsell Soil Color Charts** (e.g., 10YR 5/3 Alluvial, 10YR 2/2 Black Vertisol, 5YR 4/6 Red Loam, 2.5YR 4/8 Laterite, 10YR 7/4 Arid Desert Sand, 10YR 3/3 Terai Loam).
  * Automated deduction of structural tilth, visual organic matter, surface crusting risk, and drainage aeration.
* **34 Calibrated Agro-Ecological Indian Crop Profiles:**
  * **Vegetables (सब्जियां):** Tomato (Tamatar), Potato (Aloo), Onion (Pyaz), Chili (Mirch), Brinjal (Baingan), Cauliflower (Phoolgobhi), Cabbage (Patthogobhi), Green Peas (Matar), Okra (Bhindi), Carrot (Gajar), Garlic (Lahsun), Spinach (Palak), Cucumber (Kheera), Bitter Gourd (Karela).
  * **Fruits & Horticulture (फल व बागवानी):** Mango (Aam), Guava (Amrud), Pomegranate (Anar), Papaya (Papita), Banana (Kela), Lemon (Nimbu), Watermelon (Tarbooz), Grapes (Angoor), Indian Jujube (Ber), Cashew (Kaju).
  * **Staples, Cereals, Pulses & Cash Crops (अनाज, दलहन व नकदी):** Wheat (Gehun), Rice / Paddy (Dhan), Maize (Makka), Bajra (Pearl Millet), Chickpea / Bengal Gram (Chana), Mustard (Sarson), Soybean, Groundnut (Moongphali), Cotton (Kapas), Sugarcane (Ganna).
* **Categorized Multi-Tier Recommendations:**
  * Dedicated tabs for **Top Vegetables**, **Top Fruits & Horticulture**, and **Top Staples & Cash Crops**, along with overall suitability rankings.
* **Dynamic Indian Agricultural Season Engine:**
  * Real-time calendar alignment detecting **Rabi (रबी)**, **Kharif (खरीफ)**, or **Zaid (जायद)** seasons.
  * Season-weighted suitability scoring favoring crops within their active sowing and growth calendar.
* **Target Crop Agronomic Viability Evaluation ("Can I grow crop X here?"):**
  * **"Why No" Root-Cause Diagnosis:** Detects specific limiting factors including soil pH extremes (acidity/alkalinity), off-season heat/cold stress, rainfall deficit, clay compaction, or insufficient organic carbon.
  * **"What to Change" Actionable Remedies:** Delivers precise corrective prescriptions (e.g., Agricultural Lime $\text{CaCO}_3$ dosages for acidic soils, Agricultural Gypsum or Elemental Sulfur with canal flushing for alkaline soils, Sesbania green manuring, drip irrigation scheduling, and organic manure incorporation).
* **Calibrated Regional Indian Soil & Climate Presets:**
  * Indo-Gangetic Alluvial Loam (Punjab / Haryana)
  * Deccan Black Vertisol (Maharashtra / Vidarbha)
  * Red Sandy Loam (Karnataka / South Deccan)
  * Desert Arid Sandy Soil (Rajasthan / Thar Basin)
  * Acidic Laterite Soil (Kerala / Western Ghats)
  * Terai Wetland Clay Loam (Uttar Pradesh / Bihar)
* **Live Environmental Telemetry (Open-Meteo & ISRIC SoilGrids 2.0):**
  * Live ambient temperature, relative humidity, wind speed, and precipitation.
  * Sub-surface soil temperature ($0\,\text{cm}$ and $6\,\text{cm}$) and volumetric soil moisture ($0\text{--}1\,\text{cm}$ and $1\text{--}3\,\text{cm}$).
  * Automated **"Vapsa" (वतर)** seedbed moisture status verdict.
  * 7-day cumulative **Growing Degree Days (GDD)**, daily GDD accumulation rate, and reference **Evapotranspiration ($\text{ET}_0$)**.
  * Soil chemical and physical parameters: pH, Soil Organic Carbon (SOC), Cation Exchange Capacity (CEC), and USDA texture classification.
  * Built-in direct client fallbacks ensuring uninterrupted operation if local API proxies are offline.

### 🛰️ 2. Multi-Spectral Satellite Field Monitoring
* **Vegetation & Water Indices:** Automatic computation of **NDVI**, **EVI**, **SAVI** (with calibrated soil adjustment factor $L$), and **NDWI** derived from ESA **Sentinel-2** 10-meter imagery.
* **Automated STAC Ingestion:** Element 84 Earth Search STAC catalog integration with 24-month historical backfill and weekly auto-update cycles.
* **ML Field Boundary Detection:** Automatic field boundary extraction using the FTW (Fields of The World) deep learning model with polygon review workflows.

### 📊 3. Agronomic Risk & Multi-Signal Stress Engine
* **Water Balance & Stress Attribution:** Real-time water balance tracking ($\text{Rainfall} - \text{ET}_0$) to separate drought stress from pathology.
* **Soil Health Risk Indicators:** Automatic computation of acidification, compaction, nutrient leaching, waterlogging, and rooting impediment risks.
* **Smart Soil Sampling Zones:** Clustered zone recommendations based on intra-field spatial variability.
* **Carbon Sequestration Estimation:** Baseline topsoil carbon stock calculations across field boundaries.

### 🌐 4. Enterprise-Grade Delivery Surfaces
* **MapLibre GL Vector & Raster Mapping:** High-performance mapping with PMTiles basemaps, custom index colormaps, and interactive field polygon inspection.
* **Interactive Time-Series (Apache ECharts):** Percentile distribution bands, NDVI timelines, and overlaid meteorological graphs.
* **Multi-Tenant Organization Architecture:** Tenant isolation via `X-Org-Id` and JWT session headers with granular RBAC (`owner`, `admin`, `member`, `viewer`).
* **Internationalization & Themes:** Full bilingual support (English and Spanish) and native dark/light theme switching.

---

## 🏗️ Architecture

AgroCloud follows a decoupled, 3-layer service-oriented architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Layer C: Delivery Surfaces                      │
│   Next.js 14 Web UI · Soil & Crop Studio · MapLibre Maps · REST API    │
├────────────────────────────────────────────────────────────────────────┤
│                     Layer B: AgroCloud Intelligence                    │
│   Crop Suitability (4-Pillar Model) · Phenology · Anomaly Alerts       │
│   Diagnostic Studio Engine · Water Balance · Soil Risk Modeling        │
├────────────────────────────────────────────────────────────────────────┤
│                    Layer A: Environmental Observation                  │
│   Copernicus Sentinel-2 · Open-Meteo Telemetry · ISRIC SoilGrids 2.0   │
└────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technologies |
|---|---|
| **Web Frontend** | [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [MapLibre GL](https://maplibre.org/), [Apache ECharts](https://echarts.apache.org/) |
| **Backend Services** | [FastAPI](https://fastapi.tiangolo.com/), [Python 3.11](https://python.org/), [Pydantic v2](https://docs.pydantic.dev/), [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (async), [Alembic](https://alembic.sqlalchemy.org/), [Uvicorn](https://www.uvicorn.org/) |
| **Telemetry & Data** | [Open-Meteo API](https://open-meteo.com/), [ISRIC SoilGrids 2.0](https://soilgrids.org/), [Element 84 STAC](https://element84.com/earth-search/), [Sentinel-2](https://dataspace.copernicus.eu) |
| **Geospatial & Storage** | [TiTiler](https://developmentseed.org/titiler/) (Cloud-Optimized GeoTIFFs), [PostgreSQL](https://www.postgresql.org/) / [PostGIS](https://postgis.net/), [MinIO](https://min.io/) S3 object storage |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20+ and **npm** v10+
* **Python**: v3.11+
* *(Optional)* **Docker & Docker Compose**: For containerized deployment

---

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/satvikgupta23/Agrocloud.git
cd Agrocloud
```

#### 2. Configure Environment Variables
Copy the example environment files for both services:
```bash
# Root environment file
cp .env.example .env

# Web environment
cp apps/web/.env.example apps/web/.env.local
```

#### 3. Run the Next.js Frontend
```bash
cd apps/web
npm install
npm run dev
```
> **Windows Tip:** If PowerShell script execution policy restricts `npm.ps1`, use `npm.cmd run dev`.

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

#### 4. Run the FastAPI Backend
In a separate terminal:
```bash
cd services/api

# Create & activate a virtual environment (Windows PowerShell)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -e ".[dev]"

# Start Uvicorn ASGI server
python -m uvicorn app.main:app --reload --port 8000
```
* **API Documentation (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### Full Stack via Docker Compose
To launch the entire platform stack including PostgreSQL/PostGIS, Redis, MinIO, TiTiler, FastAPI, and Next.js:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

---

## 📁 Repository Structure

```text
Agrocloud/
├── apps/
│   └── web/                               # Next.js 14 frontend application
│       ├── messages/                      # Internationalization dictionaries (en, es)
│       ├── public/
│       │   └── samples/                   # Reference crop & soil sample imagery
│       └── src/
│           ├── app/
│           │   ├── [locale]/              # Localized application routes & dashboard
│           │   └── api/                   # Next.js serverless API routes
│           │       ├── analyze-crop/      # Crop diagnostic engine & suitability scorer
│           │       ├── soil/              # SoilGrids telemetry proxy
│           │       └── weather/           # Open-Meteo weather telemetry proxy
│           ├── components/
│           │   ├── crop-diagnostic-studio.tsx  # Soil & Crop Studio interface & live camera
│           │   ├── landing-page.tsx            # Modern AgroCloud landing interface
│           │   └── sidebar.tsx                 # Navigation & workspace management
│           └── lib/                       # API clients, auth, and utilities
├── services/
│   ├── api/                               # FastAPI asynchronous REST backend
│   │   ├── app/
│   │   │   ├── core/                      # Config, security, rate limiting, logging
│   │   │   ├── models/                    # SQLAlchemy database models
│   │   │   ├── routers/                   # API route handlers
│   │   │   │   ├── diagnostics.py         # AgroCloud crop & soil diagnostics
│   │   │   │   ├── monitoring.py          # Satellite index analytics
│   │   │   │   ├── weather.py             # Meteorological integrations
│   │   │   │   └── soil.py                # Soil profile endpoints
│   │   │   └── tasks/                     # Celery asynchronous background tasks
│   │   ├── pyproject.toml
│   │   └── uv.lock
│   └── tiler/                             # TiTiler Cloud-Optimized GeoTIFF raster server
├── docker-compose.yml                     # Multi-container production stack
├── docker-compose.dev.yml                 # Local development overrides
└── README.md
```

---

## 🧪 Verification & Quality Checks

Run code quality and type validation before committing:

```bash
# Frontend validation
cd apps/web
npm run lint          # ESLint rules
npm run type-check     # TypeScript strict compilation (tsc --noEmit)
npm run build          # Production Next.js build

# Backend validation
cd services/api
ruff check .           # Python linting
ruff format --check .  # Code format check
```

---

## 📜 License

Distributed under the **BSD 3-Clause License**. See [`LICENSE`](LICENSE) for full details.

---

## 👤 Author & Maintainer

* **Satvik Gupta** – [@satvikgupta23](https://github.com/satvikgupta23)
* **Repository:** [https://github.com/satvikgupta23/Agrocloud](https://github.com/satvikgupta23/Agrocloud)

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

### 📍 1. Zero-Photo GPS Soil & Nationwide Pedological Intelligence
* **Zero-Photo Soil Prediction:** Completely eliminates the need for soil photographs. Derives comprehensive physical, chemical, and pedological soil health parameters purely from **GPS coordinates (Latitude & Longitude)** or browser location detection.
* **Pan-India Soil Survey Integration:** Deep geospatial database mapping coordinates to India's official pedological zones and USDA Soil Orders:
  * **Indo-Gangetic Alluvial Silt Loam** (*Inceptisols / Entisols* - Punjab, Haryana, UP, Bihar, Bengal)
  * **Deccan Black Cotton Vertisol / Regur** (*Vertisols* - Maharashtra, MP, Gujarat Saurashtra, North Karnataka)
  * **Peninsular Red Loam** (*Alfisols* - Karnataka, Telangana, Andhra Pradesh, Tamil Nadu)
  * **Thar Desert Arid Sandy Soil** (*Aridisols* - Rajasthan, North Gujarat)
  * **Western Ghats & Coastal Laterite** (*Oxisols / Ultisols* - Kerala, Coastal Konkan, Goa)
  * **Sub-Himalayan Terai Humus Loam** (*Mollisols* - Himalayan foothills of UP, Bihar, Uttarakhand)
* **Empirical Soil Telemetry Blending:** Seamlessly combines live **ISRIC SoilGrids 2.0 (250m)** satellite telemetry with national pedological models for global accuracy:
  * Soil pH in $\text{H}_2\text{O}$ with agronomic status classification (Acidic, Neutral, Alkaline, Sodic).
  * Soil Organic Carbon (SOC in $\text{g/kg}$) and Organic Matter percentage.
  * Cation Exchange Capacity (CEC in $\text{cmol(c)/kg}$) and base saturation.
  * Precise texture breakdown (Clay %, Sand %, Silt %) and USDA texture classification.
  * Structural tilth, surface crusting risk, compaction index, and drainage/aeration dynamics.
  * Macro-nutrient retention capacity (N, P, K status) and rootzone salinity risk.
* **Live Sub-Surface Telemetry (Open-Meteo):**
  * Sub-surface soil temperature at $0\,\text{cm}$ and $6\,\text{cm}$.
  * Volumetric soil moisture at $0\text{--}1\,\text{cm}$ and $1\text{--}3\,\text{cm}$.
  * Real-time automated **"Vapsa" (वतर)** seedbed moisture status verdict.
* **Calibrated Regional Indian Presets:** 1-click geolocation switching across major agricultural belts (Punjab, Maharashtra, Karnataka, Thar Desert, UP/Bihar Terai, Kerala, Bengal Delta).
* **Target Crop Viability Evaluator ("Can I grow crop X here?"):**
  * Root-cause diagnostic identifying exact limiting factors (pH bottleneck, off-season timing, water deficit, clay compaction).
  * Actionable corrective prescriptions (Agricultural Lime $\text{CaCO}_3$ dosages, Agricultural Gypsum, Elemental Sulfur, Sesbania green manuring, drip scheduling).
* **Categorized Crop Recommendations:** Ranked multi-tier recommendations for **Top Vegetables**, **Top Fruits & Horticulture**, and **Top Staples & Cash Crops** calibrated for the field's GPS soil and seasonal window.
* **Dedicated Soil & Field Scope:** Houses the complete field intelligence suite including the Target Crop Viability Dossier, Categorized Crop Recommendations, Monsoon Hydrology & Water Balance, and the AgroCloud Precision Action Plan.

### 🌿 2. AI Crop Health & Foliar Disease Diagnostic Studio
* **Any Crop Photo Intake:** Accepts **ANY crop leaf, stem, or plant photo** uploaded by the user or captured directly via the real-time HTML5 camera (with front/rear lens switching).
* **Focused Pathology Interface:** Provides a streamlined, uncluttered disease diagnostic view focused exclusively on plant pathology, foliar health metrics, pathogen identification, and actionable treatment protocols (isolating soil suitability dossiers to the GPS Soil section).
* **AI Plant Pathology Detection Engine:**
  * Analyzes foliar visual indicators: chlorosis distribution, necrotic target rings, pustule patterns, mosaic leaf curling, and canopy brightness/saturation degradation.
  * Diagnoses diseases across major Indian crop systems (Tomato, Potato, Wheat, Rice/Paddy, Cotton, Mustard, Maize, Soybean, Sugarcane, Chili, Grapevine) and universal general foliage:
    * **Early & Late Blights** (*Alternaria solani*, *Phytophthora infestans*)
    * **Yellow Stripe & Brown Rusts** (*Puccinia striiformis*, *Puccinia triticina*)
    * **Rice Blast & Bacterial Leaf Blight** (*Magnaporthe oryzae*, *Xanthomonas oryzae*)
    * **Viral Leaf Curl Syndromes** (*Begomovirus* vectored by Whiteflies)
    * **White Rust & Staghead** (*Albugo candida*)
    * **Anthracnose, Leaf Spots & Nutrient Chlorosis**
* **Comprehensive Diagnostic Report:**
  * **Crop Vitality Score (0-100%)** and Health Status badge (*Healthy*, *Mild Stress*, *Moderate Disease*, *Severe Infection*).
  * **Bilingual Nomenclature:** Primary diagnosed condition presented in English and Hindi (e.g., *Early Blight (Alternaria solani) · अगेती झुलसा रोग*).
  * **Pathogen Classification:** Identifies pathogen type (*Fungal*, *Bacterial*, *Viral*, *Pest Infestation*, *Nutrient Deficiency*, or *Healthy Foliage*).
  * **Visible Symptoms Observed:** Itemized list of detected lesions, target spots, chlorotic halos, or curling patterns.
  * **Pathology Notes:** Detailed agronomic explanation of how the pathogen invades tissues and spreads across fields.
* **Weather & Soil Telemetry Correlation:**
  * Direct agronomic attribution explaining how ambient temperature, relative humidity, recent 7-day rainfall, and soil moisture enabled pathogen germination (e.g., humidity >75% at 24°C facilitating conidial spore incubation within 6-8 hours).
* **3-Pillar Treatment Protocol:**
  1. **Fast-Acting Chemical Curatives:** Exact active ingredients, commercial brand names (e.g., Mancozeb 75% WP, Azoxystrobin + Difenoconazole, Tricyclazole, Imidacloprid), and recommended dosages per liter of water.
  2. **Biological & Organic Controls:** Bio-control agents (*Trichoderma viride*, *Pseudomonas fluorescens*, Neem Oil 10,000 ppm, bio-fungicides) with application and preparation directions.
  3. **Cultural & Preventative Practices:** Agronomic sanitation, lower foliage pruning, drip irrigation scheduling, and crop rotation guidelines.
* **1-Click Disease Testing Presets:** Instant testing samples for Tomato Early Blight, Rice Blast, Wheat Stripe Rust, Cotton Leaf Curl, Mustard White Rust, and Maize Foliar Blight.

### 🛰️ 3. Multi-Spectral Satellite Field Monitoring
* **Vegetation & Water Indices:** Automatic computation of **NDVI**, **EVI**, **SAVI** (with calibrated soil adjustment factor $L$), and **NDWI** derived from ESA **Sentinel-2** 10-meter imagery.
* **Automated STAC Ingestion:** Element 84 Earth Search STAC catalog integration with 24-month historical backfill and weekly auto-update cycles.
* **ML Field Boundary Detection:** Automatic field boundary extraction using the FTW (Fields of The World) deep learning model with polygon review workflows.

### 📊 4. Agronomic Risk & Multi-Signal Stress Engine
* **Water Balance & Stress Attribution:** Real-time water balance tracking ($\text{Rainfall} - \text{ET}_0$) to separate drought stress from pathology.
* **Soil Health Risk Indicators:** Automatic computation of acidification, compaction, nutrient leaching, waterlogging, and rooting impediment risks.
* **Smart Soil Sampling Zones:** Clustered zone recommendations based on intra-field spatial variability.
* **Carbon Sequestration Estimation:** Baseline topsoil carbon stock calculations across field boundaries.

### 🌐 5. Enterprise-Grade Delivery Surfaces
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

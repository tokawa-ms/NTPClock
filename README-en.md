<p align="center">
  <img src="https://img.shields.io/badge/NTP-Clock-00ff88?style=for-the-badge&logo=clockify&logoColor=white" alt="NTP Clock">
</p>

<h1 align="center">🕐 NTP Clock</h1>

<p align="center">
  A high-precision web clock application synchronized with NTP servers
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/platform-web-lightgrey?style=flat-square" alt="Platform">
</p>

<p align="center">
  <a href="README.md">🇯🇵 日本語</a>
</p>

---

## ✨ Features

| Feature                    | Description                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| **NTP Sync**               | Fetches time from multiple NTP servers with fallback, starting with NICT (`ntp.nict.jp`)             |
| **Digital Clock**          | Neon-style digital display with millisecond precision and blinking colon animation                   |
| **Analog Clock**           | Canvas-rendered classic analog clock with smooth lollipop-style second hand                          |
| **Flip Clock**             | Retro split-flap clock mode toggle                                                                   |
| **Time Signal**            | Countdown beeps (440 Hz) during the last 5 seconds before each hour and an on-the-hour beep (880 Hz) |
| **Time Source Comparison** | Real-time comparison of NTP time, server local time, and browser time                                |
| **Responsive**             | Mobile-friendly layout                                                                               |

## 🏗️ Architecture

```
Browser ←── HTTP/JSON ──→ Express Server ←── SNTP ──→ NTP Servers
                           (port 3000)                 (port 123)
```

- **Server**: Express + [sntp](https://www.npmjs.com/package/sntp), syncs with NTP every 5 minutes
- **Client**: Smooth rendering via `requestAnimationFrame`, re-syncs offset with server every 30 seconds
- **NTP Servers (fallback order)**:
  1. `ntp.nict.jp` (NICT Japan Standard Time)
  2. `ntp.jst.mfeed.ad.jp`
  3. `time.google.com`
  4. `pool.ntp.org`

## 🚀 Quick Start

### Run Locally

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Open http://localhost:3000 in your browser.

### Docker

```bash
# Build the image
docker build -t ntp-clock .

# Run the container
docker run -p 3000:3000 ntp-clock
```

## 📁 Project Structure

```
NTPClock/
├── server.js          # Express server & NTP sync logic
├── public/
│   └── index.html     # Frontend (single-file SPA: HTML/CSS/JS)
├── Dockerfile         # Docker container definition
├── package.json       # Dependencies
└── README.md
```

## ⚙️ API

### `GET /api/time`

Returns NTP-corrected time information.

```json
{
  "serverTime": 1713168000000,
  "serverLocalTime": 1713167999950,
  "offset": 50,
  "lastSync": 1713167700000,
  "syncServer": "ntp.nict.jp"
}
```

| Field             | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| `serverTime`      | number | NTP-corrected timestamp (ms)          |
| `serverLocalTime` | number | Server's local timestamp (ms)         |
| `offset`          | number | NTP offset (ms)                       |
| `lastSync`        | number | Timestamp of the last successful sync |
| `syncServer`      | string | NTP server that was used for sync     |

## 🎨 UI

The application uses a two-pane layout:

- **Left pane (dark)** — NTP-synced digital clock, flip clock mode, time signal countdown, sync info, time source comparison
- **Right pane (light)** — Analog clock, digital time, date display

## 🔧 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 4
- **NTP**: [sntp](https://www.npmjs.com/package/sntp) (SNTP protocol)
- **Frontend**: Vanilla JS, Canvas API, Web Audio API
- **Container**: Docker (node:22-alpine)

## 📄 License

MIT

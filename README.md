<p align="center">
  <img src="https://img.shields.io/badge/NTP-Clock-00ff88?style=for-the-badge&logo=clockify&logoColor=white" alt="NTP Clock">
</p>

<h1 align="center">🕐 NTP Clock</h1>

<p align="center">
  NTP サーバーと同期した高精度なウェブ時計アプリケーション
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/platform-web-lightgrey?style=flat-square" alt="Platform">
</p>

---

## ✨ 特徴

| 機能               | 説明                                                                               |
| ------------------ | ---------------------------------------------------------------------------------- |
| **NTP 同期**       | NICT (`ntp.nict.jp`) をはじめ複数の NTP サーバーからフォールバック付きで時刻を取得 |
| **デジタル時計**   | ミリ秒精度のネオン風デジタル表示。コロンの点滅アニメーション付き                   |
| **アナログ時計**   | Canvas 描画のクラシックなアナログ時計。ロリポップ型秒針のスムーズアニメーション    |
| **パタパタ時計**   | レトロな Flip Clock モードに切り替え可能                                           |
| **時報サウンド**   | 毎正時前 5 秒間のカウントダウンビープ (440 Hz) と正時のビープ (880 Hz)             |
| **時刻ソース比較** | NTP 時刻 / サーバーローカル時刻 / ブラウザ時刻をリアルタイムに比較表示             |
| **レスポンシブ**   | モバイルデバイスにも対応したレイアウト                                             |

## 🏗️ アーキテクチャ

```
ブラウザ ←── HTTP/JSON ──→ Express サーバー ←── SNTP ──→ NTP サーバー
                              (port 3000)                 (port 123)
```

- **サーバー**: Express + [sntp](https://www.npmjs.com/package/sntp) で 5 分ごとに NTP 同期
- **クライアント**: `requestAnimationFrame` ベースの滑らかな描画。30 秒ごとにサーバーとオフセットを再同期
- **NTP サーバー (フォールバック順)**:
  1. `ntp.nict.jp` (NICT 日本標準時)
  2. `ntp.jst.mfeed.ad.jp`
  3. `time.google.com`
  4. `pool.ntp.org`

## 🚀 クイックスタート

### ローカル実行

```bash
# 依存パッケージのインストール
npm install

# サーバー起動
npm start
```

ブラウザで http://localhost:3000 を開きます。

### Docker

```bash
# イメージのビルド
docker build -t ntp-clock .

# コンテナの起動
docker run -p 3000:3000 ntp-clock
```

## 📁 プロジェクト構造

```
NTPClock/
├── server.js          # Express サーバー & NTP 同期ロジック
├── public/
│   └── index.html     # フロントエンド (HTML/CSS/JS 一体型 SPA)
├── Dockerfile         # Docker コンテナ定義
├── package.json       # 依存パッケージ定義
└── README.md
```

## ⚙️ API

### `GET /api/time`

NTP 補正済みの時刻情報を返します。

```json
{
  "serverTime": 1713168000000,
  "serverLocalTime": 1713167999950,
  "offset": 50,
  "lastSync": 1713167700000,
  "syncServer": "ntp.nict.jp"
}
```

| フィールド        | 型     | 説明                                  |
| ----------------- | ------ | ------------------------------------- |
| `serverTime`      | number | NTP 補正済みタイムスタンプ (ms)       |
| `serverLocalTime` | number | サーバーのローカルタイムスタンプ (ms) |
| `offset`          | number | NTP オフセット (ms)                   |
| `lastSync`        | number | 最終同期時刻のタイムスタンプ          |
| `syncServer`      | string | 同期に成功した NTP サーバー名         |

## 🎨 UI

アプリケーションは 2 ペイン構成です。

- **左ペイン (ダーク)** — NTP 同期デジタル時計、パタパタ時計モード、時報カウントダウン、同期情報、時刻ソース比較
- **右ペイン (ライト)** — アナログ時計、デジタル時刻、日付表示

## 🔧 技術スタック

- **Runtime**: Node.js
- **Framework**: Express 4
- **NTP**: [sntp](https://www.npmjs.com/package/sntp) (SNTP プロトコル)
- **Frontend**: Vanilla JS, Canvas API, Web Audio API
- **Container**: Docker (node:22-alpine)

## 📄 ライセンス

MIT

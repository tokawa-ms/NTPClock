const express = require('express');
const Sntp = require('sntp');
const path = require('path');

const app = express();
const PORT = 3000;

// NTP servers to try (in order)
const NTP_SERVERS = [
  'ntp.nict.jp',
  'ntp.jst.mfeed.ad.jp',
  'time.google.com',
  'pool.ntp.org'
];

let ntpOffset = 0; // milliseconds offset from local clock
let lastSyncTime = null;
let syncServer = null;

async function syncNtp() {
  for (const server of NTP_SERVERS) {
    try {
      const options = { host: server, port: 123, timeout: 5000 };
      const time = await Sntp.time(options);
      ntpOffset = Math.round(time.t); // offset in ms
      lastSyncTime = Date.now();
      syncServer = server;
      console.log(`NTP sync OK: server=${server}, offset=${ntpOffset}ms`);
      return;
    } catch (err) {
      console.warn(`NTP sync failed for ${server}: ${err.message}`);
    }
  }
  console.error('All NTP servers failed');
}

// Sync every 5 minutes (12 req/h, 288 req/day — within NTP server policy)
syncNtp();
setInterval(syncNtp, 5 * 60 * 1000);

app.use(express.static(path.join(__dirname, 'public')));

// API: return NTP-corrected timestamp and offset info
app.get('/api/time', (req, res) => {
  const now = Date.now();
  res.json({
    serverTime: now + ntpOffset,
    serverLocalTime: now,
    offset: ntpOffset,
    lastSync: lastSyncTime,
    syncServer: syncServer
  });
});

app.listen(PORT, () => {
  console.log(`NTP Clock server running at http://localhost:${PORT}`);
});

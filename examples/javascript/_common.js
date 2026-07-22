/**
 * Shared configuration and helpers for the Quantova JavaScript examples.
 *
 * Point QUANTOVA_GATEWAY at any gateway:
 *   export QUANTOVA_GATEWAY=https://testnet.quantova.io   // public testnet
 *   export QUANTOVA_GATEWAY=http://127.0.0.1:8645          // local node (default)
 *
 * These examples talk to the Quantova gateway the same way QCore.js does. Every
 * call is an HTTP POST to /v1/<method> with a flat JSON body. In a full app you
 * use the QCore facade directly (see the README). Here a tiny gateway helper is
 * included so the examples run without installing @qunatovainc/qcore, while the
 * QCore.js API shape is shown in comments.
 */
'use strict';

const http = require('http');
const https = require('https');
const { URL } = require('url');

const GATEWAY = process.env.QUANTOVA_GATEWAY || 'http://127.0.0.1:8645';

// One QTOV is one million Quon. Quon is the base unit.
const QUON = 1_000_000n;

/** POST /v1/<method> with a flat JSON body, return the parsed JSON result. */
function gw(method, body = {}, base = GATEWAY) {
  const payload = JSON.stringify(body);
  const u = new URL(base.replace(/\/+$/, '') + '/v1/' + method);
  const lib = u.protocol === 'https:' ? https : http;
  const opts = {
    method: 'POST',
    hostname: u.hostname,
    port: u.port || (u.protocol === 'https:' ? 443 : 80),
    path: u.pathname,
    headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(payload) },
  };
  return new Promise((resolve, reject) => {
    const req = lib.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const j = data ? JSON.parse(data) : {};
          if (j && j.error) return reject(new Error(j.error.message || JSON.stringify(j.error)));
          resolve(j);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}


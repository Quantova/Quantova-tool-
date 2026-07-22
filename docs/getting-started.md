# Getting Started

This guide takes you from nothing to reading the chain and submitting your first
ML-DSA-65 signed transaction with the Quantova tools.

## 1. Pick a client

Quantova has two official clients with the same surface, both binding to the Rust
core QCore.rs.

```bash
# JavaScript and TypeScript
npm install @qunatovainc/qcore

# Python
pip install qcore
```

## 2. Choose a gateway

Point the client at a gateway. Every call is an HTTP POST to `/v1/<method>` with a
flat JSON body. There is no WebSocket transport.

| Environment | Gateway base URL |
|---|---|
| Testnet | `https://testnet.quantova.io` |
| Local dev | `http://127.0.0.1:8645` |

Mainnet is not yet live. Quantova is at the testnet and pre audit stage.

```bash
export QUANTOVA_GATEWAY=https://testnet.quantova.io
```

## 3. Connect and read

```python
# QCore.py
from qcore import QCore
q = QCore("https://testnet.quantova.io")
print("head", q.head()["height"])
```

```js
// QCore.js
const { QCore } = require('@qunatovainc/qcore');
const q = new QCore('https://testnet.quantova.io');
console.log('head', (await q.head()).height);
```

Runnable versions are [../examples/python/connect.py](../examples/python/connect.py)
and [../examples/javascript/connect.js](../examples/javascript/connect.js).

## 4. Get a wallet and test funds


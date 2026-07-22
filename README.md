# Quantova Tools

The toolkit hub for building on and integrating with Quantova, a sovereign post
quantum Layer 1 built from scratch. This repository is the catalog. It lists the
tools Quantova publishes, shows how to use them with runnable code, and documents
the stack for developers and for companies.

Quantova is post quantum end to end. Every signature, key exchange, hash, and
transport channel uses Q-Crypto, a from scratch NIST post quantum stack, with no
elliptic curve and no classical public key cryptography anywhere in the chain.
Account authority uses ML-DSA-65 (FIPS 204). Nothing in the chain is vulnerable to
Shor's algorithm.

Quantova is at the testnet and pre audit stage. External security audits are still
ahead. The strong claim we make is the true one. The stack is post quantum end to
end. We do not claim it is audited, unbreakable, or free of bugs.

## Start here

- New to Quantova, read [docs/getting-started.md](docs/getting-started.md).
- Want the full list of tools, read [docs/tools-catalog.md](docs/tools-catalog.md).
- Building something, read [docs/for-developers.md](docs/for-developers.md).
- Evaluating for an organization, read [docs/for-companies.md](docs/for-companies.md).
- Why post quantum, read [docs/post-quantum-overview.md](docs/post-quantum-overview.md).

## Quick example

Connect to the Quantova gateway and read the chain, no keys required.

```python
# QCore.py  (pip install qcore)
from qcore import QCore

q = QCore("https://testnet.quantova.io")
print("head   ", q.head()["height"])
print("account", q.get_account("Q1GZD3AGFY5U426V9NX6UNE06ZC4YVKNK3GU9L3C")["balance"])
```

```js
// QCore.js  (npm install @qunatovainc/qcore)
const { QCore } = require('@qunatovainc/qcore');

const q = new QCore('https://testnet.quantova.io');
console.log('head   ', (await q.head()).height);
console.log('account', (await q.getAccount('Q1GZD3AGFY5U426V9NX6UNE06ZC4YVKNK3GU9L3C')).balance);
```

Build and submit an ML-DSA-65 signed transfer.


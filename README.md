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

```python
# derive an ML-DSA-65 account, its Q1 address begins with a capital Q
sender = q.wallet.create()
signed = q.wallet.sign_transfer(sender, to="Q1GP3FR9CVK3XAJSQGC7DU47WCDUVTFDYMY0H82C", amount=1_500_000)
q.submit_transaction(signed)   # amount is in Quon, one QTOV is one million Quon
```

Read a QAsset token balance from its container storage.

```python
token = q.contract(TOKEN_ADDRESS)          # a Quanta contract, a compiled container
balance = token.balance_of(HOLDER)          # a single word map value
```

Resolve a name under the capital Q top level domain.

```python
addr = q.qns(QNS_REGISTRY).resolve("alice.Q")   # returns a Q1 address
```

Full runnable programs for each of these are in [examples/](examples), in both
QCore.js and QCore.py, and copy paste snippets are in [snippets/](snippets).

## The tools

A short index. The full catalog with descriptions is in
[docs/tools-catalog.md](docs/tools-catalog.md).

**Build**
- **QCore.js**, the official JavaScript and TypeScript client, published on npm as `@qunatovainc/qcore`.
- **QCore.py**, the official Python client.
- **QCore.rs**, the Rust core the other clients bind to.
- **QMask**, the native post quantum wallet browser extension.
- **QVM**, the Quantova Virtual Machine, a register machine that runs compiled containers.
- **Quanta**, the smart contract language where whole exploit classes fail to compile.
- **examples**, runnable sample programs.

**Network and assets**
- **chain-params**, gateway endpoints, genesis, and network parameters.
- **faucet**, free testnet asset, TQTOV.
- **QNS**, the name service under the capital Q top level domain.

**Verify**
- **pq-test-vectors**, known answer vectors and a verifier for the Q-Crypto primitives.
- **node-conformance-tests**, a read only checker for a running node.

## Endpoints

Quantova speaks a plain HTTP gateway. Every call is an HTTP POST to `/v1/<method>`
with a flat JSON body. There is no WebSocket transport.


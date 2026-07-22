# For Developers

How to use the Quantova tools to build, with the common workflows and where each
tool fits. Every workflow below is post quantum by default. Your transactions are
signed with ML-DSA-65 and verified on chain, and the transport channel is secured
with ChaCha20-Poly1305.

## Set up

```bash
npm install @qunatovainc/qcore      # or: pip install qcore
export QUANTOVA_GATEWAY=https://testnet.quantova.io
```

Get a wallet with QMask and free TQTOV from the faucet as in
[getting-started.md](getting-started.md).

## Read state

```python
from qcore import QCore
q = QCore("https://testnet.quantova.io")
head = q.head()
account = q.get_account("Q1GZD3AGFY5U426V9NX6UNE06ZC4YVKNK3GU9L3C")
```

```js
const { QCore } = require('@qunatovainc/qcore');
const q = new QCore('https://testnet.quantova.io');
const head = await q.head();
const account = await q.getAccount('Q1GZD3AGFY5U426V9NX6UNE06ZC4YVKNK3GU9L3C');
```

Under the client, each read is an HTTP POST to a gateway method such as `head`,
`get_account`, `get_block`, or `get_storage`. Full runnable code is in
[../examples/*/connect.*](../examples).

## Submit a transaction, signed with ML-DSA-65

```python
# QCore.py, derive an account and sign a transfer
from qcore import QCore
q = QCore("https://testnet.quantova.io")
sender = q.wallet.create()                 # Q1 address begins with a capital Q
signed = q.wallet.sign_transfer(sender, to=RECIPIENT, amount=1_500_000)  # Quon
q.submit_transaction(signed)
```

A real app registers Quantova's native Q-Crypto backend and submits through the
client. The wallet API is the shape shown in the examples. See
[../examples/python/transfer.py](../examples/python/transfer.py) and
[../examples/javascript/transfer.js](../examples/javascript/transfer.js).

## Work with QVM containers


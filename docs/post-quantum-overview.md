# Post Quantum Overview

What it means that Quantova is post quantum, and how that property holds across the
whole stack.

## The threat

Elliptic curve and RSA signatures that secure classical blockchains can be broken
by a sufficiently capable quantum computer running Shor's algorithm. Because public
keys and signatures are public on chain, an adversary can record them now and forge
them once the hardware exists, a harvest now, decrypt later exposure that makes a
chain's entire history retroactively forgeable.

## Quantova's answer

Quantova is post quantum from the ground up. The cryptography is Q-Crypto, a from
scratch NIST post quantum stack with no elliptic curve and no classical public key
cryptography anywhere in the chain.

- **Signatures**, ML-DSA-65 (FIPS 204) for account and validator authority.
- **Key exchange**, ML-KEM-768 (FIPS 203).
- **Hash based signatures**, SLH-DSA (FIPS 205).
- **Hashing**, SHA-3 and SHAKE (FIPS 202). Hash functions are not broken by the
  quantum attack that breaks elliptic curves.
- **Transport channel**, ChaCha20-Poly1305.

## Accounts and addresses

Every account is derived from an ML-DSA-65 public key. The address is a hash of the
public key under SHA-3 and SHAKE, encoded as a Q1 bech32m string written with a
capital Q. The account is the post quantum key.

## Consensus

Consensus is QORUS, a committee byzantine fault tolerant protocol. Finality is
signed with ML-DSA-65, and the committee is chosen by a budget bounded sortition.
Because block production and finality are post quantum, the chain's agreement layer
is post quantum too.

## How the property holds across the tools

Because the post quantum guarantee is fixed at the lowest layers, every tool
inherits it.

- **QCore.js and QCore.py** build and sign transactions with ML-DSA-65.
- **QMask** manages post quantum keys and produces ML-DSA-65 signatures.
- **QVM** executes compiled containers, and the transaction authorizing each
  invoke is ML-DSA-65 signed.
- **QNS** registrations and updates are ML-DSA-65 signed, so name ownership is post
  quantum.
- **pq-test-vectors** lets anyone confirm an implementation's address derivation,
  hashing, and signatures are correct.

## In short

Quantova is post quantum end to end, with no cryptography vulnerable to Shor's
algorithm. That is the true, strong claim. The stack is at the testnet and pre
audit stage, and external audits are still ahead, so it is not correct to call it
audited, unbreakable, or free of bugs. What is correct is that there is no
classical cryptography in the chain for a quantum computer to break.

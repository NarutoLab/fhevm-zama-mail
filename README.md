<p align="center">
  <img src="https://raw.githubusercontent.com/NarutoLab/fhevm-zama-mail-app/refs/heads/main/packages/site/public/zama-image.jpg" alt="FHEZmail Logo" />
</p>


[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Sepolia Testnet](https://img.shields.io/badge/Network-Sepolia-blue)](#)
[![Ethereum](https://img.shields.io/badge/Platform-Ethereum-purple)](#)
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](#)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](#)

**FHEZmail** is a **decentralized, privacy email platform** on the Ethereum Sepolia testnet. Using **Fully Homomorphic Encryption (FHE)**, all emails are encrypted on-chain, and only the sender and recipient can read their content.

---

## 🌐 Live Demo

- **Testnet Smart Contract:** [`0xCB45011ca6B8CDce01792CBB9B4c999479E94a0E`](https://sepolia.etherscan.io/address/0xCB45011ca6B8CDce01792CBB9B4c999479E94a0E)
- **Frontend (Next.js/React):** [https://fhevm-zmail.netlify.app/](https://fhevm-zmail.netlify.app/) (or deploy your own)

---

## 📖 Project Overview

FHEZmail combines **blockchain** and **FHE encryption** to create an email system that is:

- **Decentralized:** All emails stored on-chain, no central server.
- **Encrypted:** Subjects and bodies encrypted with Fully Homomorphic Encryption.
- **Threaded:** Supports replies and forwards while preserving privacy.
- **Organized:** Emails sorted into **Inbox, Sent, Archive, Star, Spam, Trash, and Read**.

---

## 🏗 Technologies Used

### Smart Contract (On-chain)

- **Solidity 0.8.24**
- **Fully Homomorphic Encryption (FHE):**
- **SepoliaConfig** – Preconfigured Sepolia testnet setup

### Frontend (User Interface)

- **React** – Modern, responsive UI
- **Next.js** – Server-side rendering & optimized builds
- **@zama-fhe/relayer-sdk** – Integrates FHE encryption/decryption on FE

---

## ⚡ Key Features

1. **Send Emails**
   - Encrypts subject & body using FHE
   - Creates copies for sender (`Sent`) and recipient (`Inbox`)
   - Permission management for encryption

2. **Reply**
   - Replies within existing threads
   - Updates boxes and maintains encryption

3. **Forward**
   - Securely forward emails
   - Updates permissions for new recipients

4. **Move Emails**
   - Move emails between boxes
   - TRASH box is handled specially

5. **View Emails & Threads**
   - Fetch mails by box type
   - Fetch full threads with encrypted replies

---

## 🛠 Getting Started

### Prerequisites

- Node.js >= 20
- Yarn or npm
- MetaMask or Web3 wallet
- Sepolia testnet ETH

### Installation

```bash
git clone https://github.com/NarutoLab/fhevm-zama-mail-app.git
cd pakages/site
npm install
```

### Running Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the dApp.

---

## 💻 Smart Contract Interaction

**Contract Address:** [`0xCB45011ca6B8CDce01792CBB9B4c999479E94a0E`](https://sepolia.etherscan.io/address/0xCB45011ca6B8CDce01792CBB9B4c999479E94a0E)

**Key Functions:**

```typescript
// Send a new email
sendMail(to, subjectExternal, subjectProofs, bodyExternal, bodyProofs);

// Reply to a thread
reply(threadId, subjectExternal, subjectProofs, bodyExternal, bodyProofs);

// Forward an email
forward(mailId, to);

// Move emails between boxes
move(mailIds, newBox);

// Fetch emails
(inbox(user),
  sent(user),
  archive(user),
  star(user),
  spam(user),
  trash(user),
  read(user));
```

---

## 🌟 Future Potential

FHEZmail lays the foundation for **next-gen decentralized communication**:

- **Cross-chain Encrypted Messaging**
- **Decentralized Identity Integration** (ENS, DIDs)
- **Encrypted Search & Filters** without decryption

---

## 🔒 Security & Privacy

- Emails are **encrypted on-chain**; only allowed participants can decrypt
- No plaintext stored on-chain
- Full control of permissions using FHE primitives

---

## Documentation

- [Hardhat + MetaMask](https://docs.metamask.io/wallet/how-to/run-devnet/): Set up your local devnet step by step using Hardhat and MetaMask.
- [FHEVM Documentation](https://docs.zama.ai/protocol/solidity-guides/)
- [FHEVM Hardhat](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)
- [@zama-fhe/relayer-sdk Documentation](https://docs.zama.ai/protocol/relayer-sdk-guides/)
- [Setting up MNEMONIC and INFURA_API_KEY](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup#set-up-the-hardhat-configuration-variables-optional)
- [React Documentation](https://reactjs.org/)
- [FHEVM Discord Community](https://discord.com/invite/zama)
- [GitHub Issues](https://github.com/zama-ai/fhevm-react-template/issues)

## License

This project is licensed under the BSD-3-Clause-Clear License - see the LICENSE file for details.

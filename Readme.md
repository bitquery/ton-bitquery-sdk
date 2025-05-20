# bitquery-ton-sdk

A lightweight SDK for querying **TON blockchain** data via the [Bitquery GraphQL API](https://bitquery.io/). Easily fetch real-time **DEX trades**, **token trades**, **top traders**, and **top tokens** from The Open Network (TON).

## 🚀 Features

- Fetch latest **TON DEX trades**
- Get latest trades for specific **TON tokens**
- Identify **top traders** by trade count
- Discover **top tokens** by USD volume
- Built-in **GraphQL queries** powered by Bitquery

---

## 📦 Installation

```bash
npm install bitquery-ton-sdk
```

## 🛠 Usage

### ➤ CommonJS (Node.js default)
```js
const {
  getDexTrades,
  getTokenDexTrades,
  getTopTaders,
  getTopTokens
} = require('bitquery-ton-sdk');

const token = 'YOUR_BITQUERY_API_TOKEN';

getDexTrades(token, 50).then(console.log);
getTokenDexTrades(token, '0:abc123...', 25).then(console.log);
getTopTaders({ token, since: '2024-10-01T00:00:00Z', num: 20 }).then(console.log);
getTopTokens({ token, since: '2024-10-01T00:00:00Z', num: 15 }).then(console.log);
```

### ➤ ES6 Modules (Modern Node.js / Frontend)

```js
import {
  getDexTrades,
  getTokenDexTrades,
  getTopTaders,
  getTopTokens
} from 'bitquery-ton-sdk';

const token = 'YOUR_BITQUERY_API_TOKEN';

const main = async () => {
  const trades = await getDexTrades(token, 50);
  console.log(trades);

  const tokenTrades = await getTokenDexTrades(token, '0:abc123...', 25);
  console.log(tokenTrades);

  const topTraders = await getTopTaders({ token, since: '2024-10-01T00:00:00Z', num: 20 });
  console.log(topTraders);

  const topTokens = await getTopTokens({ token, since: '2024-10-01T00:00:00Z', num: 15 });
  console.log(topTokens);
};

main();
```

**⚠️** To use ESM in Node.js, either rename your file to .mjs or set "type": "module" in your package.json.

## 📚 API Reference

### getDexTrades(token, num)

Fetch latest DEX trades on TON.

- token: Bitquery API token (required)
- num: Number of trades to return (optional, default: 100)

### getTokenDexTrades(token, currency, num)

Get latest DEX trades for a specific token by its smart contract address.

- token: Bitquery API token (required)
- currency: Token smart contract address (required)
- num: Number of trades (optional, default: 100)

### getTopTaders({ token, since, num })

Return top traders on TON by trade count.

- token: Bitquery API token (required)
- since: ISO time string for filtering (optional, default: "2024-10-21T05:36:05Z")
- num: Max results to return (optional, default: 100)

### getTopTokens({ token, since, num })

Return most traded tokens by USD volume.

- token: Bitquery API token (required)
- since: ISO time string for filtering (optional, default: "2024-10-21T05:36:05Z")
- num: Max results to return (optional, default: 100)

## 🔐 Authentication

This SDK uses the Bitquery GraphQL streaming API. You’ll need an Access Token from [Bitquery](https://account.bitquery.io/user/api_v2/access_tokens).

Set your token in each request:

```js
const token = 'your-api-key';
```

## 🧑‍💻 Contributing

We welcome [issues](https://github.com/bitquery/ton-bitquery-sdk/issues) and [pull requests](https://github.com/bitquery/ton-bitquery-sdk/pulls) to improve the SDK.

## 📄 License

MIT
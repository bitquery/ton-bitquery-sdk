const axios = require('axios');
let data = {
    "query": '',
    "variables": "{}"
 };

let config = {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://streaming.bitquery.io/eap',
   headers: { 
      'Content-Type': 'application/json', 
      'Authorization': ''
   },
   data : data
};

// API Endpoint to get latest DEX Trades
const getDexTrades = async (token, num) => {
    config.headers.Authorization = `Bearer ${token}`
    config.data.query = `
        query MyQuery {
            Ton(network: ton) {
                DEXTrades(orderBy: { descending: Block_Time }, limit: { count: ${num == null ? 100 : num} }) {
                    Block {
                        Time
                        Shard
                    }
                    Trade {
                        Buy {
                            Amount
                            Currency {
                                Name
                                SmartContract {
                                Address
                                }
                            }
                            Buyer {
                                Address
                                Workchain
                            }
                        }
                        Dex {
                            ProtocolName
                            SmartContract {
                                Address
                            }
                        }
                        Sell {
                            Amount
                            Currency {
                                Name
                            }
                            Seller {
                                Address
                                Workchain
                            }
                        }
                    }
                    Transaction {
                        Hash
                    }
                }
            }
        }
    `
    try {
        let response = await axios.request(config);
        let data = response.data.data.Ton.DEXTrades;
        return data;
    } catch (error) {
        console.log(error);
    }
}

// API Endpoint to get latest DEX Trades for a token
const getTokenDexTrades = async(token, currency, num) => {
    config.headers.Authorization = `Bearer ${token}`
    config.data.query = `
        query MyQuery {
            Ton(network: ton) {
                DEXTrades(
                orderBy: { descending: Block_Time }
                limit: { count: ${num == null ? 100 : num} }
                where: {
                    any: [
                    {
                        Trade: {
                        Buy: {
                            Currency: {
                            SmartContract: {
                                Address: {
                                is: "${currency}"
                                }
                            }
                            }
                        }
                        }
                    }
                    {
                        Trade: {
                        Sell: {
                            Currency: {
                            SmartContract: {
                                Address: {
                                is: "${currency}"
                                }
                            }
                            }
                        }
                        }
                    }
                    ]
                }
                ) {
                    Block {
                        Time
                        Shard
                    }
                    Trade {
                        Buy {
                        Amount
                        Currency {
                            Name
                            SmartContract {
                            Address
                            }
                        }
                        Buyer {
                            Address
                            Workchain
                        }
                        }
                        Dex {
                        ProtocolName
                        SmartContract {
                            Address
                        }
                        }
                        Sell {
                        Amount
                        Currency {
                            Name
                        }
                        Seller {
                            Address
                            Workchain
                        }
                        }
                    }
                    Transaction {
                        Hash
                    }
                }
            }
        }
    `
    try {
        let response = await axios.request(config);
        let data = response.data.data.Ton.DEXTrades;
        return data;
    } catch (error) {
        console.log(error);
    }
}

// API Endpoint to get Top Traders on Ton based on number of trades
const getTopTaders = async ({ token, since, num } = {}) => {
    config.headers.Authorization = `Bearer ${token}`;
    config.data.query = `
        query DexMarkets {
            Ton {
                DEXTradeByTokens(
                    orderBy: { descendingByField: "trades" }
                    limit: { count: ${num == null ? 100 : num} }
                    where: { 
                        Block: { Time: { since: "${since == null ? "2024-10-21T05:36:05Z" : since}" } },
                        Trade: { Success: true }
                    }
                ) {
                    Trade {
                        Buyer {
                            Address
                            Workchain
                        }
                    }
                    trades: count(if: { Trade: { Side: { Type: { is: buy } } } })
                    tokens: uniq(of: Trade_Currency_SmartContract_Address)
                }
            }
        }
    `;
    try {
        let response = await axios.request(config);
        let data = response.data.data.Ton.DEXTradeByTokens;
        return data;
    } catch (error) {
        console.log(error);
    }
}



// API Endpoint to get top tokens on Ton based on number of trades
const getTopTokens = async({ token, since, num } = {}) => {
    config.headers.Authorization = `Bearer ${token}`
    config.data.query = `
        query {
            Ton {
                DEXTradeByTokens(
                where: {
                    Block: { Time: { since: "${since == null ? "2024-10-21T05:36:05Z": since}" } }
                    Trade: { Success: true }
                }
                orderBy: {descendingByField: "usd"}
                limit: {count: ${num == null ? 100 : num}}
                ) {
                Trade {
                    Currency {
                    Symbol
                    Name
                    SmartContract {
                        Address
                        Workchain
                    }
                    Native
                    }
                    Side {
                    Currency {
                        Symbol
                        Name
                        SmartContract {
                        Address
                        Workchain
                        }
                        Native
                    }
                    }
                    price_last: PriceInUSD(maximum: Block_Number)
                    price_10min_ago: PriceInUSD(
                    maximum: Block_Number
                    if: {Block: {Time: {before: "2024-10-24T05:54:54Z"}}}
                    )
                    price_1h_ago: PriceInUSD(
                    maximum: Block_Number
                    if: {Block: {Time: {before: "2024-10-24T05:04:54Z"}}}
                    )
                    price_3h_ago: PriceInUSD(
                    maximum: Block_Number
                    if: {Block: {Time: {before: "2024-10-24T03:04:54Z"}}}
                    )
                }
                Block {
                    min_time: Time(minimum: Block_Time)
                    max_time: Time(maximum: Block_Time)
                }
                dexes: uniq(of: Trade_Dex_SmartContract_Address)
                amount: sum(of: Trade_Side_Amount)
                usd: sum(of: Trade_Side_AmountInUSD)
                sellers: uniq(of: Trade_Seller_Address)
                buyers: uniq(of: Trade_Buyer_Address)
                count(selectWhere: {ge: "10"})
                }
            }
        }
    `
    try {
        let response = await axios.request(config);
        let data = response.data.data.Ton.DEXTradeByTokens;
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getDexTrades, getTokenDexTrades, getTopTaders, getTopTokens}
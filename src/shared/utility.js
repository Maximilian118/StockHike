// Convert priceArr to data for line chart.
export const candleData = (symbol, priceArr) => {
  return {
    id: symbol,
    min: Math.min(...priceArr),
    max: Math.max(...priceArr),
    data: priceArr.map((price, i) => {
      return {
        "x": i,
        "y": price.toFixed(2),
      }
    }),
  }
}

// Return an array of colours depending on sunrise-sunset data.
// If nothing passed, return default.
export const setColours = sunriseSunset => {
  const defaults = ['#3a3a3c', '#f36b22', '#fcb116']

  if (sunriseSunset) {
    return defaults
  } else {
    return defaults
  }
}

// Remove a symbol the user.symbols array.
export const removeSymbol = (user, setUser, symbol) => {
  const removed = user.symbols.filter(e => e.symbol !== symbol.symbol)

  setUser({
    ...user,
    symbols: removed,
  })

  localStorage.setItem("symbols", JSON.stringify(removed))
}

// List of Supported FinnHub Exchanges
export const finnHubExchanges = {
  stock: ["AS", "AT", "AX", "BA", "BC", "BD", "BE", "BK", "BO", "BR", "CN", "CO", "CR", "DB", "DE", "DU", "F", 
  "HE", "HK", "HM", "IC", "IR", "IS", "JK", "JO", "KL", "KQ", "KS", "L", "LN", "LS", "MC", "ME", "MI", "MU", 
  "MX", "NE", "NL", "NS", "NZ", "OL", "PA", "PM", "PR", "QA", "RG", "SA", "SG", "SI", "SN", "SR", "SS", "ST", 
  "SW", "SZ", "T", "TA", "TL", "TO", "TW", "US", "V", "VI", "VN", "VS", "WA", "HA", "SX", "TG", "SC"],
  forex: ["oanda", "fxcm", "forex.com", "pepperstone", "fxpro", "icmtrader", "ic markets", "octafx", "fxpig"],
  crypto: ["BITFINEX", "KUCOIN", "BITTREX", "KRAKEN", "HUOBI", "BITMEX", "COINBASE", "GEMINI", "OKEX", "BINANCE", 
  "FXPIG", "POLONIEX", "ZB", "HITBTC"],
}
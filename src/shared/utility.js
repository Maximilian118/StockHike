// Convert priceArr to data for line chart.
export const candleData = (symbol, priceArr) => {
  return {
    id: symbol,
    max: Math.max(...priceArr),
    min: Math.min(...priceArr),
    data: priceArr.map((price, i) => {
      return {
        "x": i,
        "y": price,
      }
    }),
  }
}

// Sort the symbols into an array of objects for Candles component.
// Object with the highest max value to the object to the lowest max value.
export const sortSymbols = user => {
  const symbolXYData = []

  for (const symbols in user.symbols) {
    symbolXYData.push(user.symbols[symbols].candles)
  }

  symbolXYData.sort((a, b) => (a.max > b.max) ? 1 : -1)

  return symbolXYData
}

// Remove a key: value pair from context. 
// Function call example: removeKey(user, "nameOfKey")
export const removeKey = (obj, prop) => {
  let {[prop]: omit, ...res} = obj
  return res
}
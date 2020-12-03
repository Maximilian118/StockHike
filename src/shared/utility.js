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
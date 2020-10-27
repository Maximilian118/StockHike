// Convert priceArr to data for line chart.
export const candleData = (symbol, priceArr) => {
  return {
    id: symbol,
    min: Math.min(...priceArr),
    max: Math.max(...priceArr),
    data: priceArr.map((price, i) => {
      return {
        "x": i,
        "y": price,
      }
    }),
  }
}
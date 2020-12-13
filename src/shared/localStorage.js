export const checkUserLS = () => {
  const token = localStorage.getItem("token")
  const refreshToken = localStorage.getItem("refresh_token")
  
  if (!token && !refreshToken) {
    return logout()
  } else {
    return {
      localStorage: true,
      token: token,
      location: JSON.parse(localStorage.getItem("location")),
      symbols: JSON.parse(localStorage.getItem("symbols")),
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")

  return {
    location: localStorage.getItem("location") ? JSON.parse(localStorage.getItem("location")) : {},
    symbols: JSON.parse(localStorage.getItem("defaults")) ? JSON.parse(localStorage.getItem("symbols")) : [],
  }
}

export const checkExchangeLS = () => {
  let exchange = localStorage.getItem("exchange") ? JSON.parse(localStorage.getItem("exchange")) : { display: false }

  if (exchange.display) {
    exchange = {
      ...exchange,
      display: false,
    }
  }

  return exchange
}
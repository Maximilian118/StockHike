export const checkLocalStorage = () => {
  const token = localStorage.getItem("token")
  const refreshToken = localStorage.getItem("refresh_token")
  if (!token && !refreshToken) {
    return logout()
  } else {
    return {
      localStorage: true,
      token: token,
      geo: JSON.parse(localStorage.getItem("geo")),
      ss: JSON.parse(localStorage.getItem("ss")),
      symbols: JSON.parse(localStorage.getItem("symbols")),
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")

  const symbols = localStorage.getItem("symbols") ? JSON.parse(localStorage.getItem("symbols")) : {}

  return {
    geo: JSON.parse(localStorage.getItem("geo")),
    ss: JSON.parse(localStorage.getItem("ss")),
    symbols: symbols.defaults ? symbols : {},
  }
}
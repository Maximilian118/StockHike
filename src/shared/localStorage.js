export const checkLocalStorage = () => {
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

  const symbols = localStorage.getItem("symbols") ? JSON.parse(localStorage.getItem("symbols")) : {}

  return {
    location: JSON.parse(localStorage.getItem("location")),
    symbols: symbols.defaults ? symbols : {},
  }
}
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
      symbols: {},
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")

  return {
    geo: JSON.parse(localStorage.getItem("geo")),
    ss: JSON.parse(localStorage.getItem("ss")),
    symbols: {},
  }
}
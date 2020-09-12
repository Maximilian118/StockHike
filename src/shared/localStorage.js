export const checkLocalStorage = () => {
  const token = localStorage.getItem("token")
  const refreshToken = localStorage.getItem("refresh_token")
  if (!token && !refreshToken) {
    return logout()
  } else {
    const geolocation = JSON.parse(localStorage.getItem("geolocation"))

    return {
      localStorage: true,
      token: token,
      geolocation: geolocation,
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")

  return {
    geolocation: JSON.parse(localStorage.getItem("geolocation")),
  }
}
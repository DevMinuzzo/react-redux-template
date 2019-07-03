export const setSessionStorage = (key, value) => {
  const payload = JSON.stringify(value)
  window.sessionStorage.setItem(key, payload)
}

export const getSessionStorage = (key) => {
  const result = window.sessionStorage.getItem(key)
  return result ? JSON.parse(result) : null
}

export const deleteSessionStorage = (key) => {
  window.sessionStorage.removeItem(key)
}
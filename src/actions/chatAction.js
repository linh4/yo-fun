export const addMessage = (username, msg) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {username, msg}
  }
}

export const addUrl = (url) => {
  return {
    type: 'ADD_URL',
    payload: url
  }
}

export const addMessage = (username, msg) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {username, msg}
  }
}

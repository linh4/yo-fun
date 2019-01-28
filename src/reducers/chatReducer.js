const initialState = {
  messages: [],
  url: "https://www.youtube.com/watch?v=0iX2hJfKBmI"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {...state, messages: [...state.messages, {message: action.payload.msg, username: action.payload.username}]}
    case "ADD_URL":
      return {...state, url: action.payload}
    default:
      return state
  }
}

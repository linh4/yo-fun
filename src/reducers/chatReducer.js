const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {...state, messages: [...state.messages, {message: action.payload.msg, username: action.payload.username}]}
    default:
      return state
  }
}

const initialState = {
  username: null,
  isCreator: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state, username: action.payload}
    case "IS_CREATOR":
      return {...state, isCreator: true}
    case "IS_JOINER":
      return {...state, isCreator: false}
    default:
      return state
  }
}

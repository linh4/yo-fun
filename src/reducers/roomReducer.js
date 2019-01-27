const initialState = {
  roomname: null,
  rooms: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "PICK_ROOM":
      return {...state, roomname: action.payload}
    case 'GET_ROOMS':
      return {...state, rooms: [...action.payload]}
    default:
      return state
  }
}

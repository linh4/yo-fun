export const pickRoom = (room) => {
  return {
    type: "PICK_ROOM",
    payload: room
  }
}

export const getRoom = (room) => {
  return {
    type: "GET_ROOM",
    payload: room
  }
}

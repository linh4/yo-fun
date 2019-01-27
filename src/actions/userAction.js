export const loginUser = (username) => {
  return {
    type: 'LOGIN_USER',
    payload: username
  }
}

export const isCreator = () => {
  return {
    type: 'IS_CREATOR'
  }
}

export const isJoiner = () => {
  return {
    type: 'IS_JOINER'
  }
}

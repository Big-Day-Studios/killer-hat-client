const initialState = {
  username: '',
  password: '',
  id: '',
  nome: '',
  foto: '',
  userType: '',
  token: '',
  response: {}
}

export default (state = initialState, action) => {
  
  switch(action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload.username }
      break;
    case 'SET_PASSWORD':
      return { ...state, password: action.payload.password }
      break;
    case 'SET_ID':
      return { ...state, id: action.payload.id }
      break;
    case 'SET_NOME':
      return { ...state, nome: action.payload.nome }
      break;
    case 'SET_FOTO':
      return { ...state, foto: action.payload.foto }
      break;
    case 'SET_USERTYPE':
      return { ...state, userType: action.payload.userType }
      break;
    case 'SET_TOKEN':
      return { ...state, token: action.payload.token }
      break;
    case 'RESET_TOKEN':
      return { ...state, token: action.payload.token }
      break;
    case 'SET_RESPONSE':
      return { ...state, response: action.payload.response }
      break;
  }

  return state;
}


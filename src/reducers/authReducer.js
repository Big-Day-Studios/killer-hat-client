const initialState = {
  token: '',
  id: '',
  birthday: '',
  email: '',
  first_time: '',
  friends: [],
  items: [],
  name: '',
  password: '',
  username: '',
  foto: '',
  response: {}, 
  language: 'en'
}

export default (state = initialState, action) => {
  
  switch(action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload.token }
      break;
    case 'SET_ID':
      return { ...state, id: action.payload.id }
      break;
    case 'SET_BIRTHDAY':
      return { ...state, birthday: action.payload.birthday }
      break;
    case 'SET_EMAIL':
      return { ...state, email: action.payload.email }
      break;
    case 'SET_FIRST_TIME':
      return { ...state, first_time: action.payload.first_time }
      break;    
    case 'SET_FRIENDS':
      return { ...state, friends: action.payload.friends }
      break;
    case 'SET_ITEMS':
      return { ...state, items: action.payload.items }
      break;
    case 'SET_NAME':
      return { ...state, name: action.payload.name }
      break;
    case 'SET_PASSWORD':
      return { ...state, password: action.payload.password }
      break;
    case 'SET_USERNAME':
      return { ...state, username: action.payload.username }
      break;
    case 'SET_FOTO':
      return { ...state, foto: action.payload.foto }
      break;
    case 'SET_RESPONSE':
      return { ...state, response: action.payload.response }
      break;
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload.language }
      break;
  }

  return state;
}


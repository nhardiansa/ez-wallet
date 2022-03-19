import { CLEAR_AUTH_INFO, SEND_LOGIN_INFO, SET_AUTH_INFO, SET_USER_PIN } from "../types/auth"

const initialState = {
  userPin: '',
  email: '',
  password: '',
  confirmPassword: '',
  otpCode: '',
  firstName: '',
  lastName: '',

  isLoading: false,
  isError: '',
  token: '',
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PIN: {
      state.userPin = action.payload
      return {
        ...state,
      }
    }

    case SET_AUTH_INFO: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case CLEAR_AUTH_INFO: {
      state.firstName = ''
      state.lastName = ''
      state.password = ''
      state.confirmPassword = ''
      state.otpCode = ''
      state.userPin = ''
      return { ...state }
    }

    case SEND_LOGIN_INFO + '_PENDING': {
      state.isLoading = true
      state.isError = ''
      state.token = ''
      return { ...state }
    }

    // testing
    case SEND_LOGIN_INFO: {
      const { token } = action.payload.data
      state.isLoading = false
      state.isError = ''
      state.token = token
      localStorage.setItem('token', JSON.stringify(token))
      return { ...state }
    }

    case SEND_LOGIN_INFO + '_FULFILLED': {
      const {results} = action.payload.data
      if (!results) {
        state.isError = action.payload.data.message
        state.isLoading = false
        return { ...state }
      }
      console.log(action.payload.data);
      state.isLoading = false
      state.isError = ''
      state.token = results.token
      localStorage.setItem('token', results.token+'')
      alert('Login Success')
      return { ...state }
    }

    case SEND_LOGIN_INFO + '_REJECTED': {
      let message;
      if (!action.payload.response){
        message = action.payload.message
      } else {
        message = action.payload.response.data.message
      }
      state.isLoading = false
      state.isError = message
      state.token = ''
      return { ...state }
    }

    case 'SEND_REGISTER_INFO_PENDING': {
      state.isLoading = true
      state.isError = ''
      state.token = ''
      return { ...state }
    }

    case 'SEND_REGISTER_INFO_FULFILLED': {
      const {success} = action.payload.data
      if (!success) {
        state.isError = action.payload.data.message
        state.isLoading = false
        return { ...state }
      }
      state.isLoading = false
      state.isError = ''
      alert(action.payload.data.message)
      return { ...state }
    }

    case 'SEND_REGISTER_INFO_REJECTED': {
      let message;
      if (!action.payload.response){
        message = action.payload.message
      } else {
        message = action.payload.response.data.message
      }
      state.isLoading = false
      state.isError = message
      alert(message)
      return { ...state }
    }

    default:
      return state
  }
}

export default auth

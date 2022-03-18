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
      const { token } = action.payload.data
      console.log(action.payload.data);
      state.isLoading = false
      state.isError = ''
      state.token = token
      return { ...state }
    }

    case SEND_LOGIN_INFO + '_REJECTED': {
      const { message } = action.payload.response.data
      state.isLoading = false
      state.isError = message
      state.token = ''
      return { ...state }
    }

    default:
      return state
  }
}

export default auth

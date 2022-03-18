import { CLEAR_AUTH_INFO, SET_AUTH_INFO, SET_USER_PIN } from "../types/auth"

const initialState = {
  userPin: '',
  email: '',
  password: '',
  confirmPassword: '',
  otpCode: '',
  firstName: '',
  lastName: '',
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

    default:
      return state
  }
}

export default auth
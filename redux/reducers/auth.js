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
  isSuccess: '',
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
      const {token, email, otp} = action.payload
      if (token) {
        state.token = ''
      }
      if (email) {
        state.email = ''
      }
      if (otp) {
        state.otpCode = ''
      }
      state.firstName = ''
      state.lastName = ''
      state.password = ''
      state.confirmPassword = ''
      state.userPin = ''
      state.isError = ''
      state.isSuccess = ''
      state.isLoading = false
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
      state.isSuccess = 'Login Success'
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
      state.isSuccess = action.payload.data.message
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
      return { ...state }
    }

    case 'SEND_CODE_TO_EMAIL_PENDING': {
      state.isLoading = true
      state.isError = ''
      state.isSuccess = ''
      return { ...state }
    }

    case 'SEND_CODE_TO_EMAIL_FULFILLED': {
      const {success} = action.payload.data
      if (!success) {
        state.isError = action.payload.data.message
        state.isLoading = false
        return { ...state }
      }
      state.isLoading = false
      state.isError = ''
      state.isSuccess = action.payload.data.message
      return { ...state }
    }

    case 'SEND_CODE_TO_EMAIL_REJECTED': {
      let message;
      if (!action.payload.response){
        message = action.payload.message
      }
      else {
        message = action.payload.response.data.message
      }
      state.isLoading = false
      state.isError = message
      return { ...state }
    }

    case 'SEND_RESET_PASSWORD_PENDING': {
      state.isLoading = true
      state.isError = ''
      state.isSuccess = ''
      return { ...state }
    }

    case 'SEND_RESET_PASSWORD_FULFILLED': {
      const {success} = action.payload.data
      if (!success) {
        state.isError = action.payload.data.message
        state.isLoading = false
        return { ...state }
      }
      state.isLoading = false
      state.isError = ''
      state.isSuccess = action.payload.data.message
      return { ...state }
    }

    case 'SEND_RESET_PASSWORD_REJECTED': {
      if (!action.payload.response) {
        state.isError = action.payload.message
      } else {
        state.isError = action.payload.response.data.message
      }
      state.isLoading = false
      return { ...state }
    }

    default:
      return state
  }
}

export default auth

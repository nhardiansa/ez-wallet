const intialState = {
  userList: [],
  userProfile: {},
  recepientDetail: {},
  currentBalance: 0,

  userPhoneList: [],
  
  loading: false,
  error: '',
}

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    
    case 'GET_LIST_USER_PENDING': {
      state.loading = true
      state.error = ''
      state.userList = []
      return {...state}
    }

    case 'GET_LIST_USER_FULFILLED': {
      const {results} = action.payload.data
      state.userList = [...results]
      state.loading = false
      state.error = ''
      return {...state}
    }

    case 'GET_LIST_USER_REJECTED': {
      state.loading = false
      if (!action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      return {...state}
    }

    case 'SET_RECEPIENT_DETAIL': {
      state.recepientDetail = action.payload
      return {...state}
    }

    case 'GET_USER_PROFILE_PENDING': {
      state.loading = true
      state.error = ''
      state.userProfile = {}
      return {...state}
    }

    case 'GET_USER_PROFILE_FULFILLED': {
      const {results} = action.payload.data
      if (!results) {
        state.error = action.payload.message
        state.loading = false
        return {...state}
      }
      state.userProfile = results
      state.loading = false
      state.error = ''
      return {...state}
    }

    case 'GET_USER_PROFILE_REJECTED': {
      state.loading = false
      if (!action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      return {...state}
    }

    case 'GET_CURRENT_BALANCE_PENDING': {
      state.loading = true
      state.error = ''
      state.currentBalance = 0
      return {...state}
    }

    case 'GET_CURRENT_BALANCE_FULFILLED': {
      const {results} = action.payload.data
      if (!results) {
        state.error = action.payload.message
        state.loading = false
        return {...state}
      }
      state.currentBalance = results
      state.loading = false
      state.error = ''
      return {...state}
    }

    case 'GET_CURRENT_BALANCE_REJECTED': {
      state.loading = false
      if (!action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      return {...state}
    }

    case 'GET_PHONE_LIST_PENDING': {
      state.loading = true
      state.error = ''
      state.userPhoneList = []
      return {...state}
    }

    case 'GET_PHONE_LIST_FULFILLED': {
      const {results} = action.payload.data
      if (!results) {
        state.error = action.payload.message
        state.loading = false
        alert(state.error)
        return {...state}
      }
      state.userPhoneList = results
      state.loading = false
      return {...state}
    }

    case 'GET_PHONE_LIST_REJECTED': {
      state.loading = false
      if (!action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      alert(state.error)
      return {...state}
    }

    case 'ADD_PHONE_NUMBER_PENDING': {
      state.loading = true
      state.error = ''
      return {...state}
    }

    case 'ADD_PHONE_NUMBER_FULFILLED': {
      const {results} = action.payload.data
      if (!results) {
        state.error = action.payload.message
        state.loading = false
        return {...state}
      }
      state.loading = false
      state.error = ''
      alert('Add phone number success')
      return {...state}
    }

    case 'ADD_PHONE_NUMBER_REJECTED': {
      state.loading = false
      if (!action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      return {...state}
    }

    case 'SET_CURRENT_BALANCE': {
      state.currentBalance = action.payload
      return {...state}
    }

    default: {
      return {...state}
    }
  }
}

export default userReducer;

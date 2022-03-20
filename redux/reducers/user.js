const intialState = {
  userList: [],
  userProfile: {},
  
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
      if (action.payload.response) {
        state.error = action.payload.message
      } else {
        state.error = action.payload.data.message
      }
      return {...state}
    }

    default: {
      return {...state}
    }
  }
}

export default userReducer;

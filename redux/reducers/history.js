const intialState = {
  histories: [],
  loading: false,
  error: '',

}

const historyReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_HISTORIES_PENDING':
      return {
        ...state,
        loading: true,
        error: '',
        histories: []
      }
    case 'GET_HISTORIES_FULFILLED':
      return {
        ...state,
        histories: action.payload.data.results.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1),
        loading: false,
        error: ''
      }
    case 'GET_HISTORIES_REJECTED':
      let message = ''

      if (!action.payload.response) {
        message = action.payload.message
      } else {
        message = action.payload.response.data.message
      }

      return {
        ...state,
        error: message,
        loading: false,
        histories: []
      }
    default:
      return state
  }
}

export default historyReducer;

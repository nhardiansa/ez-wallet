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
        histories: action.payload.data.results,
        loading: false,
        error: ''
      }
    case 'GET_HISTORIES_REJECTED':
      return {
        ...state,
        error: action.payload.response.data.message,
        loading: false,
        histories: []
      }
    default:
      return state
  }
}

export default historyReducer;

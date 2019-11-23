const initState = {}

const workRequestReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_WORK_REQUESTS_SUCCESS':
      console.log('get requests success');
      return state;
    case 'GET_WORK_REQUESTS_ERROR':
      console.log('get requests error');
      return state;
    default:
      return state;
  }
};

export default workRequestReducer;
const initState = {}

const deviceReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DEVICE_SUCCESS':
      console.log('create device success');
      return state;
    case 'CREATE_DEVICE_ERROR':
      console.log('create device error');
      return state;
    default:
      return state;
  }
};

export default deviceReducer;
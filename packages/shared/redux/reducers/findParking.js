const { SET_SEARCH_DATA, CLEAR_SEARCH_DATA } = require('../actions/types');

const initialState = {
  search: '',
  coordinates: [],
  parkings: [],
  start: new Date(new Date(new Date()).setHours(new Date().getHours() + 1)),
  end: new Date(new Date(new Date()).setHours(new Date().getHours() + 3)),
  duration: 'hourly'
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_DATA: {
      return {
        ...payload
      };
    }
    case CLEAR_SEARCH_DATA: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}

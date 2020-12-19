const {
  TOGGLE_USER_TYPE,
  ADD_LISTING,
  ADD_BOOKING,
  ADD_VEHICLE,
} = require('../actions/types');

const initialState = {
  isSpaceOwner: false,
  listings: [],
  vehicles: [],
  bookings: [],
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case TOGGLE_USER_TYPE:
      return {
        ...state,
        isSpaceOwner: !state.isSpaceOwner,
      };
    case ADD_LISTING: {
      return {
        ...state,
        listings: [...state.listings, payload],
      };
    }
    case ADD_VEHICLE: {
      return {
        ...state,
        vehicles:
          state.vehicles.length > 0 ? [...state.vehicles, payload] : [payload],
      };
    }
    case ADD_BOOKING: {
      return {
        ...state,
        listings: state.listings.map((item) =>
          payload.listingId == item.id
            ? {...item, bookings: [...item.bookings, payload]}
            : item,
        ),
        bookings: [...state.bookings, payload],
      };
    }
    default:
      return state;
  }
}

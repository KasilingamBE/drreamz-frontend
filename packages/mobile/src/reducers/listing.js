const {
  ADD_LISTING_LOCATION,
  ADD_LISTING_SPACE_AVAILABLE,
  ADD_LISTING_SPACE_DETAILS,
  SET_LISTING_PRICING_TYPE_AND_RATE,
  CLEAR_LISTING,
} = require('../actions/types');

const initialState = {
  id: null,
  locationDetails: {},
  spaceDetails: {},
  spaceAvailable: {},
  pricingDetails: {},
  bookings: [],
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_LISTING_LOCATION: {
      return {
        ...state,
        id: Date.now().toString(),
        locationDetails: payload,
      };
    }
    case ADD_LISTING_SPACE_DETAILS: {
      return {
        ...state,
        spaceDetails: payload,
      };
    }
    case ADD_LISTING_SPACE_AVAILABLE: {
      return {
        ...state,
        spaceAvailable: payload,
      };
    }
    case SET_LISTING_PRICING_TYPE_AND_RATE: {
      return {
        ...state,
        pricingDetails: payload,
      };
    }
    case CLEAR_LISTING: {
      return {
        id: null,
        locationDetails: {},
        spaceDetails: {},
        spaceAvailable: {},
        pricingDetails: {},
        bookings: [],
      };
    }
    default:
      return state;
  }
}

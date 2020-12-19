import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IoIosStar, IoIosStarHalf, IoMdAdd, IoIosCard } from "react-icons/io";
// import { GrAdd } from 'react-icons/gr';
import AccessDenied from "../app/components/AccessDenied";
import { ListGroup, Button, Form, Nav, Spinner } from "react-bootstrap";
import AddVehicleModal from "../app/components/AddVehicleModal";
// import AddCreditDebitCardModal from '../app/components/AddCreditDebitCardModal';
import StartEndTimeModal from "../app/components/StartEndTimeModal";
import moment from "moment";
import {
  clearSearchData,
  setSearchData,
} from "../app/redux/actions/findParking";
import { addBookingLocal, updateListingLocal } from "../app/redux/actions/user";
import { client } from "../app/graphql";
import { gql, useMutation } from "@apollo/client";
import BookingSuccessModal from "../app/components/BookingSuccessModal";
import ParkingTicketModal from "../app/components/ParkingTicketModal";
import { convertTo12hrformat, roundTime } from "../helpers/utilities";
import ChooseVehicleModal from "../app/components/ChooseVehicleModal";
import { toast } from "react-toastify";
import { addVehicleLocal } from "../app/redux/actions/vehicle";
import { toggleProfileType } from "../app/redux/actions/user";
import StarRatings from "react-star-ratings";
import CheckoutForm from "../app/components/stripe/CheckoutForm";
import { ToggleLeft, ToggleRight } from "react-feather";
import SelectCardModal from "../app/components/manageCard/SelectCardModal";

const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $createdBy: String
    $driverId: String
    $driverName: String
    $driverEmail: String
    $listingId: String
    $ownerId: String
    $ownerName: String
    $ownerEmail: String
    $address: String
    $images: [String]
    $start: String
    $end: String
    $status: String
    $profileCategory: String
    $vehicle: String
    $payment: Float
    $ownerPayment: Float
    $paymentMethod: String
    $spaceLabel: String
    $paymentIntent: String
    $transferGroup: String
  ) {
    createBooking(
      createdBy: $createdBy
      driverId: $driverId
      driverName: $driverName
      driverEmail: $driverEmail
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      ownerEmail: $ownerEmail
      address: $address
      images: $images
      start: $start
      end: $end
      status: $status
      profileCategory: $profileCategory
      vehicle: $vehicle
      payment: $payment
      ownerPayment: $ownerPayment
      paymentMethod: $paymentMethod
      spaceLabel: $spaceLabel
      paymentIntent: $paymentIntent
      transferGroup: $transferGroup
    ) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      bookings
      reviews
      locationDetails {
        address
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
      }
      spaceDetails {
        qtyOfSpaces
        spaceLabels {
          label
          largestSize
          isBooked
        }
      }
      spaceAvailable {
        scheduleType
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
      }
      pricingDetails {
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
    }
  }
`;

const ADD_BOOKING_TO_LISTING = gql`
  mutation UpdateListing($id: ID!, $bookings: [ID]) {
    updateListing(id: $id, bookings: $bookings) {
      _id
      ownerId
      ownerName
      ownerEmail
      published
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          type
          coordinates
        }
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
          isBooked
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        scheduleType
        instantBooking
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        hasNoticeTime
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
      bookings
      reviews
      createdAt
    }
  }
`;

const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    createVehicle(
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const GET_LISTING_REVIEWS = gql`
  query GetListingReviews($listingId: String!) {
    getListingReviews(listingId: $listingId) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const stripe_Create_Payment_Intent_Offline = gql`
  query StripeCreatePaymentIntentOffline(
    $payment_method: String!
    $driverId: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntentOffline(
      payment_method: $payment_method
      driverId: $driverId
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

const stripe_List_User_Cards = gql`
  query StripeListUserCards($driverId: String!, $type: String!) {
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const check_Booking_Availability = gql`
  query CheckBookingAvailability(
    $listingId: String!
    $start: String!
    $end: String!
  ) {
    checkBookingAvailability(listingId: $listingId, start: $start, end: $end)
  }
`;

// const days = {
//   '1':'monday',
//   2:'tuesday',
//   3:'wednesday',
//   4:'thursday',
//   5:''};

const BookNow = ({
  findParking,
  location,
  setSearchData,
  userData,
  clearSearchData,
  addBookingLocal,
  updateListingLocal,
  addVehicleLocal,
  profileType,
  toggleProfileType,
  match,
  id,
}) => {
  // const { id } = id;
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [updateListing] = useMutation(ADD_BOOKING_TO_LISTING);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showChooseVehicleModal, setShowChooseVehicleModal] = useState(false);
  // const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showStartEndTimeModal, setShowStartEndTimeModal] = useState(false);
  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
  const [showParkingTicketModal, setShowParkingTicketModal] = useState(false);
  const [listing, setListing] = useState(null);

  const [loading, setLoading] = useState(false);
  const [useCard, setUseCard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cards, setCards] = useState([]);
  const [availability, setAvailability] = useState({
    available: false,
    loading: false,
    slot: 0,
    labels: [],
  });

  const [bookingId, setBookingId] = useState("");

  // const { startTime, endTime } = findParking;

  const [bookingData, setBookingData] = useState({
    start: findParking.start,
    end: findParking.end,
    vehicle: "",
    spaceLabel: "",
  });

  const { start, end, vehicle, spaceLabel } = bookingData;
  //   console.log(location);

  // const address = 'hefhuhfhhrf';
  // const price = '3.20';
  // const images = [];

  const addNewVehicleHandler = async (data) => {
    try {
      const response = await createVehicle({
        variables: data,
      });
      addVehicleLocal(response.data.createVehicle);
      setBookingData({ ...bookingData, vehicle: data });
      console.log(response.data.createVehicle);
      toast.success("Vehicle Added Successfully");
    } catch (error) {
      toast.warn("Something Went Wrong!");
    }
  };

  const addVehicleHandler = (data) => {
    console.log(data);
    setBookingData({ ...bookingData, vehicle: data });
  };

  const changeTimingsHandler = (start, end) => {
    if (!validateTimings(start, end)) {
      toast.warn("This Parking does not operate in given duration");
    } else {
      if (start && end) {
        setBookingData({
          ...bookingData,
          start: start,
          end: end,
        });
        setSearchData({
          ...findParking,
          start: start,
          end: end,
        });
        setShowStartEndTimeModal(false);
        checkAvailability(start, end);
      }
    }
  };

  var diff = moment.duration(moment(end).diff(moment(start)));

  const [rating, setRating] = useState(0);

  const getCardsList = async (type) => {
    setLoading(true);
    setCards([]);
    let tempCards = await client.query({
      query: stripe_List_User_Cards,
      variables: {
        driverId: userData.sub,
        type: type,
      },
    });
    if (JSON.parse(tempCards.data.stripeListUserCards) !== null) {
      setCards(JSON.parse(tempCards.data.stripeListUserCards));
    }
    setLoading(false);
  };

  const checkAvailability = async (start, end, checkout) => {
    try {
      if (!checkout) {
        setAvailability({ ...availability, loading: true });
      }

      let tempSlots = await client.query({
        query: check_Booking_Availability,
        variables: {
          listingId: id,
          start: start,
          end: end,
        },
      });
      if (
        listing.spaceDetails.qtyOfSpaces -
          tempSlots.data.checkBookingAvailability.length >
          0 &&
        listing.spaceDetails.spaceLabels.length === 0
      ) {
        setBookingData({
          ...bookingData,
          spaceLabel: tempSlots.data.checkBookingAvailability.length + 1,
        });
      }

      if (
        checkout &&
        listing.spaceDetails.qtyOfSpaces -
          tempSlots.data.checkBookingAvailability.length >
          0
      ) {
        return true;
      } else {
        console.log("Listings", listing);
        console.log(
          "checkAvailability = tempSlots",
          tempSlots.data.checkBookingAvailability.length
        );
        console.log(
          "checkAvailability = tempSlots",
          tempSlots.data.checkBookingAvailability
        );
        setAvailability({
          available:
            listing.spaceDetails.qtyOfSpaces -
              tempSlots.data.checkBookingAvailability.length >
            0,
          slot:
            listing.spaceDetails.qtyOfSpaces -
            tempSlots.data.checkBookingAvailability.length,
          loading: false,
          labels: tempSlots.data.checkBookingAvailability,
        });

        return (
          listing.spaceDetails.qtyOfSpaces -
            tempSlots.data.checkBookingAvailability.length >
          0
        );
      }
    } catch (error) {
      console.log("checkAvailability = error", error);
      setAvailability({ available: false, slot: 0, loading: false });
      return false;
    }
  };

  const getInitial = async () => {
    try {
      const { data: data1 } = await client.query({
        query: GET_LISTING,
        variables: { id: id },
      });
      console.log("data1. getInitial", data1);
      setListing(data1.getListing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (listing !== null) {
      checkAvailability(findParking.start, findParking.end);
    }
  }, [listing]);

  useEffect(() => {
    getInitial();
    getCardsList(profileType);
    // checkAvailability();

    if (id) {
      client
        .query({
          query: GET_LISTING_REVIEWS,
          variables: { listingId: id },
        })
        .then(({ data }) => {
          if (data.getListingReviews.length == 0) {
            setRating(0);
          } else {
            let sum = 0;
            data.getListingReviews.forEach((item) => {
              sum += item.rating;
            });
            console.log("rating :", sum / data.getListingReviews.length);
            setRating(sum / data.getListingReviews.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (!id) {
    return <AccessDenied />;
  }

  const getTotalPrice = () => {
    console.log(diff.asHours());
    let totalTime = 0;
    let tPrice = 0;
    let perHourRate = listing.pricingDetails.pricingRates.perHourRate;

    tPrice = perHourRate * diff.asHours();

    return tPrice;
  };

  const changeProfileType = async (type) => {
    try {
      if (type === profileType) {
        return;
      }
      await toggleProfileType();
      if (type == "personal") {
        toast.success("Switched to Personal Profile");
      } else {
        toast.success("Switched to Business Profile");
      }
    } catch (error) {
      toast.warn("Something Went Wrong!");
    }
  };
  const validateTimings = (start, end) => {
    // console.log("In validate Timings", start, end);
    // console.log("schedule type :", listing.spaceAvailable.scheduleType);
    // if (listing.spaceAvailable.scheduleType === "fixed") {
    //   let sd = start;
    //   let ed = end;
    //   let startTime = moment(sd).format("LT");
    //   let endTime = moment(ed).format("LT");

    //   if (moment(start).format("ll") === moment(end).format("ll")) {
    //     if (listing.spaceAvailable.monday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.monday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.monday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 1) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.tuesday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.tuesday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.tuesday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 2) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.wednesday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.wednesday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.wednesday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 3) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.thursday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.thursday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.thursday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 4) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.friday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.friday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.friday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 5) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.saturday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.saturday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.saturday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 6) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //     if (listing.spaceAvailable.sunday.isActive) {
    //       let s = moment(
    //         convertTo12hrformat(listing.spaceAvailable.sunday.startTime),
    //         "LT"
    //       )._d;
    //       let e = moment(
    //         convertTo12hrformat(listing.spaceAvailable.sunday.endTime),
    //         "LT"
    //       )._d;
    //       if (moment(sd).day() == 7) {
    //         if (
    //           moment(startTime, "LT")._d < s ||
    //           moment(endTime, "LT")._d > e
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       }
    //     }
    //   } else {
    //     for (let i = sd; i <= ed; i = moment(i).add(1, "day")._d) {
    //       if (listing.spaceAvailable.monday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.monday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.monday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 1) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.tuesday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.tuesday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.tuesday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 2) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.wednesday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.wednesday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.wednesday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 3) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.thursday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.thursday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.thursday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 4) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.friday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.friday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.friday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 5) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.saturday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.saturday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.saturday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 6) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //       if (listing.spaceAvailable.sunday.isActive) {
    //         let s = moment(
    //           convertTo12hrformat(listing.spaceAvailable.sunday.startTime),
    //           "LT"
    //         )._d;
    //         let e = moment(
    //           convertTo12hrformat(listing.spaceAvailable.sunday.endTime),
    //           "LT"
    //         )._d;
    //         if (moment(i).day() == 7) {
    //           if (
    //             moment(startTime, "LT")._d < s ||
    //             moment(endTime, "LT")._d > e
    //           ) {
    //             return false;
    //           } else {
    //             return true;
    //           }
    //         }
    //       }
    //     }
    //   }
    // } else if (listing.spaceAvailable.scheduleType === "custom") {
    //   if (
    //     new Date(listing.spaceAvailable.customTimeRange[0]) > start &&
    //     new Date(listing.spaceAvailable.customTimeRange[1]) < end
    //   ) {
    //     // toast.warn("This Parking does not operate in given duration");
    //     return false;
    //   }
    // } else {
    //   return true;
    // }
    return true;
  };
  const validateInputs = async () => {
    if (!validateTimings()) {
      alert("This Parking does not operate in given duration");
      return false;
    }
    // else if (listing.bookings.length === listing.spaceDetails.qtyOfSpaces) {
    //   alert("Parking Space is Full");
    //   return false;
    // }
    else {
      if (listing.spaceDetails.spaceLabels.length > 0 && !spaceLabel) {
        alert("Please select a space number");
        return false;
      } else {
        if (start && end && vehicle) {
          // return true;
          const status = await checkAvailability(
            findParking.start,
            findParking.end,
            true
          );
          if (!status) {
            alert("Parking Space is Full at this time slot");
          }
          return status;
        } else {
          // console.log(startDate, startTime, endDate, endTime, vehicle);
          alert("Please select a vehicle");
          return false;
        }
      }
    }
  };

  const onSubmitHandler = async (paymentIntent, transferGroup) => {
    try {
      // console.log(startDate, startTime, endDate, endTime, vehicle);
      // if (startDate && startTime && endDate && endTime && vehicle) {
      const response1 = await createBooking({
        variables: {
          createdBy: userData.sub,
          driverId: userData.sub,
          driverName: userData.name,
          driverEmail: userData.email,
          listingId: id,
          ownerId: listing.ownerId,
          ownerName: listing.ownerName,
          ownerEmail: listing.ownerEmail,
          address: listing.locationDetails.address,
          images: [
            ...listing.locationDetails.streetViewImages,
            ...listing.locationDetails.parkingEntranceImages,
            ...listing.locationDetails.parkingSpaceImages,
          ],
          start: start,
          end: end,
          payment: parseFloat(
            (getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)).toFixed(2)
          ),
          ownerPayment: parseFloat(getTotalPrice().toFixed(2)),
          vehicle: vehicle._id,
          profileCategory: profileType,
          status: "upcoming",
          paymentMethod: "card",
          spaceLabel: spaceLabel,
          paymentIntent: paymentIntent,
          transferGroup: transferGroup,
        },
      });

      console.log(response1.data.createBooking);

      addBookingLocal(response1.data.createBooking);

      // const response2 = await updateListing({
      //   variables: {
      //     id: id,
      //     bookings: [...listing.bookings, response1.data.createBooking._id],
      //   },
      // });

      setBookingId(response1.data.createBooking._id);

      // console.log(response2.data.updateListing);

      // updateListingLocal(response2.data.updateListing);

      clearSearchData();
      setShowBookingSuccessModal(true);
    } catch (error) {
      alert("Something went Wrong", "Please try again");
      console.log(error);
    }
  };

  const onSubmitHandlerCard = async () => {
    if (!(await validateInputs())) {
      return false;
    } else if (selectedCard === null) {
      return alert("Select card");
    }
    try {
      setDisabled(true);
      let { data } = await client.query({
        query: stripe_Create_Payment_Intent_Offline,
        variables: {
          payment_method: selectedCard ? selectedCard.id : null,
          driverId: userData.sub,
          type: profileType,
          ownerId: listing.ownerId, //"8e2783ed-f09d-48e8-8158-43e7d42c7378",
          amount: parseInt(
            (getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) * 100
          ),
          fee: parseInt(getTotalPrice()),
        },
      });
      if (data.stripeCreatePaymentIntentOffline.secret === "succeeded") {
        // alert("Payment was succesfull");
        // setDisabled(false);
        onSubmitHandler(
          data.stripeCreatePaymentIntentOffline.id,
          data.stripeCreatePaymentIntentOffline.transferGroup
        );
      } else {
        alert("Something went wrong please try again");
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log("error ", error);
      alert("Something went wrong");
    }
  };

  if (!listing) {
    return <div className="loading">Loading...</div>;
  }

  const { address } = listing.locationDetails;
  const images = [
    ...listing.locationDetails.streetViewImages,
    ...listing.locationDetails.parkingEntranceImages,
    ...listing.locationDetails.parkingSpaceImages,
  ];
  const { perHourRate } = listing.pricingDetails.pricingRates;

  return (
    <div className="dg__account">
      <h1 className="heading">{address}</h1>
      <div className="stars">
        <StarRatings
          rating={rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
          isAggregateRating={true}
        />
        {listing && (
          <span style={{ marginLeft: "10px", fontSize: "18px" }}>
            {listing.reviews.length}
          </span>
        )}
      </div>

      {images.length > 0 && (
        <div className="detail-item">
          <img src={images[0]} className="parking-image" alt="parking-image" />
        </div>
      )}

      <div className="detail-item">
        <ListGroup>
          <ListGroup.Item>
            <p className="entity-label">Arriving</p>
            <div className="date-time">
              <p className="date-time-text">{moment(start).format("lll")}</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowStartEndTimeModal(true);
                }}
              >
                Change
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Leaving</p>
            <div className="date-time">
              <p className="date-time-text">{moment(end).format("lll")}</p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowStartEndTimeModal(true);
                }}
              >
                Change
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Duration</p>
            <div className="date-time">
              <p className="date-time-text">
                {/* {diff1.days()>0 && `${diff1.days()} days`} {diff2.asHours()>0 && `${diff2.asHours().toFixed(1)} hours`} */}
                {diff.asHours().toFixed(1)}{" "}
                {diff.asHours() > 1 ? "hours" : "hour"}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Vehicle</p>
            <div className="date-time">
              <p className="date-time-text">
                {vehicle && `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              </p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowChooseVehicleModal(true);
                }}
              >
                {vehicle ? "Change" : "Add"}
              </Button>
              <ChooseVehicleModal
                show={showChooseVehicleModal}
                handleClose={() => {
                  setShowChooseVehicleModal(false);
                }}
                handleSave={addVehicleHandler}
                addNewVehicle={() => {
                  setShowChooseVehicleModal(false);
                  setShowVehicleModal(true);
                }}
              />
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="entity-label">Profile Category</p>
            <div className="profile-type">
              <Nav variant="pills" activeKey={profileType}>
                <Nav.Item>
                  <Nav.Link
                    eventKey="personal"
                    onClick={() => {
                      changeProfileType("personal");
                      getCardsList("personal");
                      setUseCard(false);
                    }}
                  >
                    Personal
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="business"
                    onClick={() => {
                      changeProfileType("business");
                      getCardsList("business");
                      setUseCard(false);
                    }}
                  >
                    Business
                  </Nav.Link>
                </Nav.Item>
              </Nav>{" "}
            </div>
          </ListGroup.Item>
          {listing.spaceDetails.spaceLabels.length > 0 && (
            <ListGroup.Item>
              <p className="entity-label">Select your space</p>
              <Form>
                {listing.spaceDetails.spaceLabels.map((item) => {
                  if (
                    availability.labels.length === 0 ||
                    availability.labels.indexOf(item.label) === -1
                  ) {
                    return (
                      <Form.Check
                        checked={spaceLabel === item.label}
                        inline
                        label={item.label}
                        type="radio"
                        disabled={item.isBooked}
                        onChange={() => {
                          setBookingData({
                            ...bookingData,
                            spaceLabel: item.label,
                          });
                        }}
                      />
                    );
                  }
                })}
              </Form>
            </ListGroup.Item>
          )}
          {cards.length > 0 && (
            <ListGroup.Item>
              <p className="entity-label">Use Saved Card</p>
              <div className="date-time">
                <div>
                  {useCard ? (
                    <ToggleRight
                      className="cursor-pointer"
                      onClick={() => setUseCard(false)}
                      size={35}
                    />
                  ) : (
                    <ToggleLeft
                      className="cursor-pointer"
                      onClick={() => setUseCard(true)}
                      size={35}
                    />
                  )}
                </div>
              </div>
            </ListGroup.Item>
          )}
          {useCard && (
            <ListGroup.Item>
              <p className="entity-label"></p>
              <div className="date-time">
                <div>
                  {selectedCard ? (
                    <span>
                      <span className="text-capitalize">
                        {selectedCard.card.brand}
                      </span>{" "}
                      {` **** **** **** ${selectedCard.card.last4}`}
                    </span>
                  ) : null}
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowCardModal(true)}
                  >
                    {selectedCard ? "Change Card" : "Select Card"}
                  </Button>
                  <SelectCardModal
                    cards={cards}
                    show={showCardModal}
                    handleClose={() => setShowCardModal(false)}
                    setSelectedCard={(card) => {
                      setSelectedCard(card);
                      setShowCardModal(false);
                    }}
                  />
                </div>
              </div>
            </ListGroup.Item>
          )}
          {/* <ListGroup.Item>
            <p className="entity-label">Payment</p>
            <div className="date-time">
              <p className="date-time-text">$ {getTotalPrice()}</p>
            </div>
          </ListGroup.Item> */}
          <ListGroup.Item>
            <p className="entity-label">
              <p>
                <small>Amount</small>
              </p>
              <p>
                <small>Tax</small>
              </p>
              <p>
                <small>Fee</small>
              </p>
              <p>
                <b>Total</b>
              </p>
            </p>
            <div className="date-time">
              <p className="date-time-text">
                <p className="font-weight-normal">
                  <small>${getTotalPrice().toFixed(2)}</small>
                </p>
                <p className="font-weight-bold">
                  <small>$1</small>
                </p>
                <p className="font-weight-bold">
                  <small>${(getTotalPrice() * 0.029 + 0.3).toFixed(2)}</small>
                </p>
                <p>
                  $
                  {(
                    getTotalPrice() +
                    1 +
                    (getTotalPrice() * 0.029 + 0.3)
                  ).toFixed(2)}
                </p>
              </p>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>

      {listing && (
        <div className="pay-now-wrapper">
          {availability.loading ? (
            <p className="description">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>{" "}
              Checking availability
            </p>
          ) : availability.available ? (
            <>
              {useCard ? (
                <Button variant="primary" onClick={onSubmitHandlerCard}>
                  {disabled ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    `Book Now`
                  )}
                </Button>
              ) : (
                <CheckoutForm
                  ownerId={listing.ownerId}
                  // driverName={userData.name}
                  // driverId={userData.sub}
                  amount={parseFloat(
                    (
                      (getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) *
                      100
                    ).toFixed(2)
                  )}
                  fee={parseFloat(
                    (
                      (getTotalPrice() + 1 + (getTotalPrice() * 0.029 + 0.3)) *
                      100 *
                      0.15
                    ).toFixed(2)
                  )}
                  createBookingHandler={onSubmitHandler}
                  validateInputs={validateInputs}
                />
              )}
              <p className="description">
                By making payment, you indicate your acceptance of our Terms &
                Conditions and Privacy Policy
              </p>
            </>
          ) : (
            <p className="description">
              <b>Sorry parking is full at this time slot</b>
            </p>
          )}
        </div>
      )}

      {listing && (
        <StartEndTimeModal
          show={showStartEndTimeModal}
          handleClose={() => {
            setShowStartEndTimeModal(false);
          }}
          scheduleType={listing.spaceAvailable.scheduleType}
          monday={listing.spaceAvailable.monday}
          tuesday={listing.spaceAvailable.tuesday}
          wednesday={listing.spaceAvailable.wednesday}
          thursday={listing.spaceAvailable.thursday}
          friday={listing.spaceAvailable.friday}
          saturday={listing.spaceAvailable.saturday}
          sunday={listing.spaceAvailable.sunday}
          customTimeRange={listing.spaceAvailable.customTimeRange}
          handleSave={changeTimingsHandler}
          start={start}
          end={end}
          // onChange={(start,end) => {
          //   setBookingData({ ...bookingData, start:start,end:end  });
          // }}
        />
      )}
      <AddVehicleModal
        show={showVehicleModal}
        handleClose={() => {
          setShowVehicleModal(false);
        }}
        handleSave={addNewVehicleHandler}
      />

      <BookingSuccessModal
        show={showBookingSuccessModal}
        handleClose={() => {
          setShowBookingSuccessModal(false);
        }}
        viewCodeHandler={() => {
          setShowBookingSuccessModal(false);
          setShowParkingTicketModal(true);
        }}
      />
      <ParkingTicketModal
        id={bookingId}
        show={showParkingTicketModal}
        handleClose={() => {
          setShowParkingTicketModal(false);
        }}
        bookingData={bookingData}
        address={address}
      />
    </div>
  );
};

const mapStateToProps = ({ findParking, auth, user }) => ({
  findParking,
  userData: auth.data.attributes,
  profileType: user.profileType,
});

export default connect(mapStateToProps, {
  setSearchData,
  clearSearchData,
  addBookingLocal,
  updateListingLocal,
  addVehicleLocal,
  toggleProfileType,
})(BookNow);

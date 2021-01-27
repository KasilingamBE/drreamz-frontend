/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addListingLocal, updateListingLocal } from '../redux/actions/user';
import { deleteTempListing, updateTempListing } from '../redux/actions/tempListing';
import { updateFindParkingData } from '../redux/actions/findParking';
import guid from '../utils/guid';
import config from '../aws-exports';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const GET_ALL = gql`
  query GetOwnerListingsSearch(
    $search: String
    $limit: Int
    $page: Int
    $username: String
    $active: Boolean
  ) {
    getAllListingsSearch(
      search: $search
      limit: $limit
      page: $page
      username: $username
      active: $active
    ) {
      count
      listings {
        _id
        bookingCount {
          total
        }
        bookings
        createdAt
        location {
          coordinates
          type
        }
        locationDetails {
          address
          city
          country
          code
          features
          listingType
          marker {
            coordinates
            type
          }
          parkingEntranceImages
          parkingSpaceImages
          phone
          postalCode
          propertyName
          propertyType
          state
          streetViewImages
          unitNum
        }
        ownerId
        ownerEmail
        ownerName
        pricingDetails {
          pricingRates {
            perDayRate
            perHourRate
            perMonthRate
            perWeekRate
          }
          pricingType
        }
        published
        reviews
        spaceAvailable {
          advanceBookingTime {
            unit
            value
          }
          customTimeRange {
            startDate
            endDate
          }
          friday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          hasNoticeTime
          instantBooking
          maxTime {
            unit
            value
          }
          minTime {
            unit
            value
          }
          monday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          noticeTime {
            unit
            value
          }
          saturday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          scheduleType
          sunday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          thursday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          tuesday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          wednesday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
        }
        spaceDetails {
          aboutSpace
          accessInstructions
          compact
          compactSpaces
          height1 {
            unit
            value
          }
          height2 {
            unit
            value
          }
          heightRestriction
          isLabelled
          large
          largeSpaces
          largestSize
          midsized
          midsizedSpaces
          motorcycle
          motorcycleSpaces
          oversized
          oversizedSpaces
          parkingSpaceType
          qtyOfSpaces
          sameSizeSpaces
          spaceLabels {
            isBooked
            label
            largestSize
          }
        }
        thumbnail
      }
    }
  }
`;

const GET_ONE = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

export function useGetOneListing(id) {
  const data = useQuery(GET_ONE, { variables: { id } });
  return data;
}

export function useGetAllListings({ username, active }) {
  const [filter, setFilter] = useState({
    limit: 20,
    page: 1,
    search: '',
    username: null,
    active: null
  });
  const { loading, error, data } = useQuery(GET_ALL, {
    variables: { ...filter, username, active },
    fetchPolicy: 'network-only' // 'cache-and-network' // 'network-only'
  });
  const [allData, setAllData] = useState({
    count: 0,
    listings: []
  });

  useEffect(() => {
    if (data && data.getAllListingsSearch) {
      if (filter.page > 1) {
        setAllData({
          ...allData,
          listings: [...allData.listings, ...data.getAllListingsSearch.listings]
        });
      } else {
        setAllData(data.getAllListingsSearch);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (allData.count > filter.page * filter.limit) {
      setFilter({ ...filter, page: filter.page + 1 });
    }
  };

  return { allData, loading, filter, setFilter, loadMore };
}

export const CREATE_LISTING = gql`
  mutation CreateListing(
    $thumbnail: String
    $ownerId: String!
    $ownerEmail: String!
    $ownerName: String!
    $locationDetails: LocationDataInput
    $spaceDetails: SpaceDetailsDataInput
    $spaceAvailable: SpaceAvailableDataInput
    $pricingDetails: PricingDetailsDataInput
    $location: LocationDataMarkerInput
  ) {
    createListing(
      thumbnail: $thumbnail
      ownerId: $ownerId
      ownerEmail: $ownerEmail
      ownerName: $ownerName
      locationDetails: $locationDetails
      spaceDetails: $spaceDetails
      spaceAvailable: $spaceAvailable
      pricingDetails: $pricingDetails
      location: $location
    ) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

export const UPDATE_LISTING = gql`
  mutation UpdateListing(
    $id: ID!
    $locationDetails: LocationDataInput
    $spaceDetails: SpaceDetailsDataInput
    $spaceAvailable: SpaceAvailableDataInput
    $pricingDetails: PricingDetailsDataInput
    $location: LocationDataMarkerInput
  ) {
    updateListing(
      id: $id
      locationDetails: $locationDetails
      spaceDetails: $spaceDetails
      spaceAvailable: $spaceAvailable
      pricingDetails: $pricingDetails
      location: $location
    ) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

const GET_ALL_FORMOPTION = gql`
  query GetAllFormOptions($filter: String) {
    getAllFormOptions(filter: $filter) {
      _id
      title
      options {
        label
        value
      }
      formName
      published
    }
  }
`;

export const useGetAllFormOptions = (filter = null) => {
  const { data } = useQuery(GET_ALL_FORMOPTION, {
    variables: { filter }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      data &&
      data.getAllFormOptions &&
      data.getAllFormOptions !== null &&
      data.getAllFormOptions.length > 0
    ) {
      let listingTypeOptions = [];
      let propertyTypeOptions = [];
      data.getAllFormOptions.forEach((item) => {
        if (item._id === '5fccdb80d9db4a00080a0bda') {
          listingTypeOptions = item.options;
        } else if (item._id === '5fcd2fb3ad371d00086e767d') {
          propertyTypeOptions = item.options;
        }
      });
      if (listingTypeOptions.length > 0 || propertyTypeOptions.length > 0) {
        dispatch(updateTempListing({ listingTypeOptions, propertyTypeOptions }));
      }
    }
  }, [data]);

  // return { formOption: data, error };
};

export const useAddOneListing = () => {
  const [createListing] = useMutation(CREATE_LISTING);
  const [updateListing] = useMutation(UPDATE_LISTING);
  const tempListing = useSelector(({ tempListing }) => tempListing);
  const userData = useSelector(({ auth }) =>
    auth.authenticated
      ? {
          sub: auth.data.attributes.sub,
          name: auth.data.attributes.name,
          email: auth.data.attributes.email
        }
      : {}
  );
  const dispatch = useDispatch();

  const {
    locationDetails,
    spaceDetails,
    spaceAvailable,
    pricingDetails,
    activeIndex
  } = tempListing;

  const {
    listingType,
    propertyType,
    propertyName,
    country,
    address,
    unitNum,
    city,
    state,
    postalCode,
    code,
    phone,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features
  } = locationDetails;

  const {
    parkingSpaceType,
    qtyOfSpaces,
    heightRestriction,
    height1,
    height2,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    isLabelled,
    spaceLabels,
    aboutSpace,
    accessInstructions
  } = spaceDetails;

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    scheduleType,
    customTimeRange,
    hasNoticeTime,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailable;

  const { pricingType, pricingRates } = pricingDetails;

  const spacesSum =
    parseInt(motorcycleSpaces) +
    parseInt(compactSpaces) +
    parseInt(midsizedSpaces) +
    parseInt(largeSpaces) +
    parseInt(oversizedSpaces);

  const checkAllSpaceLabels = () => {
    let flag = true;
    spaceDetails.spaceLabels.forEach((item) => {
      if (item.label === '') {
        flag = false;
      }
    });
    return flag;
  };

  const handleNext = () => {
    try {
      if (
        (activeIndex === 1 && propertyName) ||
        (activeIndex === 2 && country && address && city && state && postalCode && code && phone) ||
        activeIndex === 3 ||
        activeIndex === 4 ||
        activeIndex === 5 ||
        (activeIndex === 6 && qtyOfSpaces > 0) ||
        (activeIndex === 7 &&
          (motorcycle || compact || midsized || large || oversized) &&
          (sameSizeSpaces ||
            (spacesSum == qtyOfSpaces &&
              (!motorcycle || (motorcycle && motorcycleSpaces > 0)) &&
              (!compact || (compact && compactSpaces > 0)) &&
              (!midsized || (midsized && midsizedSpaces > 0)) &&
              (!large || (large && largeSpaces > 0)) &&
              (!oversized || (oversized && oversizedSpaces > 0))))) ||
        (activeIndex === 8 && (!isLabelled || checkAllSpaceLabels())) ||
        (activeIndex === 9 && aboutSpace) ||
        (activeIndex === 10 && accessInstructions) ||
        (activeIndex === 11 &&
          (scheduleType === '24hours' ||
            (scheduleType === 'fixed' &&
              (monday.isActive ||
                tuesday.isActive ||
                wednesday.isActive ||
                thursday.isActive ||
                friday.isActive ||
                saturday.isActive ||
                sunday.isActive)) ||
            (scheduleType === 'custom' && customTimeRange.length > 0))) ||
        (activeIndex === 12 &&
          (!hasNoticeTime ||
            (hasNoticeTime && noticeTime.value !== '' && noticeTime.value >= 0))) ||
        (activeIndex === 13 && advanceBookingTime.value !== '' && advanceBookingTime.value >= 0) ||
        (activeIndex === 14 &&
          minTime.value !== '' &&
          minTime.value >= 0 &&
          maxTime.value !== '' &&
          maxTime.value >= 0) ||
        (activeIndex === 15 && !(instantBooking === '')) ||
        (activeIndex === 16 && pricingType) ||
        (activeIndex === 17 &&
          pricingRates.perHourRate !== '' &&
          pricingRates.perDayRate !== '' &&
          pricingRates.perWeekRate !== '' &&
          pricingRates.perMonthRate !== '' &&
          pricingRates.perHourRate >= 0 &&
          pricingRates.perDayRate >= 0 &&
          pricingRates.perWeekRate >= 0 &&
          pricingRates.perMonthRate >= 0)
      ) {
        dispatch(updateTempListing({ activeIndex: activeIndex + 1, validated: false }));
      } else {
        dispatch(updateTempListing({ validated: true }));
      }
    } catch (error) {
      // alert('Error while Validatings');
    }
  };

  const handleSubmit = async () => {
    try {
      let streetViewImageArray = [...tempListing.locationDetails.streetViewImages];
      let parkingEntranceImageArray = [...tempListing.locationDetails.parkingEntranceImages];
      let parkingSpaceImageArray = [...tempListing.locationDetails.parkingSpaceImages];

      const {
        tStreetViewImages: streetViewImageFiles,
        tParkingEntranceImages: parkingEntranceImageFiles,
        tParkingSpaceImages: parkingSpaceImageFiles
      } = tempListing;

      let thumbnailURL = 'none';

      if (tempListing.mobile) {
        if (streetViewImageFiles.length > 0) {
          let file = streetViewImageFiles[0];
          let response = await fetch(file);
          let blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${guid()}-${guid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          streetViewImageArray = [url];
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        }

        if (parkingEntranceImageFiles.length > 0) {
          let file = parkingEntranceImageFiles[0];
          let response = await fetch(file);
          let blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${guid()}${guid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          parkingEntranceImageArray = [url];
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        }

        if (parkingSpaceImageFiles.length > 0) {
          let file = parkingSpaceImageFiles[0];
          let response = await fetch(file);
          let blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${guid()}${guid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          parkingSpaceImageArray = [url];
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        }
      } else {
        if (parkingEntranceImageFiles.length > 0) {
          let file = parkingEntranceImageFiles[0];
          let { type: mimeType } = file;
          const extension = mimeType.split('/').pop();
          let key = `images/${uuid()}${uuid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          parkingEntranceImageArray = [url];
          await Storage.put(key, file, {
            contentType: mimeType
          });
        }
        if (streetViewImageFiles.length > 0) {
          let file = streetViewImageFiles[0];
          let { type: mimeType } = file;
          const extension = mimeType.split('/').pop();
          let key = `images/${uuid()}${uuid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          streetViewImageArray = [url];
          await Storage.put(key, file, {
            contentType: mimeType
          });
        }

        if (parkingSpaceImageFiles.length > 0) {
          let file = parkingSpaceImageFiles[0];
          let { type: mimeType } = file;
          const extension = mimeType.split('/').pop();
          let key = `images/${uuid()}${uuid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          parkingSpaceImageArray = [url];
          await Storage.put(key, file, {
            contentType: mimeType
          });
        }
      }

      let variables = {
        thumbnail: streetViewImageArray.length > 0 ? streetViewImageArray[0] : thumbnailURL,
        ownerId: userData.sub,
        ownerName: userData.name,
        ownerEmail: userData.email,
        locationDetails: {
          ...tempListing.locationDetails,
          streetViewImages: streetViewImageArray,
          parkingEntranceImages: parkingEntranceImageArray,
          parkingSpaceImages: parkingSpaceImageArray
        },
        spaceDetails: tempListing.spaceDetails,
        spaceAvailable: tempListing.spaceAvailable,
        pricingDetails: tempListing.pricingDetails,
        location: tempListing.locationDetails.marker
      };

      if (tempListing.edit) {
        const { data } = await updateListing({
          variables: {
            id: tempListing._id,
            published: false,
            ...variables
          }
        });
        dispatch(updateListingLocal(data.updateListing));
      } else {
        const { data: data1 } = await createListing({
          variables
        });
        dispatch(addListingLocal(data1.createListing));
      }
      dispatch(deleteTempListing());
    } catch (error) {
      // alert('Error');
      console.log('Error handleSubmit', error);
    }
  };

  return {
    handleSubmit,
    handleNext
  };
};

const GET_PUBLISHED_LISTINGS_WITH_LATLNG = gql`
  query GetListingsWithBookings(
    $lat: Float!
    $lng: Float!
    $start: String!
    $end: String!
    $startDay: Int!
    $startHour: Int!
    $startMinute: Int!
    $endDay: Int!
    $endHour: Int!
    $endMinute: Int!
  ) {
    getListingsWithBookings(
      lat: $lat
      lng: $lng
      start: $start
      end: $end
      startDay: $startDay
      startHour: $startHour
      startMinute: $startMinute
      endDay: $endDay
      endHour: $endHour
      endMinute: $endMinute
    ) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

export const useFindParking = () => {
  const { start, end, coordinates } = useSelector(({ findParking }) => findParking);
  const startDay = new Date(start).getDay();
  const startHour = new Date(start).getHours();
  const startMinute = new Date(start).getMinutes();
  const endDay = new Date(end).getDay();
  const endHour = new Date(end).getHours();
  const endMinute = new Date(end).getMinutes();
  const lat = coordinates[1];
  const lng = coordinates[0];
  const { loading, error, data } = useQuery(GET_PUBLISHED_LISTINGS_WITH_LATLNG, {
    variables: {
      lat,
      lng,
      start,
      end,
      startDay,
      startHour,
      startMinute,
      endDay,
      endHour,
      endMinute
    }
    // fetchPolicy: 'network-only' // 'cache-and-network' // 'network-only'
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.getListingsWithBookings && data.getListingsWithBookings !== null) {
      dispatch(updateFindParkingData({ parkings: data.getListingsWithBookings }));
    }
  }, [data]);
  return { loading, error, data };
};

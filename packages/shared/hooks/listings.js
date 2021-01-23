/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addListingLocal, updateListingLocal } from '../redux/actions/user';
import { deleteTempListing } from '../redux/actions/tempListing';

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
          const response = await fetch(file);
          const blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${uuid()}-${uuid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          streetViewImageArray = [url];
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        }

        if (parkingEntranceImageFiles.length > 0) {
          let file = parkingEntranceImageFiles[0];
          const response = await fetch(file);
          const blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
          let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
          parkingEntranceImageArray = [url];
          await Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        }

        if (parkingSpaceImageFiles.length > 0) {
          let file = parkingSpaceImageFiles[0];
          const response = await fetch(file);
          const blob = await response.blob();
          let extension = 'jpeg';
          let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
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
    handleSubmit
  };
};

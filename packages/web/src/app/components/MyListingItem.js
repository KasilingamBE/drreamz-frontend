import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import { deleteListingLocal, updateListingLocal } from "../redux/actions/user";
import { connect } from "react-redux";
import placeholderImg from "../../assets1/images/placeholder-img.jpg";
import { loadUserListings } from "../redux/actions/user";
import { client } from "../graphql";
import { useRouter } from "next/router";

const PUBLISH_LISTING = gql`
  mutation UpdateListing($id: ID!, $published: Boolean) {
    updateListing(id: $id, published: $published) {
      _id
      ownerId
      ownerEmail
      ownerName
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id)
  }
`;

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

const MyListingItem = ({
  listBy,
  _id,
  published,
  bookings,
  locationDetails,
  spaceDetails,
  spaceAvailable,
  pricingDetails,
  deleteListingLocal,
  updateListingLocal,
  listings,
  loadUserListings,
  userId,
  // handleDeleteUI,
}) => {
  const router = useRouter();
  const [publishListing] = useMutation(PUBLISH_LISTING);
  const [deleteListing] = useMutation(DELETE_LISTING);
  const [disabled, updateDisabled] = useState(false);

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
    features,
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
    accessInstructions,
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
    // startTime,
    // endTime,
    customTimeRange,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking,
  } = spaceAvailable;

  const { pricingType, pricingRates } = pricingDetails;

  const checkAllSpaceLabels = () => {
    var flag = true;
    spaceLabels.forEach((item) => {
      if (!item.label || !item.largestSize) {
        console.log("found invalid space label");
        flag = false;
      }
    });
    return flag;
  };

  const checkWithdrawalSettings = async () => {
    let { data } = await client.query({
      query: stripe_Retrieve_Account,
      variables: { userId: userId },
    });
    // .then(({data})=>{
    console.log("data :", data);
    if (data.stripeRetrieveAccount) {
      console.log("data :", data.stripeRetrieveAccount);
      let stripeData = JSON.parse(data.stripeRetrieveAccount);
      console.log(stripeData);
      if (!stripeData.details_submitted) {
        alert("Details not submitted");
        router.push("/withdrawal-settings");
        return false;
      } else {
        if (!stripeData.payouts_enabled) {
          alert("Please Update your Withdrawal Settings");
          router.push("/withdrawal-settings");
          return false;
        } else {
          return true;
        }
      }
    } else {
      alert("Withdrawal Settings not Set Up. Please Set it and Try again");
      router.push("/withdrawal-settings");
      return false;
    }
    // }).catch((error)=>{console.log(error);});
  };

  const checkTotalCount = () => {
    var flag = true;
    var sum = 0;
    if (motorcycle) {
      sum += parseInt(motorcycleSpaces);
    }
    if (compact) {
      sum += parseInt(compactSpaces);
    }
    if (midsized) {
      sum += parseInt(midsizedSpaces);
    }
    if (large) {
      sum += parseInt(largeSpaces);
    }
    if (oversized) {
      sum += parseInt(oversizedSpaces);
    }

    if (sum != qtyOfSpaces) {
      flag = false;
    }

    return flag;
  };

  const checkIfComplete = async () => {
    if (
      propertyName &&
      country &&
      address &&
      city &&
      state &&
      postalCode &&
      code &&
      phone &&
      qtyOfSpaces >= 1 &&
      (heightRestriction ? height1.value > 0 : true) &&
      ((sameSizeSpaces && largestSize) ||
        (!sameSizeSpaces &&
          (motorcycle || compact || midsized || large || oversized) &&
          checkTotalCount())) &&
      (isLabelled ? checkAllSpaceLabels() : true) &&
      aboutSpace &&
      accessInstructions &&
      (scheduleType == "24hours" ||
        (scheduleType == "fixed" &&
          (monday.isActive ? monday.startTime && monday.endTime : true) &&
          (tuesday.isActive ? tuesday.startTime && tuesday.endTime : true) &&
          (wednesday.isActive
            ? wednesday.startTime && wednesday.endTime
            : true) &&
          (thursday.isActive ? thursday.startTime && thursday.endTime : true) &&
          (friday.isActive ? friday.startTime && friday.endTime : true) &&
          (saturday.isActive ? saturday.startTime && saturday.endTime : true) &&
          (sunday.isActive ? sunday.startTime && sunday.endTime : true)) ||
        (scheduleType == "custom" && customTimeRange.length > 0)) &&
      noticeTime.value >= 0 &&
      advanceBookingTime.value >= 0 &&
      minTime.value >= 0 &&
      maxTime.value >= 0 &&
      !(instantBooking === "") &&
      pricingRates.perHourRate >= 0 &&
      pricingRates.perDayRate >= 0 &&
      pricingRates.perWeekRate >= 0 &&
      pricingRates.perMonthRate >= 0
    ) {
      console.log(await checkWithdrawalSettings());
      if (!(await checkWithdrawalSettings())) {
        // alert("Withdrawal Settings not Set Up. Please Set it and Try again");
        return false;
      } else {
        return true;
      }
    } else {
      alert("Listing Incomplete!", "Please Complete and Try Again");
      return false;
    }
  };

  const handlePublish = async () => {
    try {
      updateDisabled(true);
      console.log("Check if complete :", await checkIfComplete());
      if (await checkIfComplete()) {
        // props.dispatch(showLoading());
        let res = await publishListing({
          variables: {
            id: _id,
            published: !published,
          },
        });
        if (published) {
          alert("Listing Inactivated Successfully");
        } else {
          alert("Listing Activated Successfully");
        }
        updateListingLocal(res.data.updateListing);
      } else {
        // alert("Listing Incomplete!", "Please Complete and Try Again");
      }

      updateDisabled(false);
      // props.dispatch(hideLoading());
    } catch (error) {
      updateDisabled(false);
      // props.dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong!", "Please try again");
    }
  };

  const handleDelete = async () => {
    try {
      updateDisabled(true);
      if (window.confirm("Are you sure you want to delete this listing?")) {
        // props.dispatch(showLoading());
        const response = await deleteListing({
          variables: {
            id: _id,
          },
        });
        updateDisabled(false);
        // handleDeleteUI(_id);
        // await loadUserListings(listings.filter((item) => item._id !== _id));
        console.log(response);
        // window.location.reload();

        alert("Listing deleted successfully");

        // props.dispatch(hideLoading());
        await deleteListingLocal(_id);
      } else {
        return updateDisabled(false);
      }
    } catch (error) {
      // props.dispatch(hideLoading());
      console.log(error);
      updateDisabled(false);
      alert("Something went wrong!", "Please try again");
    }
  };

  return (
    <div className="listing-item row">
      {/* <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 listing-img'>
        {images.length > 0 ? (
          <img src={images[0]} />
        ) : (
          <img src={placeholderImg} />
        )}
      </div> */}
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listing-content">
        <div className="top row">
          <h4 className="col-10">
            {listBy === "address" ? address : propertyName}
          </h4>
          <div class="tag col-2">Manager</div>
        </div>

        <div className="booking-count">
          {bookings.length > 0 ? bookings.length : "No"} Upcoming{" "}
          {bookings.length > 1 ? "Bookings" : "Booking"}
        </div>

        <div className="listing-btn-row">
          <Button variant="outline-primary" disabled={disabled}>
            Login
          </Button>
          <Link href={`/parkings/orders/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Staff Orders
            </Button>
          </Link>
          <Link href={`/parkings/orders/all/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Parking Orders
            </Button>
          </Link>
          <Link href={`/listings/${_id}`}>
            <Button variant="primary" disabled={disabled}>
              View Details
            </Button>
          </Link>
          <Link href={`/listings/managestaff/${_id}`}>
            <Button variant="primary" disabled={disabled}>
              Manage Staff
            </Button>
          </Link>
          <Link href={`/listings/add?edit=true&id=${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Modify
            </Button>
          </Link>
          <Link href={`/listings/promo-codes/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Promo Codes
            </Button>
          </Link>
          <Button
            variant="outline-success"
            onClick={handlePublish}
            disabled={disabled}
          >
            {published ? "Inactive" : "Active"}
          </Button>
          <Link href={`/listings/inbox/${_id}`}>
            <Button variant="outline-primary" disabled={disabled}>
              Inbox
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, auth }) => ({
  listings: user.listings,
  userId: auth.data.attributes.sub,
});

export default connect(mapStateToProps, {
  deleteListingLocal,
  updateListingLocal,
  loadUserListings,
})(MyListingItem);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IoIosStar, IoIosStarHalf } from 'react-icons/io';
import { FaMotorcycle, FaCarSide, FaCar, FaShuttleVan } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
// import MapContainer from '../app/components/MapContainer';
import MapContainer2 from '../app/components/listings/MapContainer';
import { Button, Table } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { client } from '../app/graphql/index';
import moment from 'moment';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { useGetOneListing } from '../../../shared/hooks/listings';

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

const MoreDetails = ({ id, listings, isSpaceOwner }) => {
  const { loading, error, data } = useGetOneListing(id);

  // const { loading, error, data } = useQuery(GET_LISTING, {
  //   variables: { id: id }
  // });

  const [rating, setRating] = useState(0);

  // useEffect(() => {
  //   if (data && data.getListingReviews) {
  //     if (data.getListingReviews.length < 1) {
  //       setRating(0);
  //     } else {
  //       let sum = 0;
  //       data.getListingReviews.forEach((item) => {
  //         sum += item.rating;
  //       });
  //       setRating(sum / data.getListingReviews.length);
  //     }
  //   }
  // }, [data]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !data || data.getListing == null) {
    return <div className="loading">No Results Found!</div>;
  }

  // console.log(data, error, loading);

  // useEffect(() => {
  //   getListing();
  // }, []);

  // useEffect(() => {
  //   let id = match.params.id;
  //   let listingData = listings.filter((item) => item._id == id);
  //   if (listingData.length == 1) {
  //     setListing(listingData[0]);
  //     setLoading(false);
  //     setIsFound(true);
  //   }
  //   console.log(listingData[0]);
  // }, []);

  const {
    _id,
    locationDetails,
    spaceDetails,
    spaceAvailable,
    pricingDetails,
    reviews
  } = data.getListing;
  const {
    address,
    city,
    state,
    country,
    postalCode,
    propertyName,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features,
    propertyType
  } = locationDetails;
  const {
    qtyOfSpaces,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    parkingSpaceType,
    heightRestriction,
    height1,
    height2,
    aboutSpace,
    accessInstructions,
    spaceLabels
  } = spaceDetails;
  const {
    scheduleType,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    customTimeRange,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailable;
  const { pricingRates, pricingType } = pricingDetails;
  const streetViewImageArray = streetViewImages.map((item) => ({
    original: item,
    thumbnail: item
  }));
  const parkingEntranceImageArray = parkingEntranceImages.map((item) => ({
    original: item,
    thumbnail: item
  }));
  const parkingSpaceImageArray = parkingSpaceImages.map((item) => ({
    original: item,
    thumbnail: item
  }));
  return (
    <div className="dg__account">
      {address && city && state && postalCode && country && <h1 className="heading">{address}</h1>}
      {propertyName && <p className="lead">{propertyName}</p>}
      {/* <div className="stars">
        <IoIosStar className="star" />
        <IoIosStar className="star" />
        <IoIosStar className="star" />
        <IoIosStar className="star" />
        <IoIosStarHalf className="star" />
      </div> */}
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        numberOfStars={5}
        name="rating"
        isAggregateRating={true}
      />
      <span style={{ marginLeft: '10px', fontSize: '18px' }}>{reviews.length}</span>
      {streetViewImages.length > 0 && (
        <div className="detail-item">
          <h4>Street View Images</h4>
          <div>
            <img className="parking-detail-img" src={streetViewImages[0]} />
          </div>
        </div>
      )}
      {parkingEntranceImages.length > 0 && (
        <div className="detail-item">
          <h4>Parking Entrance Images</h4>
          <div>
            <img className="parking-detail-img" src={parkingEntranceImages[0]} />
          </div>
        </div>
      )}
      {parkingSpaceImages.length > 0 && (
        <div className="detail-item">
          <h4>Parking Space Images</h4>
          <div>
            <img className="parking-detail-img" src={parkingSpaceImages[0]} />
          </div>
        </div>
      )}
      {features.length > 0 && (
        <div className="features">
          {features.map((item) => (
            <div key={item} className="feature-item">
              {item}
            </div>
          ))}
        </div>
      )}

      {marker && (
        <div className="detail-item">
          <h4>Location on the Map</h4>
          {/* <MapContainer coordinates={marker.coordinates} /> */}
          <MapContainer2 coordinates={marker.coordinates} />
          <p className="lead">{address}</p>
        </div>
      )}
      {scheduleType && (
        <div className="detail-item">
          <h4>Hours</h4>
          {scheduleType == '24hours' && <p className="lead">This facility is open 24/7.</p>}
          {scheduleType == 'fixed' && (
            <div className="schedule-table">
              <p className="lead">This facility is open on :</p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {monday.isActive && (
                    <tr>
                      <td>Monday</td>
                      <td>{moment(monday.startTime).format('lll')}</td>
                      <td>{moment(monday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {tuesday.isActive && (
                    <tr>
                      <td>Tuesday</td>
                      <td>{moment(tuesday.startTime).format('lll')}</td>
                      <td>{moment(tuesday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {wednesday.isActive && (
                    <tr>
                      <td>Wednesday</td>
                      <td>{moment(wednesday.startTime).format('lll')}</td>
                      <td>{moment(wednesday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {thursday.isActive && (
                    <tr>
                      <td>Thursday</td>
                      <td>{moment(thursday.startTime).format('lll')}</td>
                      <td>{moment(thursday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {friday.isActive && (
                    <tr>
                      <td>Friday</td>
                      <td>{moment(friday.startTime).format('lll')}</td>
                      <td>{moment(friday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {saturday.isActive && (
                    <tr>
                      <td>Saturday</td>
                      <td>{moment(saturday.startTime).format('lll')}</td>
                      <td>{moment(saturday.endTime).format('lll')}</td>
                    </tr>
                  )}
                  {sunday.isActive && (
                    <tr>
                      <td>Sunday</td>
                      <td>{moment(sunday.startTime).format('lll')}</td>
                      <td>{moment(sunday.endTime).format('lll')}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
          {scheduleType == 'custom' && (
            <>
              <p className="lead">
                This facility is open from{' '}
                {/* {moment(Date.parse(customTimeRange[0])).format("llll")} to{" "}
              {moment(Date.parse(customTimeRange[1])).format("llll")}.{" "} */}
              </p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {customTimeRange.map((item) => (
                    <tr>
                      <td>{moment(item[0]).format('lll')}</td>
                      <td>{moment(item[1]).format('lll')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      )}
      {((sameSizeSpaces && largestSize) ||
        motorcycle ||
        compact ||
        midsized ||
        large ||
        oversized) && (
        <div className="detail-item">
          <h4>Vehicle Sizes Accepted</h4>

          <div className="vehicles">
            {sameSizeSpaces ? (
              largestSize == 'Motorcycle' ? (
                <div className="vehicle">
                  <FaMotorcycle className="vehicle-icon" />
                  <p>Motorcycle</p>
                </div>
              ) : largestSize == 'Compact' ? (
                <>
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                  <div className="vehicle">
                    <FaCarSide className="vehicle-icon" />
                    <p>Compact</p>
                  </div>
                </>
              ) : largestSize == 'Mid Sized' ? (
                <>
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                  <div className="vehicle">
                    <FaCarSide className="vehicle-icon" />
                    <p>Compact</p>
                  </div>
                  <div className="vehicle">
                    <FaCar className="vehicle-icon" />
                    <p>Mid Sized</p>
                  </div>
                </>
              ) : largestSize == 'Large' ? (
                <>
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                  <div className="vehicle">
                    <FaCarSide className="vehicle-icon" />
                    <p>Compact</p>
                  </div>
                  <div className="vehicle">
                    <FaCar className="vehicle-icon" />
                    <p>Mid Sized</p>
                  </div>
                  <div className="vehicle">
                    <AiFillCar className="vehicle-icon" />
                    <p>Large</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                  <div className="vehicle">
                    <FaCarSide className="vehicle-icon" />
                    <p>Compact</p>
                  </div>
                  <div className="vehicle">
                    <FaCar className="vehicle-icon" />
                    <p>Mid Sized</p>
                  </div>
                  <div className="vehicle">
                    <AiFillCar className="vehicle-icon" />
                    <p>Large</p>
                  </div>
                  <div className="vehicle">
                    <FaShuttleVan className="vehicle-icon" />
                    <p>Oversized</p>
                  </div>
                </>
              )
            ) : (
              <>
                {motorcycle && (
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                )}
                {compact && (
                  <div className="vehicle">
                    <FaCarSide className="vehicle-icon" />
                    <p>Compact</p>
                  </div>
                )}
                {midsized && (
                  <div className="vehicle">
                    <FaCar className="vehicle-icon" />
                    <p>Mid Sized</p>
                  </div>
                )}
                {large && (
                  <div className="vehicle">
                    <AiFillCar className="vehicle-icon" />
                    <p>Large</p>
                  </div>
                )}
                {oversized && (
                  <div className="vehicle">
                    <FaShuttleVan className="vehicle-icon" />
                    <p>Oversized</p>
                  </div>
                )}
              </>
            )}
          </div>
          {propertyType && parkingSpaceType && (
            <p className="lead">
              This parking space is a {propertyType} and {parkingSpaceType} parking type.
            </p>
          )}
          {heightRestriction && (
            <p className="lead">
              This parking has a {height1.value} {height1.unit} {height2.value} {height2.unit}{' '}
              vehicle height limit
            </p>
          )}
        </div>
      )}
      {qtyOfSpaces && (largestSize || motorcycle || compact || midsized || large || oversized) && (
        <div className="detail-item">
          <h4>Space Details</h4>
          {sameSizeSpaces ? (
            <p className="lead">
              This parking has total {qtyOfSpaces} quantity of{' '}
              {qtyOfSpaces > 1 ? 'spaces  of same size' : 'space'}.
            </p>
          ) : (
            <p className="lead">
              This parking has total {qtyOfSpaces} quantity of spaces for{' '}
              {motorcycle && `${motorcycleSpaces} motorcycle, `}
              {compact && `${compactSpaces} compact, `}
              {midsized && `${midsizedSpaces} mid sized, `}
              {large && `${largeSpaces} large, `}
              {oversized && `${oversizedSpaces} over sized`}.
            </p>
          )}
          {spaceLabels.length > 0 && (
            <div className="schedule-table">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Vehicle Size</th>
                  </tr>
                </thead>
                <tbody>
                  {spaceLabels.map((item) => (
                    <tr key={item.label}>
                      <td>{item.label}</td>
                      <td>{item.largestSize}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
      {noticeTime.value > 0 && (
        <div className="detail-item">
          <h4>How much notice time space owner needs before you arrive?</h4>
          <p className="lead">
            {noticeTime.value} {noticeTime.unit}
          </p>
        </div>
      )}
      {advanceBookingTime.value > 0 && (
        <div className="detail-item">
          <h4>How far in advance you can book?</h4>
          <p className="lead">
            {advanceBookingTime.value} {advanceBookingTime.unit}
          </p>
        </div>
      )}
      {minTime.value > 0 && maxTime.value > 0 && (
        <div className="detail-item">
          <h4>How long you can stay?</h4>
          <p className="lead">
            Minimum : {minTime.value} {minTime.unit}
          </p>
          <p className="lead">
            Maximum : {maxTime.value} {maxTime.unit}
          </p>
        </div>
      )}
      {aboutSpace && (
        <div className="detail-item">
          <h4>Things you should know</h4>
          <p className="lead">{aboutSpace}</p>
        </div>
      )}
      {accessInstructions && (
        <div className="detail-item">
          <h4>Getting Here</h4>
          <p className="lead">{accessInstructions}</p>
        </div>
      )}

      {pricingType &&
        (pricingRates.perHourRate >= 0 ||
          pricingRates.perDayRate >= 0 ||
          pricingRates.perWeekRate >= 0 ||
          pricingRates.perMonthRate >= 0) && (
          <div className="detail-item">
            <h4>Pricing Table</h4>

            <p className="lead">This parking has a {pricingType} billing type.</p>
            <div className="schedule-table">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRates.perHourRate >= 0 && (
                    <tr>
                      <td>1 Hour</td>
                      <td>$ {pricingRates.perHourRate}.00</td>
                    </tr>
                  )}
                  {pricingRates.perDayRate >= 0 && (
                    <tr>
                      <td>1 Day</td>
                      <td>$ {pricingRates.perDayRate}.00</td>
                    </tr>
                  )}
                  {pricingRates.perWeekRate >= 0 && (
                    <tr>
                      <td>1 Week</td>
                      <td>$ {pricingRates.perWeekRate}.00</td>
                    </tr>
                  )}

                  {pricingRates.perMonthRate >= 0 && (
                    <tr>
                      <td>1 Month</td>
                      <td>$ {pricingRates.perMonthRate}.00</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        )}

      {!(instantBooking === '') && (
        <div className="detail-item">
          <h4>Booking Process</h4>
          <p className="lead">
            {instantBooking
              ? 'You can instantly book your space.'
              : "You will need owner's approval to confirm your booking."}
          </p>
        </div>
      )}
      {pricingRates.perHourRate >= 0 && (
        <div className="listing-footer">
          <div className="listing-rate">
            <h4>$ {pricingRates.perHourRate}.00 </h4>
            <p className="lead">per hour</p>
          </div>
          {isSpaceOwner ? (
            <Link href="/listings/my">
              <Button variant="primary">Close</Button>
            </Link>
          ) : (
            <>
              <Link href={`/book-now/${_id}`}>
                <Button variant="primary">Book Now</Button>
              </Link>
              {/* <StripeBookNow
                // address={address}
                // description={`This parking has total ${qtyOfSpaces} quantity of space`}
                // spaceId={_id}
                space={{
                  name: address,
                  _id: _id,
                  description: `This parking has total ${qtyOfSpaces} quantity of space`,
                  ownerId: userId,
                }}
                images={streetViewImages}
              /> */}
              {/* <CheckoutForm ownerId={} */}
            </>
          )}
        </div>
      )}
      {/* <CheckoutForm /> */}
    </div>
  );
};

const mapStateToProps = ({ listing, user }) => ({
  isSpaceOwner: user.isSpaceOwner,
  listings: user.listings
});

export default connect(mapStateToProps)(MoreDetails);

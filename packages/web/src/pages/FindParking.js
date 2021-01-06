import React, { useEffect, useState } from 'react';
import { Nav, Form, Button, Spinner } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { showLoading, hideLoading } from 'react-redux-loading';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsFilterRight } from 'react-icons/bs';
import { FaSearchLocation } from 'react-icons/fa';
import { ImLocation2, ImList2 } from 'react-icons/im';
import { gql, useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MapContainer from '../app/components/MapContainer';
import { client } from '../app/graphql/index';
import DriverContainer from '../app/components/DriverContainer';
import FindParkingList from '../app/components/FindParkingList';
import { setSearchData } from '../app/redux/actions/findParking';
import StartEndDateTimePicker from '../app/components/StartEndDateTimePicker';
import { roundTime } from '../helpers/utilities';
import ParkingsListView from '../app/components/ParkingsListView';

Geocode.setApiKey('AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg');

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
        customTimeRange
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

const FindParking = ({ findParking, setSearchData, showLoading, hideLoading }) => {
  const [visible, setVisible] = useState(false);
  const [listView, setListView] = useState(false);
  const [selected, setSelected] = useState({});
  const [disabled, setDisabled] = useState(false);
  const s = moment(new Date()).format('LT');

  const st = roundTime(s, 15) + (s.substring(s.length - 3) === ' AM' ? ' AM' : ' PM');

  // const [duration,setDuration] = useState('hourly');

  const [findParkingData, setFindParkingData] = useState({
    search: '',
    coordinates: [-118.4055426, 33.8612058],
    parkings: [],
    start: new Date(new Date(new Date()).setHours(new Date().getHours() + 1)),
    end: new Date(new Date(new Date()).setHours(new Date().getHours() + 3)),
    // start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
    // end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hours')._d,
    duration: 'hourly'
  });

  const { search, coordinates, parkings, start, end, duration } = findParkingData;

  const onChangeSearch = (value) => {
    // setSearch(value);
    setFindParkingData({ ...findParkingData, search: value });
  };

  const onMapClick = (mapProps, map, clickEvent) => {
    // const { google } = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    console.log(clickEvent);
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    console.log(mapProps);
    console.log(map);
    // setMarker({ lat: lat, lng: lng });
    // setCoordinates([lng, lat]);
  };

  const onMarkerClick = (data) => {
    setSelected(data);
    setVisible(true);
  };

  const handleSelect = async (value) => {
    console.log(value);
    setFindParkingData({ ...findParkingData, search: value });
    // const details = await geocodeByAddress(value);
    // console.log(details);

    geocodeByAddress(value)
      .then((details) => {
        return getLatLng(details[0]);
      })
      .then((latLng) => {
        // console.log('Success', latLng);
        setFindParkingData({
          ...findParkingData,
          coordinates: [latLng.lng, latLng.lat],
          search: value
        });
        setSearchData({
          ...findParking,
          coordinates: [latLng.lng, latLng.lat]
        });
        // setCoordinates([latLng.lng, latLng.lat]);
        // setMarker(latLng);
        // setLocationData({ ...locationData, marker: latLng });
      })
      .catch((error) => console.error('Error', error));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        // setMarker({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            console.log(address);

            setFindParkingData({
              ...findParkingData,
              search: address,
              coordinates: [position.coords.longitude, position.coords.latitude]
            });
            setSearchData({
              ...findParkingData,
              coordinates: [position.coords.longitude, position.coords.latitude]
            });
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const onSubmitHandler = async () => {
    const startDay = new Date(start).getDay();
    const startHour = new Date(start).getHours();
    const startMinute = new Date(start).getMinutes();
    const endDay = new Date(end).getDay();
    const endHour = new Date(end).getHours();
    const endMinute = new Date(end).getMinutes();
    if (search && coordinates.length > 0 && start && end) {
      setDisabled(true);
      try {
        showLoading();
        const { data } = await client.query({
          query: GET_PUBLISHED_LISTINGS_WITH_LATLNG,
          variables: {
            lat: coordinates[1],
            lng: coordinates[0],
            start,
            end,
            startDay,
            startHour,
            startMinute,
            endDay,
            endHour,
            endMinute
          }
        });
        setFindParkingData({
          ...findParkingData,
          parkings: data.getListingsWithBookings
        });

        setSearchData({
          ...findParkingData,
          parkings: data.getListingsWithBookings
        });
        // loadUserListings(data.getUserListings);
        hideLoading();
        setDisabled(false);
        // console.log(data.getListingsWithBookings);
        if (data.getListingsWithBookings.length > 0) {
          let item = data.getListingsWithBookings[0];
          let qty = item.spaceDetails.qtyOfSpaces;
          let res = item.bookingCount;
          let status = res.length > 0 ? qty - res[0].total > 0 : true;
          // console.log('bookingCount', res);
          // console.log('qtyOfSpaces', qty);
          // console.log('qty res', status);
        }
      } catch (error) {
        console.log(error);
        hideLoading();
        setDisabled(false);
      }

      // client
      //   .query({
      //     query: GET_PUBLISHED_LISTINGS_WITH_LATLNG,
      //     variables: { lat: coordinates[1], lng: coordinates[0], start, end },
      //   })
      //   .then(({ data }) => {
      //     console.log(data.getListingsWithBookings);
      //     setFindParkingData({
      //       ...findParkingData,
      //       parkings: data.getListingsWithBookings,
      //     });

      //     setSearchData({
      //       ...findParkingData,
      //       parkings: data.getListingsWithBookings,
      //     });
      //     // loadUserListings(data.getUserListings);
      //     // props.dispatch(hideLoading());
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     // props.dispatch(hideLoading());
      //   });
    } else {
      alert('Please fill all inputs to start search');
    }
  };

  useEffect(() => {
    // if (findParking.search) {
    //   setFindParkingData(findParking);
    // } else {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          // setMarker({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
          // setFindParkingData({
          //   ...findParkingData,
          //   coordinates: [
          //     position.coords.longitude,
          //     position.coords.latitude,
          //   ],
          // });

          client
            .query({
              query: GET_PUBLISHED_LISTINGS_WITH_LATLNG,
              variables: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                start,
                end
              }
            })
            .then(({ data }) => {
              console.log(data.getListingsWithBookings);
              setFindParkingData({
                ...findParkingData,
                coordinates: [position.coords.longitude, position.coords.latitude],
                parkings: data.getListingsWithBookings ? data.getListingsWithBookings : []
              });

              setSearchData({
                ...findParkingData,
                // start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                // end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hour')._d,
                coordinates: [position.coords.longitude, position.coords.latitude],
                parkings: data.getListingsWithBookings ? data.getListingsWithBookings : []
              });
              // loadUserListings(data.getUserListings);
              // props.dispatch(hideLoading());
            })
            .catch((err) => {
              console.log(err);
              // props.dispatch(hideLoading());
            });
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
    getLocation();
    // }
  }, []);

  return (
    <DriverContainer>
      <div className="dg__account find-parking">
        <div className="find-parking-form">
          <div className="header">
            <Nav variant="pills" activeKey={duration}>
              <Nav.Item>
                <Nav.Link
                  eventKey="hourly"
                  onClick={() => {
                    setFindParkingData({
                      ...findParkingData,
                      duration: 'hourly',
                      start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                      end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hour')._d
                    });
                    setSearchData({
                      ...findParkingData,
                      duration: 'hourly',
                      start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                      end: moment(`${moment(new Date()).format('ll')} ${st}`).add(2, 'hour')._d
                    });
                  }}>
                  Hourly
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="monthly"
                  onClick={() => {
                    setFindParkingData({
                      ...findParkingData,
                      duration: 'monthly',
                      start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                      end: moment(`${moment(new Date()).format('ll')} ${st}`)
                        .add(1, 'month')
                        .subtract(1, 'day')._d
                    });
                    setSearchData({
                      ...findParkingData,
                      duration: 'monthly',
                      start: moment(`${moment(new Date()).format('ll')} ${st}`)._d,
                      end: moment(`${moment(new Date()).format('ll')} ${st}`)
                        .add(1, 'month')
                        .subtract(1, 'day')._d
                    });
                  }}>
                  Monthly
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Button variant="outline-dark">
              <BsFilterRight /> Filter
            </Button>
          </div>
          <div className="row">
            <Form className="col-xl-6 col-lg-5 col-md-5 col-xs-12">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                {/* <Form.Control
                type='email'
                placeholder='Location, Address or Event Name'
              /> */}
                <PlacesAutocomplete
                  value={search}
                  onChange={onChangeSearch}
                  onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <div className="input-group">
                        <input
                          {...getInputProps({
                            placeholder: 'Search your location',
                            className: 'location-search-input form-control ',
                            style: { borderRight: 'none' }
                          })}
                        />
                        {search && (
                          <div
                            className="input-group-append clear-btn"
                            onClick={() => {
                              setFindParkingData({
                                ...findParkingData,
                                search: ''
                              });
                            }}>
                            <span className="input-group-text">
                              <IoIosCloseCircleOutline />
                            </span>
                          </div>
                        )}

                        <div
                          className="input-group-append location-btn"
                          onClick={() => {
                            getCurrentLocation();
                          }}>
                          <span className="input-group-text">
                            <BiCurrentLocation />
                          </span>
                        </div>
                      </div>

                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: '#27aae1',
                                cursor: 'pointer',
                                padding: '10px',
                                border: '1px solid #999'
                              }
                            : {
                                backgroundColor: '#ffffff',
                                cursor: 'pointer',
                                padding: '10px',
                                border: '1px solid #999'
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}>
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Group>
            </Form>
            <StartEndDateTimePicker
              className="col-xl-4 col-lg-5 col-md-5 col-sm-8 col-10"
              start={start}
              // startTime={startTime}
              end={end}
              // endTime={endTime}
              onChange={(start, end) => {
                console.log('time chnage : ', start, end);
                setFindParkingData({
                  ...findParkingData,
                  start: start,
                  end: end
                });
                setSearchData({ ...findParkingData, start: start, end: end });
                // console.log("find parking data :",findParkingData);
              }}
              // onStartTimeChange={(value) => {
              //   console.log("start time change : ",value);
              //   setFindParkingData({...findParkingData,startTime:value})
              // }}
              // onEndChange={(start,end) => {
              //   console.log("End chnage : ",value);
              //   setFindParkingData({...findParkingData,end:value});
              //   setSearchData({...findParkingData,end:value});
              // }}
              // onEndTimeChange={(value) => {
              //   setFindParkingData({...findParkingData,endTime:value})
              // }}
            />
            <Button
              variant="dark"
              className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 search-btn"
              onClick={onSubmitHandler}>
              {disabled ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mb-1"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                <FaSearchLocation />
              )}
            </Button>
          </div>
        </div>
        <div className="map-container">
          {parkings.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="primary"
                onClick={() => {
                  setListView(true);
                }}>
                <ImList2 /> List View
              </Button>
              {listView && <ParkingsListView setListView={setListView} parkings={parkings} />}
            </div>
          )}
          <MapContainer
            coordinates={coordinates}
            onMapClick={onMapClick}
            onMarkerClick={onMarkerClick}
            parkings={parkings}
          />

          {visible && (
            <FindParkingList setVisible={setVisible} parkings={parkings} selected={selected} />
          )}
        </div>
      </div>
    </DriverContainer>
  );
};

const mapStateToProps = ({ findParking }) => ({
  findParking
});

export default connect(mapStateToProps, {
  setSearchData,
  showLoading,
  hideLoading
})(FindParking);

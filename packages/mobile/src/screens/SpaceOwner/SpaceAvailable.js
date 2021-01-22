import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { convertToUnit, convertToMilliseconds } from '@parkyourself-frontend/shared/utils/time';
import { tempListingSpaceA } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import { addListingSpaceAvailable } from '../../actions/listing';

import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import NextButton from '../../components/SpaceOwner/NextButton';
import RadioListItem from '../../components/RadioListItem';
import Input from '../../components/Input';
import colors from '@parkyourself-frontend/shared/config/colors';

function SpaceAvailable({
  onBackButtonPress,
  onNextButtonPress,
  spaceAvailable,
  tempListingSpaceA,
  navigation,
  activeIndex,
  setActiveIndex
}) {
  const scrollRef = useRef();

  // const [activeIndex, setActiveIndex] = useState(1);

  const [width, setWidth] = useState(0);

  const [validate, setValidate] = useState(false);

  //for custom schedule modal
  const [visible, setVisible] = useState(false);

  const [monday, setMonday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.monday : false
  );
  const [tuesday, setTuesday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.tuesday : false
  );
  const [wednesday, setWednesday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.wednesday : false
  );
  const [thursday, setThursday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.thursday : false
  );
  const [friday, setFriday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.friday : false
  );
  const [saturday, setSaturday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.saturday : false
  );
  const [sunday, setSunday] = useState(
    spaceAvailable && spaceAvailable.activeDays ? spaceAvailable.activeDays.sunday : false
  );
  const [scheduleType, setScheduleType] = useState(
    spaceAvailable && spaceAvailable.scheduleType
      ? spaceAvailable.scheduleType == 'daily'
        ? 1
        : 2
      : 1
  );
  const [noticeTime, setNoticeTime] = useState(
    spaceAvailable && spaceAvailable.noticeTime ? spaceAvailable.noticeTime : 1
  );
  const [advanceBookingTime, setAdvanceBookingTime] = useState(
    spaceAvailable && spaceAvailable.advanceBookingTime ? spaceAvailable.advanceBookingTime : 3
  );
  const [minTime, setMinTime] = useState(
    spaceAvailable && spaceAvailable.minTime ? spaceAvailable.minTime : 1
  );
  const [maxTime, setMaxTime] = useState(
    spaceAvailable && spaceAvailable.maxTime ? spaceAvailable.maxTime : 30
  );
  const [instantBooking, setInstantBooking] = useState(
    spaceAvailable && spaceAvailable.instantBooking ? spaceAvailable.instantBooking : true
  );

  // date picker
  const [startTime, setStartTime] = useState(
    spaceAvailable && spaceAvailable.startTime ? spaceAvailable.startTime : null
  );
  const [endTime, setEndTime] = useState(
    spaceAvailable && spaceAvailable.endTime ? spaceAvailable.endTime : null
  );
  const [mode, setMode] = useState('time');
  const [showStart, setStartShow] = useState(false);
  const [showEnd, setEndShow] = useState(false);

  //date picker functions
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || spaceAvailable[activeDay].startTime;
    setEndShow(false);
    setStartShow(false);
    // setStartTime(currentDate);
    tempListingSpaceA({
      [activeDay]: {
        ...spaceAvailable[activeDay],
        startTime: currentDate
      }
    });
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || spaceAvailable[activeDay].endTime;
    setStartShow(false);
    setEndShow(false);
    // setEndTime(currentDate);
    tempListingSpaceA({
      [activeDay]: {
        ...spaceAvailable[activeDay],
        endTime: currentDate
      }
    });
  };

  const showMode = (currentMode, item) => {
    // setMode(currentMode);
    if (item == 'start') {
      setEndShow(false);
      setStartShow(true);
    } else if (item == 'end') {
      setStartShow(false);
      setEndShow(true);
    }
  };

  const [activeDay, setActiveDay] = useState('monday');

  const showDatepicker = (item, day) => {
    setActiveDay(day);
    showMode('time', item);
  };

  // const backButtonHandler = () => {
  //   if (activeIndex != 1) {
  //     setActiveIndex(activeIndex - 1);
  //     scrollRef.current.scrollTo({
  //       y: 0,
  //       animated: true
  //     });
  //     setWidth(width - 20);
  //   } else {
  //     onBackButtonPress();
  //   }
  // };

  const onSubmitHandler = () => {
    try {
      // if (activeIndex != 5) {
      if (
        (activeIndex == 13 &&
          (spaceAvailable.scheduleType === '24hours' ||
            spaceAvailable.scheduleType === 'custom' ||
            spaceAvailable.monday.isActive ||
            spaceAvailable.tuesday.isActive ||
            spaceAvailable.wednesday.isActive ||
            spaceAvailable.thursday.isActive ||
            spaceAvailable.friday.isActive ||
            spaceAvailable.saturday.isActive ||
            spaceAvailable.sunday.isActive)) ||
        activeIndex === 14 ||
        activeIndex === 15 ||
        activeIndex === 16 ||
        activeIndex === 17
      ) {
        setValidate(false);
        setActiveIndex(activeIndex + 1);
        scrollRef.current.scrollTo({
          y: 0,
          animated: true
        });
        setWidth(width + 20);
      } else {
        setValidate(true);
      }
      // } else {
      //   // let spaceAvailableData = {
      //   //   activeDays: {
      //   //     monday: monday,
      //   //     tuesday: tuesday,
      //   //     wednesday: wednesday,
      //   //     thursday: thursday,
      //   //     friday: friday,
      //   //     saturday: saturday,
      //   //     sunday: sunday,
      //   //   },
      //   //   scheduleType: scheduleType == 1 ? 'daily' : '24hours',
      //   //   startTime,
      //   //   endTime,
      //   //   noticeTime,
      //   //   advanceBookingTime,
      //   //   minTime,
      //   //   maxTime,
      //   //   instantBooking,
      //   // };
      //   // addListingSpaceAvailable(spaceAvailableData);
      //   onNextButtonPress();
      // }
    } catch (error) {
      Alert.alert('Something Went wrong!', 'Unable to add space available details');
    }
  };

  return (
    <>
      <AddListingHeader
        onPress={onBackButtonPress}
        width={`${activeIndex * 5.2}%`}
        navigation={navigation}
      />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {/* <Text style={styles.spaceAvailable}>Space Available</Text> */}

        {activeIndex === 13 && (
          <>
            <Text style={styles.heading}>What are the timings?</Text>
            <RadioListItem
              label="Set to 24 hours a day"
              checked={spaceAvailable.scheduleType === '24hours'}
              onPress={() => tempListingSpaceA({ scheduleType: '24hours' })}
            />
            <RadioListItem
              label="Set to a Fixed schedule"
              checked={spaceAvailable.scheduleType === 'fixed'}
              onPress={() => tempListingSpaceA({ scheduleType: 'fixed' })}
            />
            <RadioListItem
              label="Set a Custom Schedule"
              checked={spaceAvailable.scheduleType === 'custom'}
              onPress={() => tempListingSpaceA({ scheduleType: 'custom' })}
            />
            {spaceAvailable.scheduleType === 'fixed' && (
              <>
                <Text style={styles.heading}>At what days can drivers park at your listing?</Text>
                {showStart && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={spaceAvailable[activeDay].startTime}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onStartDateChange}
                  />
                )}
                {showEnd && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={spaceAvailable[activeDay].endTime}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onEndDateChange}
                  />
                )}
                <RadioListItem
                  label="Monday"
                  checked={spaceAvailable.monday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      monday: {
                        ...spaceAvailable.monday,
                        isActive: !spaceAvailable.monday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.monday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'monday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.monday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'monday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.monday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Tuesday"
                  checked={spaceAvailable.tuesday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      tuesday: {
                        ...spaceAvailable.tuesday,
                        isActive: !spaceAvailable.tuesday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.tuesday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'tuesday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.tuesday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'tuesday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.tuesday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Wednesday"
                  checked={spaceAvailable.wednesday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      wednesday: {
                        ...spaceAvailable.wednesday,
                        isActive: !spaceAvailable.wednesday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.wednesday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'wednesday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.wednesday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'wednesday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.wednesday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Thursday"
                  checked={spaceAvailable.thursday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      thursday: {
                        ...spaceAvailable.thursday,
                        isActive: !spaceAvailable.thursday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.thursday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'thursday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.thursday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'thursday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.thursday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Friday"
                  checked={spaceAvailable.friday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      friday: {
                        ...spaceAvailable.friday,
                        isActive: !spaceAvailable.friday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.friday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'friday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.friday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'friday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.friday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Saturday"
                  checked={spaceAvailable.saturday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      saturday: {
                        ...spaceAvailable.saturday,
                        isActive: !spaceAvailable.saturday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.saturday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'saturday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.saturday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'saturday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.saturday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <RadioListItem
                  label="Sunday"
                  checked={spaceAvailable.sunday.isActive}
                  onPress={() =>
                    tempListingSpaceA({
                      sunday: {
                        ...spaceAvailable.sunday,
                        isActive: !spaceAvailable.sunday.isActive
                      }
                    })
                  }
                />
                {spaceAvailable.sunday.isActive && (
                  <View style={styles.button2Row}>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('start', 'sunday')}>
                        <Text style={styles.startTime} numberOfLines={1}>
                          {moment(spaceAvailable.sunday.startTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapper}>
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => showDatepicker('end', 'sunday')}>
                        <Text style={styles.endTime} numberOfLines={1}>
                          {moment(spaceAvailable.sunday.endTime).format('lll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {validate &&
                  !(
                    spaceAvailable.monday.isActive ||
                    spaceAvailable.tuesday.isActive ||
                    spaceAvailable.wednesday.isActive ||
                    spaceAvailable.thursday.isActive ||
                    spaceAvailable.friday.isActive ||
                    spaceAvailable.saturday.isActive ||
                    spaceAvailable.sunday.isActive
                  ) && <Text style={styles.requiredText}>Please select at least one day</Text>}
              </>
            )}
          </>
        )}

        {activeIndex === 14 && (
          <>
            <Text style={styles.heading}>How much notice do you need before a Guest arrives?</Text>
            <RadioListItem
              label="Set it to None"
              checked={!spaceAvailable.hasNoticeTime}
              onPress={() =>
                tempListingSpaceA({
                  hasNoticeTime: !spaceAvailable.hasNoticeTime
                })
              }
            />
            {spaceAvailable.hasNoticeTime && (
              <View style={styles.rect10}>
                <View style={styles.iconRow}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        convertToUnit(
                          spaceAvailable.noticeTime.value,
                          spaceAvailable.noticeTime.unit
                        ) > 1
                      ) {
                        tempListingSpaceA({
                          noticeTime: {
                            ...spaceAvailable.noticeTime,
                            value: convertToMilliseconds(
                              convertToUnit(
                                spaceAvailable.noticeTime.value,
                                spaceAvailable.noticeTime.unit
                              ) - 1,
                              noticeTime.unit
                            )
                          }
                        });
                      }
                    }}>
                    <EntypoIcon name="circle-with-minus" style={styles.icon} />
                  </TouchableOpacity>
                  <Text style={styles.loremIpsum11}>
                    {convertToUnit(spaceAvailable.noticeTime.value, spaceAvailable.noticeTime.unit)}{' '}
                    {spaceAvailable.noticeTime.unit}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      tempListingSpaceA({
                        noticeTime: {
                          ...spaceAvailable.noticeTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.noticeTime.value,
                              spaceAvailable.noticeTime.unit
                            ) + 1,
                            noticeTime.unit
                          )
                        }
                      })
                    }>
                    <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <Text style={styles.description}>
              Tip : At least 2 days&#39; notice can help you plan for a guest&#39;s arrival, but you
              might miss out last minute trips.
            </Text>
          </>
        )}

        {activeIndex === 15 && (
          <>
            <Text style={styles.heading}>How far in advance can guests book?</Text>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(
                        spaceAvailable.advanceBookingTime.value,
                        spaceAvailable.advanceBookingTime.unit
                      ) > 1
                    ) {
                      tempListingSpaceA({
                        advanceBookingTime: {
                          ...spaceAvailable.advanceBookingTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.advanceBookingTime.value,
                              spaceAvailable.advanceBookingTime.unit
                            ) - 1,
                            noticeTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.loremIpsum11}>
                  {convertToUnit(
                    spaceAvailable.advanceBookingTime.value,
                    spaceAvailable.advanceBookingTime.unit
                  )}{' '}
                  {spaceAvailable.advanceBookingTime.unit}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      advanceBookingTime: {
                        ...spaceAvailable.advanceBookingTime,
                        value: convertToMilliseconds(
                          convertToUnit(
                            spaceAvailable.advanceBookingTime.value,
                            spaceAvailable.advanceBookingTime.unit
                          ) + 1,
                          noticeTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.description}>
              Tip : Avoid cancelling or declining guests by only unblocking dates you can host.
            </Text>
          </>
        )}

        {activeIndex === 16 && (
          <>
            <Text style={styles.heading}>How long can guests stay?</Text>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit) > 1
                    ) {
                      tempListingSpaceA({
                        minTime: {
                          ...spaceAvailable.minTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.minTime.value,
                              spaceAvailable.minTime.unit
                            ) - 1,
                            noticeTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.loremIpsum11}>
                  {convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit)}{' '}
                  {spaceAvailable.minTime.unit} Minimum
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      minTime: {
                        ...spaceAvailable.minTime,
                        value: convertToMilliseconds(
                          convertToUnit(spaceAvailable.minTime.value, spaceAvailable.minTime.unit) +
                            1,
                          noticeTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rect10}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit) > 1
                    ) {
                      tempListingSpaceA({
                        maxTime: {
                          ...spaceAvailable.maxTime,
                          value: convertToMilliseconds(
                            convertToUnit(
                              spaceAvailable.maxTime.value,
                              spaceAvailable.maxTime.unit
                            ) - 1,
                            noticeTime.unit
                          )
                        }
                      });
                    }
                  }}>
                  <EntypoIcon name="circle-with-minus" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.loremIpsum11}>
                  {convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit)}{' '}
                  {spaceAvailable.maxTime.unit} Maximum
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    tempListingSpaceA({
                      maxTime: {
                        ...spaceAvailable.maxTime,
                        value: convertToMilliseconds(
                          convertToUnit(spaceAvailable.maxTime.value, spaceAvailable.maxTime.unit) +
                            1,
                          noticeTime.unit
                        )
                      }
                    })
                  }>
                  <EntypoIcon name="circle-with-plus" style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.description}>
              Tip : Shorter trips can mean more reservations but you might have to turn over your
              space more often.
            </Text>
          </>
        )}

        {activeIndex === 17 && (
          <>
            <Text style={styles.heading}>Which booking process do you prefer?</Text>
            <RadioListItem
              label="Instant Booking"
              checked={spaceAvailable.instantBooking}
              onPress={() =>
                tempListingSpaceA({
                  instantBooking: !spaceAvailable.instantBooking
                })
              }
            />
            <RadioListItem
              label="Approval is required"
              checked={!spaceAvailable.instantBooking}
              onPress={() =>
                tempListingSpaceA({
                  instantBooking: !spaceAvailable.instantBooking
                })
              }
            />
          </>
        )}
      </ScrollView>
      <NextButton onPress={onSubmitHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    minHeight: Dimensions.get('window').height,
    paddingTop: 50,
    paddingBottom: 80
  },
  spaceAvailable: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginVertical: 20
  },
  subHeading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 40
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginVertical: 21
  },
  rect: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  monday: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    marginLeft: 2,
    marginTop: 12
  },
  switch: {},
  text: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20,
    marginTop: 37
  },
  materialRadio1: {
    height: 30,
    width: 30
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginLeft: 10
    // marginTop: 6,
  },
  materialRadio1Row: {
    height: 30,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  wrapper: {
    width: '49%'
  },
  button2: {
    width: '100%',
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)'
  },
  startTime: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 16,
    marginTop: 9
    // marginLeft: 28,
  },
  button3: {
    width: '50%',
    height: 39,
    borderBottomWidth: 1,
    borderColor: 'rgba(182,182,182,1)',
    marginLeft: 38
  },
  endTime: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 16,
    marginTop: 9
    // marginLeft: 33,
  },
  button2Row: {
    height: 39,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21,
    // marginLeft: 25,
    marginBottom: 30
  },
  materialRadio2: {
    height: 30,
    width: 30
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginLeft: 10
  },
  materialRadio2Row: {
    height: 30,
    flexDirection: 'row',
    marginTop: 28,
    alignItems: 'center'
  },
  rect9: {
    width: 238,
    height: 38,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(39,170,225,1)',
    marginTop: 30,
    // marginLeft: 27,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loremIpsum4: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  loremIpsum5: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 30
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13
  },
  button: {
    width: '100%',
    // height: 46,
    // borderBottomWidth: 1,
    // borderColor: 'rgba(214,214,214,1)',
    marginTop: 17
  },
  hour: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 15
    // marginLeft: 13,
  },
  description: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    lineHeight: 20,
    marginTop: 40,
    fontSize: 16
    // marginLeft: 28,
  },
  loremIpsum7: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 31
    // marginLeft: 29,
  },
  button4: {
    width: '100%',
    // height: 46,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 16
    // marginLeft: 26,
  },
  loremIpsum8: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginTop: 15
    // marginLeft: 11,
  },
  loremIpsum9: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    lineHeight: 20,
    marginTop: 24
    // marginLeft: 29,
  },
  loremIpsum10: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 24
    // marginLeft: 29,
  },
  rect10: {
    width: '100%',
    // height: 101,
    flexDirection: 'row',
    marginTop: 25
    // justifyContent: 'flex-end'
    // marginLeft: 25,
  },
  icon: {
    color: colors.primary,
    fontSize: 30,
    marginBottom: -5
    // height: 34,
    // width: 34,
  },
  loremIpsum11: {
    color: colors.secondary,
    marginLeft: 20,
    // marginTop: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  icon2: {
    color: colors.secondary,
    fontSize: 30,
    // height: 24,
    // width: 22,
    // marginLeft: 20
    marginBottom: -5
  },
  iconRow: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
    // marginRight: 4,
    // marginLeft: 5,
    // marginTop: 4,
    // marginVertical: 10
    // paddingBottom: -10
    // marginBottom: -100
  },
  rect11: {
    width: 195,
    height: 31,
    flexDirection: 'row',
    marginTop: 15
    // marginLeft: 25,
  },
  loremIpsum14: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 17,
    marginTop: 24
    // marginLeft: 27,
  },
  icon5: {
    color: 'rgba(39,170,225,1)',
    fontSize: 20
  },
  instantBooking: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    marginLeft: 11
  },
  icon5Row: {
    height: 22,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 28,
    marginRight: 222
  },
  icon6: {
    color: 'rgba(182,182,182,1)',
    fontSize: 20
  },
  approvalIsRequired: {
    // fontFamily: 'roboto-regular',
    color: '#0b4094',
    marginLeft: 12
  },
  icon6Row: {
    height: 22,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 28,
    marginRight: 195
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtnText: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  materialButtonPrimary1: {
    width: 100,
    height: 36,
    marginVertical: 67,
    alignSelf: 'center'
    // marginLeft: 136,
  }
});

const mapStateToProps = ({ tempListing }) => ({
  spaceAvailable: tempListing.spaceAvailable
});
export default connect(mapStateToProps, { tempListingSpaceA })(SpaceAvailable);

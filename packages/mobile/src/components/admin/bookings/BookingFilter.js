import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { FilterContext } from '../../common/FilterButton';

export default function BookingFilter({ activeFilter, setActiveFilter }) {
  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment()
  });
  const { setModal } = useContext(FilterContext);
  const handleSelect = (value) => {
    setActiveFilter(value);
    setModal(false);
  };
  return (
    <View
      style={{
        height: 180,
        width: 170,
        backgroundColor: 'white',
        borderRadius: 1,
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 10
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
          paddingBottom: 10,
          marginBottom: 10
        }}>
        <MaterialCommunityIcon name="filter-variant" size={28} />
        <Text
          style={{
            fontSize: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5
          }}>
          FILTER BY
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'flex-start'
        }}>
        <DateRangePicker
          onChange={(dates) => setRange({ ...range,...dates })}
          endDate={range.endDate}
          startDate={range.startDate}
          displayedDate={range.displayedDate}
          range>
          <Text>Date Range</Text>
        </DateRangePicker>
      </View>
    </View>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useCRUDPropertyType } from '@parkyourself-frontend/shared/hooks/addvehicle';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ScreenTittle from '../common/ScreenTittle';
import LoadingSpinner from '../common/LoadingSpinner';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

export default function FormOptionCRUD({ id }) {
    const {
        data,
        handleUpdate,
        handleFileChange,
        handleRemoveImage,
        onChangeVehicle,
        saveImage,
        onSubmitHandler,
        handleSave,
        setVehicle
    } = useCRUDPropertyType(id);}
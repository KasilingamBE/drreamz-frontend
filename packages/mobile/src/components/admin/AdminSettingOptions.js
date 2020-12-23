import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import ScreenTittle from '../common/ScreenTittle';
import { usePropertyType } from '@parkyourself-frontend/shared/hooks/adminSettings';
import LoadingSpinner from '../common/LoadingSpinner';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialButtonPrimary from '../MaterialButtonPrimary';

const UPDATE_ONE = gql`
  mutation UpdateOneFormOption($id: ID!, $options: [FormOptionInput], $updatedBy: String) {
    updateOneFormOption(id: $id, options: $options, updatedBy: $updatedBy) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

export default function AdminPropertyType(props) {
  const { loading, error, data } = usePropertyType(props.id);
  const [updateOneFormOption] = useMutation(UPDATE_ONE);
  const [disabled, updateDisabled] = useState(false);
  const [payload, setPayload] = useState({
    index: 0,
    options: []
  });
  const [oneData, setOneData] = useState({ options: [] });
  const [form, setForm] = useState({ form: false, edit: false });

  useEffect(() => {
    if (!error && data) {
      setOneData(data.getOneFormOption);
    }
  }, [data]);

  const handleEdit = (index) => {
    setPayload({
      index: index,
      options: oneData.options.map((i) => ({
        value: i.value,
        label: i.label,
        published: i.published
      }))
    });
    setForm({ edit: true, form: true });
  };

  const handleAddNew = () => {
    setPayload({
      index: oneData.options.length,
      options: [
        ...oneData.options.map((i) => ({
          value: i.value,
          label: i.label,
          published: i.published
        })),
        { value: '', label: '', published: true }
      ]
    });
    setForm({ edit: false, form: true });
  };

  const handleSubmit = async () => {
    if (!payload.options[payload.index] || payload.options[payload.index].value === '') {
      Alert.alert('Please enter label of option');
    }
    updateDisabled(true);
    try {
      let { data } = await updateOneFormOption({
        variables: {
          id: props.id,
          options: payload.options,
          updatedBy: props.userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      setForm({ edit: false, form: false });
    } catch (error) {
      // console.log(error);
      updateDisabled(false);
      Alert.alert('Something went wrong please try again');
    }
  };

  const handleChangeFormOption = (e) => {
    const value = e;
    let tempA = [...payload.options];
    tempA = tempA.map((a, i) => {
      if (i === payload.index) {
        let tempa = a;
        tempa.value = value;
        tempa.label = value;
        return tempa;
      } else {
        return a;
      }
    });
    setPayload({
      ...payload,
      options: tempA
    });
  };

  const handleDelete = async (index) => {
    try {
      updateDisabled(true);
      let tempOptions = oneData.options.filter((o, i) => i !== index);
      let { data } = await updateOneFormOption({
        variables: {
          id: props.id,
          options: tempOptions.map((i) => ({
            value: i.value,
            label: i.label,
            published: i.published
          })),
          updatedBy: props.userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
    } catch (error) {
      // console.log("Error", error);
      updateDisabled(false);
      Alert.alert('Something went wrong!', error.message);
    }
  };

  return (
    <View style={styles.outerView}>
      <ScreenTittle title="Property Type" />
      {form.form ? (
        <View>
          <View style={styles.formHeader}>
            <Text style={styles.formHeaderText}>Add New Property Type</Text>
            <TouchableOpacity onPress={() => setForm({ edit: false, form: false })}>
              <FeatherIcon name="x" style={styles.materialCIcon} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              onChangeText={(text) => handleChangeFormOption(text)}
              value={payload.options[payload.index] ? payload.options[payload.index].value : ''}
              style={{ width: '100%', borderColor: 'grey', borderWidth: 1, height: 30, padding: 1 }}
            />
            <MaterialButtonPrimary
              onPress={() => handleSubmit()}
              caption="Submit"
              style={styles.materialButtonPrimary}
            />
          </View>
        </View>
      ) : (
        <MaterialButtonPrimary
          onPress={handleAddNew}
          caption="Add New"
          style={styles.materialButtonPrimary}
        />
      )}
      {loading ? (
        <LoadingSpinner style={{ marginTop: 40 }} />
      ) : (
        !form.form && (
          <FlatList
            data={oneData.options}
            keyExtractor={(item, index) => item.label}
            renderItem={({ item, index }) => (
              <ListItem
                label={item.label}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
          />
        )
      )}
    </View>
  );
}

const ListItem = ({ label, index, handleDelete, handleEdit }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => handleEdit(index)}>
          <FeatherIcon name="edit" style={styles.featherIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <MaterialCommunityIconsIcon name="delete" style={styles.materialCIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formHeader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  formHeaderText: {
    fontSize: 20
    // color
  },
  materialButtonPrimary: {
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    // alignSelf: 'center',
    backgroundColor: '#0b4094',
    paddingVertical: 12,
    borderRadius: 30
  },
  iconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    fontSize: 15
  },
  listItem: {
    marginTop: 20,
    marginBottom: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  outerView: { flex: 1, backgroundColor: colors.white, padding: 20 },

  materialCIcon: {
    fontSize: 30,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 25,
    color: colors.secondary,
    marginRight: 15
  }
});

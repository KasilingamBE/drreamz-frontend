import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';

const GET_ONE = gql`
  query Query {
    getOneFee {
      fee
    }
  }
`;

const GET_ONE_PROPERTY = gql`
  query GetOneFormOption($id: ID!) {
    getOneFormOption(id: $id) {
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

const UPDATE_ONE_PROPERTY = gql`
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

export function useAppFee() {
  const data = useQuery(GET_ONE);
  return data;
}

export function useCRUDPropertyType(id) {
  const { data, loading, error } = useQuery(GET_ONE_PROPERTY, { variables: { id } });
  const [updateOneFormOption] = useMutation(UPDATE_ONE_PROPERTY);
  const [disabled, updateDisabled] = useState(false);
  const [payload, setPayload] = useState({
    index: 0,
    options: []
  });
  const [oneData, setOneData] = useState({ options: [] });
  const [form, setForm] = useState({ form: false, edit: false });
  const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && data) {
      setOneData(data.getOneFormOption);
    }
  }, [data]);

  const handleEdit = (index) => {
    setPayload({
      index,
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
    updateDisabled(true);
    dispatch(showLoading());
    try {
      let { data } = await updateOneFormOption({
        variables: {
          id: id,
          options: payload.options,
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      setForm({ edit: false, form: false });
      dispatch(hideLoading());
    } catch (err) {
      // console.log(error);
      updateDisabled(false);
      dispatch(hideLoading());
    }
  };
<<<<<<< HEAD

  const handleChangeFormOption = (value) => {
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
      dispatch(showLoading());
      const tempOptions = oneData.options.filter((o, i) => i !== index);
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: tempOptions.map((i) => ({
            value: i.value,
            label: i.label,
            published: i.published
          })),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (err) {
      updateDisabled(false);
      dispatch(hideLoading());
    }
  };

  const handlePublish = async (index) => {
    try {
      updateDisabled(true);
      dispatch(showLoading());
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: oneData.options.map((o, i) => {
            if (i === index) {
              console.log('Changed Status');
              return {
                value: o.value,
                label: o.label,
                published: !o.published
              };
            } else {
              return {
                value: o.value,
                label: o.label,
                published: o.published
              };
            }
          }),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (er) {
      updateDisabled(false);
      dispatch(hideLoading());
      // alert('Something went wrong!');
    }
  };

  return {
    setForm,
    payload,
    data,
    loading,
    error,
    handleDelete,
    handleChangeFormOption,
    handleSubmit,
    handleAddNew,
    handleEdit,
    form,
    disabled,
    oneData,
    handlePublish
  };
}
=======

  const handleChangeFormOption = (value) => {
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
      dispatch(showLoading());
      const tempOptions = oneData.options.filter((o, i) => i !== index);
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: tempOptions.map((i) => ({
            value: i.value,
            label: i.label,
            published: i.published
          })),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (err) {
      updateDisabled(false);
      dispatch(hideLoading());
    }
  };

  const handlePublish = async (index) => {
    try {
      updateDisabled(true);
      dispatch(showLoading());
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: oneData.options.map((o, i) => {
            if (i === index) {
              console.log('Changed Status');
              return {
                value: o.value,
                label: o.label,
                published: !o.published
              };
            } else {
              return {
                value: o.value,
                label: o.label,
                published: o.published
              };
            }
          }),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (er) {
      updateDisabled(false);
      dispatch(hideLoading());
      // alert('Something went wrong!');
    }
  };

  return {
    setForm,
    payload,
    data,
    loading,
    error,
    handleDelete,
    handleChangeFormOption,
    handleSubmit,
    handleAddNew,
    handleEdit,
    form,
    disabled,
    oneData,
    handlePublish
  };
}


// import { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';

// const GET_ONE = gql`
//   query Query {
//     getOneFee {
//       fee
//     }
//   }
// `;

// const GET_ONE_PROPERTY = gql`
//   query GetOneFormOption($id: ID!) {
//     getOneFormOption(id: $id) {
//       _id
//       title
//       options {
//         label
//         value
//         published
//       }
//       formName
//       published
//     }
//   }
// `;

// export function useAppFee() {
//   const data = useQuery(GET_ONE);
//   return data;
// }

// export function usePropertyType(id) {
//   const data = useQuery(GET_ONE_PROPERTY, { variables: { id: id } });
//   return data;
// }

// // export function useAppFee() {
// //   const data = useQuery(GET_ONE);
// //   return data;
// // }
>>>>>>> 81d9a8c092b128339f396c9d36db8f62347d19f2

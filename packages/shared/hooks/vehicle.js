/* eslint-disable import/prefer-default-export */
import { useQuery, gql, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const GET_USER_VEHICLES = gql`
  query GetUserVehicles($userId: String!) {
    getUserVehicles(userId: $userId) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    createVehicle(
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $id: ID!
    $userId: String!
    $profileType: String!
    $licensePlate: String!
    $type: String!
    $make: String!
    $model: String!
    $year: String!
    $size: String!
    $color: String
    $image: String
  ) {
    updateVehicle(
      id: $id
      userId: $userId
      profileType: $profileType
      licensePlate: $licensePlate
      type: $type
      make: $make
      model: $model
      year: $year
      size: $size
      color: $color
      image: $image
    ) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

export function useCRUDVehicle() {
  const [createVehicle] = useMutation(CREATE_VEHICLE);
  const [updateVehicle] = useMutation(UPDATE_VEHICLE);
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);
  const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  const { data } = useQuery(GET_USER_VEHICLES, {
    variables: { userId }
  });
  const [allData, setAllData] = useState({ vehicles: [] });
  useEffect(() => {
    if (data && data.getUserVehicles) {
      setAllData({ ...allData, vehicles: data.getUserVehicles });
    }
  }, [data]);

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle({
        variables: { id }
      });
      setAllData(allData.filter((v) => v._id !== id));
    } catch (error) {
      //   console.log(error);
    }
  };

  return { allData, handleDeleteVehicle };
}

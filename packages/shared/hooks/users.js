import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ONE = gql`
  query QUERY($username: String!) {
    getOneUserSub(username: $username) {
      _id
      active
      confirmed
      email
      name
      picture
      status
      username
      bookings
      listings
    }
  }
`;

export function useGetOneUser(username) {
  const data = useQuery(GET_ONE, { variables: { username: username } });
  return data;
}

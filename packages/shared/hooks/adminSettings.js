import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

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

export function useAppFee() {
  const data = useQuery(GET_ONE);
  return data;
}

export function usePropertyType(id) {
  const data = useQuery(GET_ONE_PROPERTY, { variables: { id: id } });
  return data;
}

// export function useAppFee() {
//   const data = useQuery(GET_ONE);
//   return data;
// }

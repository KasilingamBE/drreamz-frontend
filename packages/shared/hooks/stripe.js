import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { client } from '../graphql';

const ownerId = '8e2783ed-f09d-48e8-8158-43e7d42c7378';
const amount = 110000;
const fee = 1500;
const driverName = 'Vivek Thakur';

const Create_Payment_Intent = gql`
  query StripeCreatePaymentIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntent(
      driverId: $driverId
      name: $name
      email: $email
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

export function useStripeCreatePaymentIntent() {
  const { driverId, name, email, type } = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          name: auth.data.attributes.name,
          email: auth.data.attributes.email,
          type: user.profileType
        }
      : { driverId: '', name: '', email: '', type: user.profileType }
  );

  const createIntent = async () => {
    const res = await client.query({
      query: Create_Payment_Intent,
      variables: {
        driverId,
        name,
        email,
        type,
        ownerId,
        amount,
        fee
      },
      fetchPolicy: 'network-only'
    });
    return res;
  };

  return { createIntent };
}

const Create_Setup_Intent = gql`
  query StripeCreateSetupIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
  ) {
    stripeCreateSetupIntent(driverId: $driverId, name: $name, email: $email, type: $type)
  }
`;

const stripe_List_User_Cards = gql`
  query StripeListUserCards($driverId: String!, $type: String!) {
    stripeListUserCards(driverId: $driverId, type: $type)
  }
`;

const stripe_Detach_Payment_Method = gql`
  query StripeDetachPaymentMethod($payment_method: String!) {
    stripeDetachPaymentMethod(payment_method: $payment_method)
  }
`;

export function useCardCRUD() {
  const { driverId, name, email, type } = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          name: auth.data.attributes.name,
          email: auth.data.attributes.email,
          type: user.profileType
        }
      : { driverId: '', name: '', email: '', type: user.profileType }
  );
  const { data, loading, refetch } = useQuery(stripe_List_User_Cards, {
    variables: { driverId, type },
    fetchPolicy: 'network-only'
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (data && data.stripeListUserCards && JSON.parse(data.stripeListUserCards) !== null) {
      setCards(JSON.parse(data.stripeListUserCards));
    }
  }, [data]);

  const createSetupIntent = async () => {
    return await client.query({
      query: Create_Setup_Intent,
      variables: {
        driverId,
        name,
        email,
        type
      },
      fetchPolicy: 'network-only'
    });
  };

  const handleDeleteCard = async (id) => {
    await client.query({
      query: stripe_Detach_Payment_Method,
      variables: {
        payment_method: id
      },
      fetchPolicy: 'network-only'
    });
    setCards(cards.filter((c) => c.id !== id));
  };

  return { createSetupIntent, cards, handleDeleteCard, refetchCards: refetch, loading };
}

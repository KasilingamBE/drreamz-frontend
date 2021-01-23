import React from 'react';
import UserLayout from '../../src/app/components/other/UserLayout';
import ListingDetails from '../../src/pages/ListingDetails';

export default function Page(props) {
  return (
    <UserLayout authRequired={true}>
      <ListingDetails />
    </UserLayout>
  );
}

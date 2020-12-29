import React from 'react';
import { Button, Form, Tabs, Tab, Dropdown } from 'react-bootstrap';
import UserProfileCard from './UserProfileCard';
import ParkingList from '../parkings/ParkingList';
import BookingList from '../bookings/BookingList';

export default function UserProfile(props) {
  return (
    <div>
      <h1 className="heading">User Profile</h1>
      <UserProfileCard id={props.id} />
      <Tabs className="mt-3" defaultActiveKey="bookings" id="uncontrolled-tab-example" fill>
        <Tab eventKey="bookings" title="Bookings">
          <BookingList hideTitle={true} username={props.id} />
        </Tab>
        <Tab eventKey="spaces" title="Listings">
          <ParkingList hideTitle={true} username={props.id} />
        </Tab>
        <Tab eventKey="rating" title="Ratings">
          <p>Rating</p>
        </Tab>
      </Tabs>
    </div>
  );
}

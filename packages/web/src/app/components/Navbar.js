import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from '../assets/images/drreamz_logo.png';

const Navbar = ({ isSpaceOwner }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 10,
        position: 'fixed',
        top: 0,
        backgroundColor: '#fff',
        // boxShadow: '0px 0px 10px #999',
        borderBottom: '5px solid #27aae1',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 99999
      }}>
      <div style={{ width: '180px', height: '60px' }}>
        <img src={logo} style={{ width: '100%', height: '100%' }} />
      </div>
      {isSpaceOwner ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="/my-listings"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            My Listings
          </Link>
          <Link
            href="/parking-orders"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            Parking Orders
          </Link>
          <Link
            href="/dashboard"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            Dashboard
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="/my-bookings"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            My Bookings
          </Link>
          <Link
            href="/find-parking"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            Find Parking
          </Link>
          <Link
            href="/dashboard"
            style={{ fontSize: '18px', margin: '0px 10px', color: '#0b4094' }}>
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  isSpaceOwner: user.isSpaceOwner
});

export default connect(mapStateToProps)(Navbar);

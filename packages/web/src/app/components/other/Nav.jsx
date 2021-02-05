import React from 'react';
import { connect } from 'react-redux';
import { IoIosArrowDown, IoIosMenu } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { unsetAuthUser } from '../../redux/actions/auth';
import { toggleUserType, toggleLoading } from '../../redux/actions/user';
import logo from '../../assets/images/drreamz_logo.png';

const NavC = (props) => {
  const handleLogout = () => {
    Auth.signOut().then(() => {
      props.dispatch(unsetAuthUser());
    });
  };
  return (
    <Navbar expand="lg">
      <Navbar.Brand>
        <Link href="/dashboard">
          <img src={logo} alt="parkyourself" className="img-fluid" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" disabled></Nav.Link>
        </Nav>
        <Nav>
          {props.auth.authenticated ? (
            <>
              {props.admin && (
                <Nav.Item>
                  <Link href="/admin/settings/listing-type">
                    <div className="mainmenu">
                      <li className="header-menu-btn drop">
                        <div className="menu-btn">
                          <small>Admin</small>
                        </div>
                        {/* <ul className="dropdown">
                        <Link href="/admin/form-options">
                          <li className="d-block nav-li">
                            <small>Manage Form-Options</small>
                          </li>
                        </Link>
                      </ul> */}
                      </li>
                    </div>
                  </Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <div className="mainmenu">
                  <li className="header-menu-btn drop">
                    <div className="menu-btn">
                      <IoIosMenu className="mr-2" />
                      <FaUserCircle />
                    </div>

                    <ul className="dropdown">
                      {props.isSpaceOwner ? (
                        <>
                          <Link href="/listings/add">
                            <li className="d-block nav-li">
                              <small>Add Listings</small>
                            </li>
                          </Link>
                          <Link href="/listings/my">
                            <li className="d-block nav-li">
                              <small>My Listings</small>
                            </li>
                          </Link>
                          <Link href="/check-in">
                            <li className="d-block nav-li">
                              <small>Checkin / Checkout</small>
                            </li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href="/parkings">
                            <li className="d-block nav-li">
                              <small>Find Parkings</small>
                            </li>
                          </Link>
                          <Link href="/bookings/my">
                            <li className="d-block nav-li">
                              <small>My Bookings</small>
                            </li>
                          </Link>
                        </>
                      )}
                      <Link href="/dashboard">
                        <li className="d-block nav-li">
                          <small>Dashboard</small>
                        </li>
                      </Link>
                      <li
                        className="d-block nav-li"
                        onClick={() => {
                          localStorage.setItem('isSpaceOwner', !props.isSpaceOwner);
                          props.dispatch(toggleUserType());
                        }}>
                        <small>Switch to {props.isSpaceOwner ? 'Driver' : 'SpaceOwner'}</small>
                      </li>
                      <li className="d-block nav-li" onClick={() => handleLogout()}>
                        <small>Logout</small>
                      </li>
                    </ul>
                  </li>
                </div>
              </Nav.Item>
            </>
          ) : (
            props.initial && (
              <Nav.Item>
                <Link href="/login">
                  <Button variant="outline-dark">Login</Button>
                </Link>
              </Nav.Item>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    isSpaceOwner: user.isSpaceOwner,
    // userId: auth.data.attributes.sub,
    admin: auth.authenticated ? auth.data.admin : false,
    initial: auth.initial
  };
};

export default connect(mapStateToProps)(NavC);

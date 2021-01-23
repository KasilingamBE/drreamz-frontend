import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Button, Nav, ListGroup, Table } from 'react-bootstrap';
import { IoIosArrowUp, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { connect } from 'react-redux';
import { toggleLoading, toggleProfileType } from '../app/redux/actions/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
} from '../app/redux/actions/spaceOwnerProfile';
import { gql, useMutation } from '@apollo/client';
import { client } from '../app/graphql';
import SpaceOwnerProfileModal from '../app/components/SpaceOwnerProfileModal';
import Link from 'next/link';

const GET_USER_SPACEOWNER_PROFILE = gql`
  query GetUserSpaceOwnerProfile($userId: String!) {
    getUserSpaceOwnerProfile(userId: $userId) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const CREATE_SPACEOWNER_PROFILE = gql`
  mutation CreateSpaceOwnerProfile(
    $userId: String!
    $address: String!
    $businessName: String!
    $facebook: String!
    $twitter: String!
    $instagram: String!
  ) {
    createSpaceOwnerProfile(
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const UPDATE_SPACEOWNER_PROFILE = gql`
  mutation UpdateSpaceOwnerProfile(
    $id: ID!
    $userId: String
    $address: String
    $businessName: String
    $facebook: String
    $twitter: String
    $instagram: String
  ) {
    updateSpaceOwnerProfile(
      id: $id
      userId: $userId
      address: $address
      businessName: $businessName
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
    ) {
      _id
      userId
      address
      businessName
      facebook
      twitter
      instagram
    }
  }
`;

const DELETE_SPACEOWNER_PROFILE = gql`
  mutation DeleteSpaceOwnerProfile($id: ID!) {
    deleteSpaceOwnerProfile(id: $id)
  }
`;

const SpaceOwnerDashboard = ({
  spaceOwnerProfile,
  userData,
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
}) => {
  const [createSpaceOwnerProfile] = useMutation(CREATE_SPACEOWNER_PROFILE);
  const [updateSpaceOwnerProfile] = useMutation(UPDATE_SPACEOWNER_PROFILE);
  const [deleteSpaceOwnerProfile] = useMutation(DELETE_SPACEOWNER_PROFILE);

  const { name, email, sub } = userData;
  const [activeKey, setActiveKey] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  // const [profileType,setProfileType] = useState('personal');

  const [showSpaceOwnerProfileModal, setShowSpaceOwnerProfileModal] = useState(false);
  const [spaceOwnerProfileEdit, setSpaceOwnerProfileEdit] = useState(false);

  useEffect(() => {
    const getSpaceOwnerProfileData = () => {
      toggleLoading();
      client
        .query({
          query: GET_USER_SPACEOWNER_PROFILE,
          variables: { userId: sub }
        })
        .then(({ data }) => {
          console.log(data.getUserSpaceOwnerProfile);
          loadUserSpaceOwnerProfile(data.getUserSpaceOwnerProfile);
        })
        .catch((err) => {
          console.log(err);
          toggleLoading();
        });
    };
    getSpaceOwnerProfileData();
  }, []);

  const createSpaceOwnerProfileHandler = async (data) => {
    try {
      const response = await createSpaceOwnerProfile({
        variables: data
      });
      createSpaceOwnerProfileLocal(response.data.createSpaceOwnerProfile);

      console.log(response.data.createSpaceOwnerProfile);
      toast.success('Space Owner Profile Created Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      console.log(error);
    }
  };

  const updateSpaceOwnerProfileHandler = async (data) => {
    try {
      const response = await updateSpaceOwnerProfile({
        variables: data
      });
      updateSpaceOwnerProfileLocal(response.data.updateSpaceOwnerProfile);
      setSpaceOwnerProfileEdit(false);
      console.log(response.data.updateSpaceOwnerProfile);
      toast.success('Space Owner Profile Updated Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      console.log(error);
    }
  };

  const deleteSpaceOwnerProfileHandler = async (id) => {
    try {
      const response = await deleteSpaceOwnerProfile({
        variables: { id: id }
      });
      deleteSpaceOwnerProfileLocal(id);
      console.log(response.data.deleteSpaceOwnerProfile);
      toast.success('Space Owner Profile Deleted Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      console.log(error);
    }
  };

  const spaceOwnerProfileEditButtonHandler = async () => {
    console.log('in edit handler');
    setSpaceOwnerProfileEdit(true);
    setShowSpaceOwnerProfileModal(true);
  };

  return (
    <div className="dg__account">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <h1 className="heading">Dashboard</h1>
      <Accordion defaultActiveKey={activeKey} className="profile-accordian">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="business"
            onClick={() => {
              setShowProfileForm(!showProfileForm);
            }}>
            <div className="setup-profile">
              <div>
                <p className="lead">Space Owner Profile</p>
                <p>{email}</p>
              </div>
              {showProfileForm ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="business">
            <Card.Body>
              {spaceOwnerProfile.data ? (
                <>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{name}</td>
                      </tr>
                      {/* <tr>
              <td>Last Name</td>
              <td>{businessProfile.data.businessName}</td>
            </tr> */}
                      <tr>
                        <td>Email</td>
                        <td>{email}</td>
                      </tr>
                      {/* <tr>
              <td>Mobile Number</td>
              <td>{businessProfile.data.businessMobileCode}-{businessProfile.data.businessMobile} </td>   
            </tr>     */}
                      <tr>
                        <td>Address</td>
                        <td>{spaceOwnerProfile.data.address}</td>
                      </tr>
                      <tr>
                        <td>BusinessName</td>
                        <td>
                          {spaceOwnerProfile.data.businessName
                            ? spaceOwnerProfile.data.businessName
                            : 'No business name added'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <br />
                  <p className="lead">Social Accounts</p>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Facebook</td>
                        <td>
                          {spaceOwnerProfile.data.facebook
                            ? spaceOwnerProfile.data.facebook
                            : 'No Facebook account added'}
                        </td>
                      </tr>
                      <tr>
                        <td>Twitter</td>
                        <td>
                          {spaceOwnerProfile.data.twitter
                            ? spaceOwnerProfile.data.twitter
                            : 'No Twitter account added'}
                        </td>
                      </tr>
                      <tr>
                        <td>Instagram</td>
                        <td>
                          {spaceOwnerProfile.data.instagram
                            ? spaceOwnerProfile.data.instagram
                            : 'No Instagram account added'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      spaceOwnerProfileEditButtonHandler();
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      deleteSpaceOwnerProfileHandler(spaceOwnerProfile.data._id);
                    }}>
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    setSpaceOwnerProfileEdit(false);
                    setShowSpaceOwnerProfileModal(true);
                  }}>
                  Create Space Owner Profile
                </Button>
              )}
              <SpaceOwnerProfileModal
                show={showSpaceOwnerProfileModal}
                handleClose={() => {
                  setShowSpaceOwnerProfileModal(false);
                }}
                handleSave={createSpaceOwnerProfileHandler}
                handleUpdate={updateSpaceOwnerProfileHandler}
                edit={spaceOwnerProfileEdit}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
      <h4>More Information</h4>
      <div className="more-info-btns">
        <Link href="/listings/my">
          <Card>
            <Card.Body>
              <div>My Listings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Card>
          <Card.Body>
            <div>Parking Orders Recieved</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Link href="/listings/add">
          <Card>
            <Card.Body>
              <div>Add a Listing</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/check-in">
          <Card>
            <Card.Body>
              <div>Checkin / Checkout</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/messages">
          <Card>
            <Card.Body>
              <div>Messages</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/withdrawal-settings">
          <Card>
            <Card.Body>
              <div>Withdrawal Settings</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Link href="/reports">
          <Card>
            <Card.Body>
              <div>Payout & Deposit Reports</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
        <Card>
          <Card.Body>
            <div>Set Staff Credentials</div>
            <IoIosArrowForward />
          </Card.Body>
        </Card>
        <Link href="/faq">
          <Card>
            <Card.Body>
              <div>FAQs</div>
              <IoIosArrowForward />
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, auth, spaceOwnerProfile }) => ({
  profileType: user.profileType,
  userData: auth.data.attributes,
  spaceOwnerProfile
});

export default connect(mapStateToProps, {
  toggleProfileType,
  createSpaceOwnerProfileLocal,
  loadUserSpaceOwnerProfile,
  updateSpaceOwnerProfileLocal,
  deleteSpaceOwnerProfileLocal
})(SpaceOwnerDashboard);

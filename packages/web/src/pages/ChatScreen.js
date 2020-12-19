import React, { useState, useEffect } from "react";
import { client } from "../app/graphql";
import { gql } from "@apollo/client";
import MessagesList from "../app/components/message/MessagesList";
import SendMessage from "../app/components/message/SendMessage";
import ChatBox from "../app/components/message/ChatBox";
import AccessDenied from "../app/components/AccessDenied";
import { connect } from "react-redux";

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      locationDetails {
        address
      }
      reviews
    }
  }
`;

const ChatScreen = ({
  match,
  id,
  userId,
  driverName,
  userData,
  location,
  isSpaceOwner,
}) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: id },
      })
      .then(({ data }) => {
        console.log(data.getListing);
        setListing(data.getListing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if(!match.params.userId && isSpaceOwner){
  //     return <AccessDenied/>
  // }

  // if (userId && !isSpaceOwner) {
  //   return <AccessDenied />;
  // }

  if (isSpaceOwner && (listing ? userData.sub !== listing.ownerId : true)) {
    return <AccessDenied />;
  }

  return !listing ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="dg__account">
      {isSpaceOwner ? <>
        <h1 className="heading">{driverName ? driverName : ""}</h1>
        <p className="listing-name">{listing.locationDetails.address}</p>
      </> : (
        <>
          {" "}
          <h1 className="heading">{listing.ownerName}</h1>
          <p className="listing-name">{listing.locationDetails.address}</p>
        </>
      )}
      <ChatBox
        ownerId={listing.ownerId}
        ownerName={listing.ownerName}
        listingId={listing._id}
        listingAddress={listing.locationDetails.address}
        driverId={userId}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => ({
  userData: auth.data.attributes,
  isSpaceOwner: user.isSpaceOwner,
});

export default connect(mapStateToProps)(ChatScreen);

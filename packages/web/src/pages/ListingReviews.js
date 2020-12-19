import React, { useState, useEffect } from "react";
import AccessDenied from "../app/components/AccessDenied";
import ReviewItem from "../app/components/ReviewItem";
import { gql, useQuery } from "@apollo/client";
import { client } from "../app/graphql";

const GET_LISTING_REVIEWS = gql`
  query GetListingReviews($listingId: String!) {
    getListingReviews(listingId: $listingId) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      reviews
      locationDetails {
        address
      }
    }
  }
`;

const ListingReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const getReviews = async () => {
    client
      .query({ query: GET_LISTING_REVIEWS, variables: { listingId: id } })
      .then(({ data }) => {
        setReviews(data.getListingReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    client
      .query({ query: GET_LISTING, variables: { id: id } })
      .then(({ data }) => {
        if (data.getListing) {
          setListing(data.getListing);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    getReviews();
  }, []);

  if (!id) {
    return <AccessDenied />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  //   if ((error || data.getListingReviews == null)) {
  //     return <div className="loading">No Reviews Found!</div>;
  //   }

  return (
    <div className="dg__account">
      <h1 className="heading">Reviews</h1>
      {listing && <p className="lead">{listing.locationDetails.address}</p>}
      {reviews.length > 0 ? (
        reviews.map((item) => <ReviewItem {...item} />)
      ) : (
        <div className="loading">No Reviews Found!</div>
      )}
    </div>
  );
};

export default ListingReviews;

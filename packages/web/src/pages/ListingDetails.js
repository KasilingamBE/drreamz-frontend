import React from "react";
import SpaceOwnerContainer from "../app/components/SpaceOwnerContainer";
import MoreDetails from "./MoreDetails";
import { useRouter } from "next/router";

const ListingDetails = ({ match }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <SpaceOwnerContainer>{id && <MoreDetails id={id} />}</SpaceOwnerContainer>
  );
};

export default ListingDetails;

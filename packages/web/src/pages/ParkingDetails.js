import React from "react";
import DriverContainer from "../app/components/DriverContainer";
import MoreDetails from "./MoreDetails";
import { useRouter } from "next/router";

const ParkingDetails = ({ match }) => {
  const router = useRouter();
  const { id } = router.query;
  return <DriverContainer>{id && <MoreDetails id={id} />}</DriverContainer>;
};

export default ParkingDetails;

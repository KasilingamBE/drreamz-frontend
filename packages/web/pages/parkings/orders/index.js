import UserLayout from "../../../src/app/components/other/UserLayout";
import ParkingOrders from "../../../src/pages/ParkingOrders";

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <ParkingOrders />
    </UserLayout>
  );
}

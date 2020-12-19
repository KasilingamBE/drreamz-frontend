import UserLayout from "../../src/app/components/other/UserLayout";
import MyBookings from "../../src/pages/MyBookings";

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <MyBookings />
    </UserLayout>
  );
}

import UserLayout from "../../src/app/components/other/UserLayout";
import MyListingsContainer from "../../src/app/components/MyListingsContainer";

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <MyListingsContainer />
    </UserLayout>
  );
}

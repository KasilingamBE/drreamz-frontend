import { useRouter } from "next/router";
import UserLayout from "../../../src/app/components/other/UserLayout";
import dynamic from "next/dynamic";
const ListingParkingOrders = dynamic(
  () => import("../../../src/pages/ListingParkingOrders"),
  {
    ssr: false,
  }
);

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>
      {id && <ListingParkingOrders id={id} />}
    </UserLayout>
  );
}

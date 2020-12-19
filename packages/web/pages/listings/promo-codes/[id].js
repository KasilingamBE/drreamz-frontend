import { useRouter } from "next/router";
import UserLayout from "../../../src/app/components/other/UserLayout";
import PromoCodes from "../../../src/pages/PromoCodes";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>{id && <PromoCodes id={id} />}</UserLayout>
  );
}

import { useRouter } from "next/router";
import UserLayout from "../../src/app/components/other/UserLayout";
import BookNow from "../../src/pages/BookNow";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>{id && <BookNow id={id} />}</UserLayout>
  );
}

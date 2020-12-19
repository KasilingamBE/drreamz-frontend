import { useRouter } from "next/router";
import ChatScreen from "../src/pages/ChatScreen";
import UserLayout from "../src/app/components/other/UserLayout";

export default function Page() {
  const router = useRouter();
  const { id, userId, driverName } = router.query;
  return (
    <UserLayout authRequired={true}>
      {id && userId ? (
        <ChatScreen id={id} userId={userId} driverName={driverName} />
      ) : null}
    </UserLayout>
  );
}

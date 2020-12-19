import Dashboard from "../src/pages/Dashboard";
import UserLayout from "../src/app/components/other/UserLayout";

export default function DashboardPage() {
  return (
    <UserLayout authRequired={true}>
      <Dashboard />
    </UserLayout>
  );
}

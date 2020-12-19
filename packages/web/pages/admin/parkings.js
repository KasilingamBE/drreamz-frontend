import React from "react";
import AdminLayout from "../../src/app/components/other/AdminLayout";
import ParkingList from "../../src/app/components/admin/parkings/ParkingList";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <ParkingList />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;

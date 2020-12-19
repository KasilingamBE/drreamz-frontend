import React from "react";
import AdminLayout from "../../src/app/components/other/AdminLayout";
import BookingList from "../../src/app/components/admin/bookings/BookingList";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <BookingList />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;

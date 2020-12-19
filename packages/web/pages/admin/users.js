import React from "react";
import AdminLayout from "../../src/app/components/other/AdminLayout";
import UsersList from "../../src/app/components/admin/users/UsersList";

const AdminPage = (props) => {
  return (
    <div>
      <AdminLayout>
        <UsersList />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;

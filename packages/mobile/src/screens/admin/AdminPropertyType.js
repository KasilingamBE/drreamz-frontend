import React from 'react';
import AdminSettingOptions from '../../components/admin/AdminSettingOptions';

export default function AdminPropertyType() {
  return <AdminSettingOptions id="5fcd2fb3ad371d00086e767d" />;
}


// import React from 'react';
// import { connect } from 'react-redux';
// import AdminSettingOptions from '../../components/admin/AdminSettingOptions';

// function AdminPropertyType({ userId }) {
//   return <AdminSettingOptions userId={userId} id="5fcd2fb3ad371d00086e767d" />;
// }

// const mapStateToProps = ({ auth }) => {
//   return {
//     userId: auth.authenticated ? auth.data.attributes.sub : null
//   };
// };

// export default connect(mapStateToProps)(AdminPropertyType);

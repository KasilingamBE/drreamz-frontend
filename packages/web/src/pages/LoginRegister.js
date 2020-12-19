import React, { Fragment } from "react";
import { connect } from "react-redux";
// import LayoutTwo from "../layouts/LayoutTwo";
import { Tab, Nav } from "react-bootstrap";
// import Breadcrumb from "../components/breadcrumbs/Breadcrumb";
import Signup from "../app/components/auth/Signup";
import Login from "../app/components/auth/Login";
// import logo from "../assets1/images/logo.JPG";

// const LoginRegister = (props) => {
//   if (props.auth.authenticated) {
//     if (!props.user.isSpaceOwner) {
//       return <Redirect href="/find-parking" />;
//     } else {
//       return <Redirect href="/my-listings" />;
//     }
//   }
//   return (
//     <Fragment>
//       <MetaTags>
//         {/* <title>ParkYourSelf | Login</title> */}
//         <meta name="description" content="Login page of ParkYourSelf." />
//       </MetaTags>
//       {/* <LayoutTwo theme='white'> */}
//       {/* breadcrumb */}
//       {/* <Breadcrumb title="LOGIN - REGISTER" /> */}
//       {/* login register content */}
//       <div className="dg__account section-padding--xl">
//         {/* <div
//           style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//         >
//           <img src={logo} style={{ width: '300px', height: '200px' }} />
//         </div> */}
//         <div>

//         </div>
//       </div>
//       {/* </LayoutTwo> */}
//     </Fragment>
//   );
// };

const LoginRegister = (props) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <Tab.Container defaultActiveKey="login">
          <Nav variant="pills" className="acount__nav justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="login" className="text-light">
                Sign In
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" className="text-light">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Signup />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user,
  };
};

export default connect(mapStateToProps)(LoginRegister);

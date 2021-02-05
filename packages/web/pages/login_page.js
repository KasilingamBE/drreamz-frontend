import Head from 'next/head';
import { connect } from 'react-redux';
import LoginRegister from '../src/app/components/auth/LoginRegister';
import InitialLoading from '../src/app/components/other/InitialLoading';
import { useRouter } from 'next/router';
import Nav from '../src/app/components/other/Nav';
import HomePage from "../src/app/components/home/HomePage";
import UserLayout from "../src/app/components/other/UserLayout";



function Home(props) {
  const router = useRouter();

  if (props.initial && props.authenticated) {
    router.push('/dashboard');
    if (props.isSpaceOwner) {
      router.push("/dashboard");
    } else {
      router.push("/parkings");
    }
  }
  if (props.initial && !props.authenticated) {
    // return (
    //   <UserLayout pageTitle="Dreamjobpal | Linkedin">
         
    //       <div className="container pt-3 pb-3">
    //           <HomePage/>
    //       </div>
    //       {/* <div className="container pt-3 pb-3">
    //         <LoginRegister />
    //       </div> */}
          

    //   </UserLayout>);
    return (
      <div>
        <Nav />
        <Head>
          <title>Drreamz</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container pt-3 pb-3">
          <LoginRegister />
        </div>
      </div>
    );
  }
  return (
    <div>
      <InitialLoading />
    </div>
  );
}

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
    isSpaceOwner: user.isSpaceOwner
  };
};

export default connect(mapStateToProps)(Home);

import Head from 'next/head';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import LoginRegister from '../src/app/components/auth/LoginRegister';
import InitialLoading from '../src/app/components/other/InitialLoading';
import Nav from '../src/app/components/other/Nav';

function Home(props) {
  const router = useRouter();

  if (props.initial && props.authenticated) {
    router.push('/dashboard');
    if (props.isSpaceOwner) {
      router.push('/dashboard');
    } else {
      router.push('/parkings');
    }
  }
  if (props.initial && !props.authenticated) {
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

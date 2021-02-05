import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import InitialLoading from '../src/app/components/other/InitialLoading';
import Page from '../src/app/components/home/Page';

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
    return <Page />;
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

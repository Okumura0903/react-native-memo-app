import { Redirect } from 'expo-router';

const index = (): React.JSX.Element => {
  return <Redirect href="auth/sign_up" />;
};

export default index;

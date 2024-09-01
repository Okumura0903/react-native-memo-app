import { Redirect } from 'expo-router';

const index = (): React.JSX.Element => {
  return <Redirect href="auth/login" />;
};

export default index;

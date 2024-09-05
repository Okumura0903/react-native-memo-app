import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';

const index = (): React.JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace('/memo/list');
      }
    });
  }, []);
  return <Redirect href="auth/login" />;
};

export default index;

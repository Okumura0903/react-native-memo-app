import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { auth } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../../components/Button';

const handlePress = (email: string, password: string): void => {
  //ログイン
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential.user.uid);
      router.replace('/memo/list');
    })
    .catch((error) => {
      console.log(error);
      Alert.alert(error.message);
    });
};

const login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        <Button onPress={() => handlePress(email, password)} label="Submit" />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not Registered?</Text>
          <Link href="/auth/sign_up" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000',
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
});

export default login;

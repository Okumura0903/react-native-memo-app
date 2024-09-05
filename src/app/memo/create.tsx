import { View, StyleSheet, TextInput } from 'react-native';
import KeyboardAvoidingView from '../../components/keyboardAvoidingView';
import { router } from 'expo-router';
import { useState } from 'react';
import { auth } from '../../config';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config';

const handlePress = async (bodyText: string): Promise<void> => {
  try {
    if (auth.currentUser === null) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const docRef = await addDoc(ref, {
      bodyText: bodyText,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log('success', docRef.id);
    router.back();
  } catch (e) {
    console.log(e);
  }
};

const create = (): React.JSX.Element => {
  const [bodyText, setBodyText] = useState('');
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => setBodyText(text)}
          multiline
          autoFocus
        />
      </View>
      <CircleButton onPress={() => handlePress(bodyText)}>
        <Icon name="check" size={40} color="#fff" />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default create;

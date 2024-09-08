import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { db, auth } from '../../config';
import { getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import KeyboardAvoidingView from '../../components/keyboardAvoidingView';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { useEffect, useState } from 'react';
import { type Memo } from '../../../types/memo';

const handlePress = async (id: string, memo: string | null): Promise<void> => {
  if (auth.currentUser === null) {
    return;
  }
  try {
    const docRef = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    await updateDoc(docRef, {
      bodyText: memo,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    router.back();
  } catch (error) {
    console.log(error);
    Alert.alert('更新に失敗しました');
  }
};

const edit = (): React.JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [memo, setMemo] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const docRef = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    const fetchMemo = async () => {
      const docSnap = await getDoc(docRef);
      const { bodyText } = docSnap.data() as Memo;
      setMemo(bodyText);
    };
    try {
      fetchMemo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={memo ?? ''}
          onChangeText={(text) => setMemo(text)}
          multiline
          autoFocus
        />
      </View>
      <CircleButton onPress={() => handlePress(id, memo)}>
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default edit;

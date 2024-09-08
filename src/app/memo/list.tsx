import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { router, useNavigation } from 'expo-router';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import LogOutButton from '../../components/LogOutButton';
import Icon from '../../components/Icon';
import { db, auth } from '../../config';
import { type Memo } from '../../../types/memo';

const handlePress = (): void => {
  router.push('memo/create');
};

const list = (): React.JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);
  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // const remoteMemos: Memo[] = [...memos];
      // snapshot.docChanges().forEach((change) => {
      //   if (change.type === 'added') {
      //     const { bodyText, updatedAt } = change.doc.data();
      //     remoteMemos.push({
      //       id: change.doc.id,
      //       bodyText,
      //       updatedAt,
      //     });
      //     console.log('add', remoteMemos);
      //   }
      //   if (change.type === 'modified') {
      //     console.log('Modified city: ', change.doc.data());
      //   }
      //   if (change.type === 'removed') {
      //     const removedId = change.doc.id;
      //     // remoteMemos.filter((memo) => {
      //     //   return memo.id === removedId;
      //     // });
      //     remoteMemos.forEach((memo, index) => {
      //       if (memo.id === removedId) {
      //         remoteMemos.splice(index, 1);
      //       }
      //     });
      //     console.log('Removed city: ', change.doc.data(), remoteMemos);
      //   }
      // });
      // setMemos([...remoteMemos]);
      //      console.log(memos);

      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });
    return unsubscribe;
  }, []);
  // console.log(memos);

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      {/* {memos.map((memo) => (
        <MemoListItem memo={memo} />
      ))} */}
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={40} color="#fff" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default list;

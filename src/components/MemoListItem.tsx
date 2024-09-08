import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import Icon from './Icon';
import { type Memo } from '../../types/memo';
import { db, auth } from '../config';
import { deleteDoc, doc } from 'firebase/firestore';
interface Props {
  memo: Memo;
}

const handlePress = async (id: string): Promise<void> => {
  if (auth.currentUser === null) {
    return;
  }
  const docRef = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert('メモを削除します', 'よろしいですか？', [
    {
      text: 'キャンセル',
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: async () => {
        try {
          await deleteDoc(docRef);
          Alert.alert('メモを削除しました');
        } catch (error) {
          console.log(error);
          Alert.alert('メモの削除に失敗しました');
        }
      },
    },
  ]);
};

const MemoListItem = ({ memo }: Props): React.JSX.Element | null => {
  const { bodyText, updatedAt } = memo;
  if (bodyText === null || updatedAt === null) {
    return null;
  }
  const dataString = updatedAt.toDate().toLocaleString('ja-JP');
  return (
    <Link href={{ pathname: '/memo/detail', params: { id: memo.id } }} asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dataString}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handlePress(memo.id)}>
            <Icon name="delete" size={32} color="#b0b0b0" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
});

export default MemoListItem;

import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import LogOutButton from '../../components/LogOutButton';
import Icon from '../../components/Icon';

const handlePress = (): void => {
  router.push('memo/create');
};

const list = (): React.JSX.Element => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <MemoListItem />
        <MemoListItem />
        <MemoListItem />
        <MemoListItem />
      </View>
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

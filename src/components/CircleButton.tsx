import {
  Text,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

interface Props {
  children: React.JSX.Element;
  style?: ViewStyle;
  onPress?: () => void;
}

const CircleButton = ({
  children,
  style,
  onPress,
}: Props): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circleButton, style]}>
      <Text style={styles.circleButtonLabel}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#467FD3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  circleButtonLabel: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 48,
  },
});
export default CircleButton;

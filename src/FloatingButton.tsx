import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface FloatingButtonProps {
  onPress: (index: number) => void;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FloatingButton = ({ onPress, setSheetOpen }: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(0);
        setSheetOpen(true);
      }}
      activeOpacity={0.6}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: 20,
    right: 20,
    backgroundColor: '#3c87dd',
    padding: 10,
    borderRadius: 30,
  },
  plus: {
    fontSize: 30,
    color: '#fff',
  },
});

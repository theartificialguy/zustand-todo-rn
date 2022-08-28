import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import FloatingButton from './FloatingButton';
import { TextInput } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Sheet from './Sheet';
import { Todo, TodoState, useTodoStore } from './store';
import TodoItem from './TodoItem';

Ionicon.loadFont()
  .then()
  .catch(err => console.log(err));

const Main = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const [input, setInput] = useState('');
  const { todos, addTodo } = useTodoStore((state: TodoState) => state);

  const handlePress = useCallback(
    (index: number) => {
      sheetRef.current?.snapToIndex(index);
    },
    [sheetRef],
  );

  const addToDo = () => {
    const data: Todo = {
      id: Math.random().toString(16).slice(2),
      text: input,
      completed: false,
      createdAt: new Date().toString(),
    };
    addTodo(data);
    setInput('');
    sheetRef.current?.close();
    setSheetOpen(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        isSheetOpen ? { backgroundColor: 'gray' } : { backgroundColor: '#fff' },
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={isSheetOpen ? 'gray' : '#fff'}
      />
      <View
        style={[
          styles.container,
          isSheetOpen
            ? { backgroundColor: 'gray' }
            : { backgroundColor: '#fff' },
        ]}>
        <Text style={styles.heading}>ToDos</Text>

        <FlatList
          data={todos}
          keyExtractor={(item: Todo) => item.id}
          renderItem={({ item, index }) => <TodoItem todo={item} key={index} />}
        />

        <Sheet sheetRef={sheetRef} onClose={setSheetOpen} setInput={setInput}>
          <View style={styles.sheetContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.sheetHeading}>Add a ToDo</Text>
              {input.length > 0 && (
                <TouchableOpacity
                  style={styles.checkContainer}
                  activeOpacity={0.6}
                  onPress={addToDo}>
                  <Ionicon name="checkmark" size={20} color={'white'} />
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              label="To Do..."
              mode="outlined"
              outlineColor="gray"
              activeOutlineColor="gray"
              value={input}
              onChangeText={setInput}
            />
          </View>
        </Sheet>
        <FloatingButton onPress={handlePress} setSheetOpen={setSheetOpen} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headingContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  checkContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    margin: 10,
  },
  sheetHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  modalBg: {
    flex: 1,
    zIndex: -1,
  },
});

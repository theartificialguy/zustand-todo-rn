import React, { useEffect, memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, {
  Layout,
  FadeOutLeft,
  FadeInRight,
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
} from 'react-native-reanimated';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Todo, TodoState, useTodoStore } from './store';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { removeTodo, toggleTodo } = useTodoStore((state: TodoState) => state);

  const opacity = useSharedValue(1);
  const offset = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(todo.completed ? 0.5 : 1, {
      duration: 500,
      easing: Easing.linear,
    });
    offset.value = withSequence(
      withSpring(-0.05),
      withSpring(0.05),
      withSpring(0),
    );
  }, [todo.completed]);

  const textReanimatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [{ translateX: withSpring(offset.value * 100) }],
    }),
    [],
  );

  const removeTodoHandler = () => {
    removeTodo(todo.id);
  };

  const toggleTodoHandler = () => {
    toggleTodo(todo.id);
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={Layout.delay(300)}>
      <TouchableOpacity
        style={styles.leftContainer}
        activeOpacity={0.6}
        onPress={toggleTodoHandler}>
        {todo.completed ? (
          <Ionicon name="checkmark" size={24} color={'black'} />
        ) : null}
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View style={styles.upperContainer}>
          <Animated.Text
            numberOfLines={2}
            style={[
              styles.text,
              todo.completed ? { textDecorationLine: 'line-through' } : null,
              textReanimatedStyle,
            ]}>
            {todo.text}
          </Animated.Text>
          <TouchableOpacity activeOpacity={0.6}>
            <MaterialIcon name="edit" size={22} color={'gray'} />
          </TouchableOpacity>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.time}>{moment(new Date(todo.createdAt)).fromNow()}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={removeTodoHandler}>
            <Ionicon name="trash" size={22} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(TodoItem);

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  leftContainer: {
    height: 24,
    width: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerContainer: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
});

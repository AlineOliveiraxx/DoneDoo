import React from 'react';
import { Checkbox, List } from 'react-native-paper';
import { Task } from '../app/(tabs)/types';

interface Props {
  task: Task;
  onPress: () => void;
}

const Task_Item: React.FC<Props> = ({ task, onPress }) => {
  return (
    <List.Item
      title={task.title}
      description={task.description}
      left={() => <Checkbox status={task.completed ? 'checked' : 'unchecked'} />}
      onPress={onPress}
    />
  );
};

export default Task_Item;

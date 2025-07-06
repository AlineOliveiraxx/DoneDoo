import React from 'react';
import { Text, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { Task } from '../Utils/types';

interface Props {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
}

const Task_Item: React.FC<Props> = ({ task, onPress, onDelete }) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      default:
        return 'green';
    }
  };

  return (
    <List.Item
      title={task.title}
      description={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
      titleStyle={{ color: '#F1E3E4', fontWeight: 'bold' }}
      descriptionStyle={{ color: '#CCBCBC' }}
      style={{
        backgroundColor: '#BB9BB0',
        borderRadius: 12,
        marginVertical: 6,
        paddingRight: 10,
        elevation: 2,
      }}
      onPress={onPress}
      left={() => (
        <List.Icon
          icon={task.status === 'completed' ? 'check-circle-outline' : 'progress-clock'}
          color={task.status === 'completed' ? '#F1E3E4' : '#1C1D21'}
        />
      )}
      right={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: getPriorityColor(),
              fontWeight: 'bold',
              marginRight: 8,
            }}
          >
            {task.priority.toUpperCase()}
          </Text>
          <IconButton icon="delete" onPress={onDelete} iconColor="#1C1D21" />
        </View>
      )}
    />
  );
};

export default Task_Item;
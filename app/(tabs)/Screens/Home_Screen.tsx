import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import TaskItem from '../../../components/Task_Item';
import { getTasks } from '../Utils/Storage';
import { Task } from '../types';

type NavigationProp = StackNavigationProp<any, any>;

export default function Home_Screen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    setTasks(storedTasks);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('Task_Form', { task: item })}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        onPress={() => navigation.navigate('Task_Form')}
      />
    </View>
  );
}

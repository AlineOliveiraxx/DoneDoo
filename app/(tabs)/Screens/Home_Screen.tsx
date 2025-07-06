import Task_Item from '@/components/Task_Item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, SegmentedButtons } from 'react-native-paper';
import { deleteTask, getTasks } from '../../../Utils/Storage';
import { Task } from '../../../Utils/types';

export default function Home_Screen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    const sorted = storedTasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
    setTasks(sorted);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <View style={{ flex: 1, backgroundColor: '#1C1D21', paddingHorizontal: 12 }}>
      <SegmentedButtons
        value={filter}
        onValueChange={(v) => setFilter(v as any)}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
        ]}
        style={{ marginTop: 10 }}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task_Item
            task={item}
            onPress={() => navigation.navigate('Task_Form', { task: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#A288A6' }}
        onPress={() => navigation.navigate('Task_Form')}
        color="#F1E3E4"
      />
    </View>
  );
}
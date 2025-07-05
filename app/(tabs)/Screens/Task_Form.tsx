import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Task } from '../types';
import { saveTask } from '../Utils/Storage';

type Params = {
  task?: Task;
};

export default function Task_Form() {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const navigation = useNavigation();
  const task = route.params?.task;

  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(task?.description || '');

  const handleSave = async () => {
    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      completed: task?.completed || false,
    };
    await saveTask(newTask);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{ marginTop: 10 }}
      />
      <Button mode="contained" onPress={handleSave} style={{ marginTop: 20 }}>
        Save Task
      </Button>
    </View>
  );
}

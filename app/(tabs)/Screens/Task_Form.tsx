import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { saveTask } from '../../../Utils/Storage';
import { Task } from '../../../Utils/types';

type Params = {
  task?: Task;
};

export default function Task_Form() {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const navigation = useNavigation();
  const task = route.params?.task;

  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [status, setStatus] = useState(task?.status || 'pending');
  const [dueDate, setDueDate] = useState<Date>(task?.dueDate ? new Date(task.dueDate) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = async () => {
    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      priority,
      status,
      dueDate: dueDate.toISOString(),
    };
    await saveTask(newTask);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#1C1D21', flex: 1 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={{ marginBottom: 10, backgroundColor: '#BB9BB0' }}
        theme={{ colors: { text: '#1C1D21', primary: '#A288A6' } }}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        mode="outlined"
        style={{ marginBottom: 10, backgroundColor: '#BB9BB0' }}
        theme={{ colors: { text: '#1C1D21', primary: '#A288A6' } }}
      />

      <Text style={{ color: '#F1E3E4', marginTop: 16 }}>Priority</Text>
      <RadioButton.Group 
        onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')} value={priority}>
        <RadioButton.Item label="Low" value="low" />
        <RadioButton.Item label="Medium" value="medium" />
        <RadioButton.Item label="High" value="high" />
      </RadioButton.Group>

      <Text style={{ color: '#F1E3E4', marginTop: 16 }}>Status</Text>
      <RadioButton.Group 
        onValueChange={(value) => setStatus(value as 'pending' | 'completed')} value={status}>
        <RadioButton.Item label="Pending" value="pending" />
        <RadioButton.Item label="Completed" value="completed" />
      </RadioButton.Group>

      <Button onPress={() => setShowPicker(true)} mode="outlined" style={{ marginTop: 10 }}>
        Select Due Date: {dueDate.toDateString()}
      </Button>
      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSave}
        style={{ marginTop: 20, backgroundColor: '#A288A6' }}
        textColor="#F1E3E4"
      >
        Save Task
      </Button>
    </View>
  );
}

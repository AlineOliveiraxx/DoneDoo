import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { saveTask } from '../../Utils/Storage';
import { Task } from '../../Utils/types';

export default function TaskForm() {
  const navigation = useNavigation();
  type TaskFormRouteParams = { task?: Task; };

const route = useRoute<RouteProp<Record<string, TaskFormRouteParams>, string>>();
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

    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('pending');
    setDueDate(new Date());

    navigation.navigate('HomeScreen');
  };

  return (
    <View style={{ paddingHorizontal: 30, backgroundColor: '#1C1D21', flex: 1 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        textColor="#A288A6"
        style={{ marginBottom: 10, marginTop: 70, backgroundColor: '#1C1D21' }}
        theme={{ colors: { primary: '#F1E3E4', placeholder: '#F1E3E4' } }}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        mode="outlined"
        textColor="#A288A6"
        style={{ marginBottom: 10, backgroundColor: '#1C1D21' }}
        theme={{ colors: { primary: '#F1E3E4', placeholder: '#F1E3E4' } }}
      />

      <Text style={{ color: '#F1E3E4', marginTop: 16 }}>Priority</Text>
      <RadioButton.Group 
        onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')} value={priority}>
        <RadioButton.Item label="Low" value="low" labelStyle={{ color: '#797979' }} />
        <RadioButton.Item label="Medium" value="medium" labelStyle={{ color: '#797979'}} />
        <RadioButton.Item label="High" value="high" labelStyle={{ color: '#797979' }} />
      </RadioButton.Group>

      <Text style={{ color: '#F1E3E4', marginTop: 16 }}>Status</Text>
      <RadioButton.Group 
        onValueChange={(value) => setStatus(value as 'pending' | 'completed')} value={status}>
        <RadioButton.Item label="Pending" value="pending" labelStyle={{ color: '#797979' }} />
        <RadioButton.Item label="Completed" value="completed" labelStyle={{ color: '#797979' }} />
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

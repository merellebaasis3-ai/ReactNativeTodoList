import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

type Task = {
  id: string;
  name: string;
};

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.name}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8,
  },

  addText: {
    color: 'white',
    fontWeight: 'bold',
  },

  taskContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  taskText: {
    flex: 1,
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 6,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
    fontSize: 16,
  },
});

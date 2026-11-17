import React, {useMemo, useState} from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View, FlatList,
} from 'react-native';

type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
type Task = {id: string; title: string; status: TaskStatus};

const initialTasks: Task[] = [
  {id: '1', title: 'Review CI pipeline', status: 'In Progress'},
  {id: '2', title: 'Build Android release', status: 'Pending'},
  {id: '3', title: 'Prepare iOS workflow', status: 'Completed'},
];

const nextStatus = (status: TaskStatus): TaskStatus =>
  status === 'Pending' ? 'In Progress' :
  status === 'In Progress' ? 'Completed' : 'Pending';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState('');

  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    active: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  }), [tasks]);

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks(current => [...current, {
      id: `${Date.now()}`,
      title,
      status: 'Pending',
    }]);
    setNewTask('');
  };

  const updateTask = (id: string) => {
    setTasks(current => current.map(task =>
      task.id === id ? {...task, status: nextStatus(task.status)} : task,
    ));
  };

  const renderTask = ({item}: {item: Task}) => (
    <View style={styles.taskCard}>
      <View style={styles.taskText}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>{item.status}</Text>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => updateTask(item.id)}
        style={styles.smallButton}>
        <Text style={styles.smallButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101827" />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>MOBILE DEVOPS DEMO</Text>
            <Text style={styles.heading}>Task Manager</Text>
            <Text style={styles.subtitle}>A sample app for Android and iOS CI/CD.</Text>

            <View style={styles.stats}>
              <Stat label="TOTAL" value={counts.total} />
              <Stat label="ACTIVE" value={counts.active} />
              <Stat label="DONE" value={counts.completed} />
            </View>

            <Text style={styles.sectionTitle}>Create a task</Text>
            <View style={styles.addRow}>
              <TextInput
                accessibilityLabel="New task title"
                placeholder="Enter task name"
                placeholderTextColor="#8994A7"
                value={newTask}
                onChangeText={setNewTask}
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={addTask}
              />
              <TouchableOpacity
                accessibilityRole="button"
                onPress={addTask}
                style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Your tasks</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one above.</Text>}
        ListFooterComponent={
          <Text style={styles.footer}>DEVOPS TASK MANAGER • DEMO BUILD</Text>
        }
      />
    </SafeAreaView>
  );
}

function Stat({label, value}: {label: string; value: number}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#101827'},
  content: {padding: 22, paddingBottom: 36},
  eyebrow: {color: '#65D6AD', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginTop: 20},
  heading: {color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginTop: 8},
  subtitle: {color: '#AAB5C5', fontSize: 14, marginTop: 8, marginBottom: 22},
  stats: {flexDirection: 'row', gap: 10, marginBottom: 28},
  statCard: {flex: 1, backgroundColor: '#1C293B', borderRadius: 14, padding: 14},
  statValue: {color: '#FFFFFF', fontSize: 25, fontWeight: '800'},
  statLabel: {color: '#9AA8BA', fontSize: 10, fontWeight: '700', marginTop: 5},
  sectionTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 12},
  addRow: {flexDirection: 'row', gap: 9, marginBottom: 28},
  input: {flex: 1, backgroundColor: '#1C293B', color: '#FFFFFF', borderRadius: 11, paddingHorizontal: 14, minHeight: 48},
  addButton: {backgroundColor: '#65D6AD', borderRadius: 11, justifyContent: 'center', paddingHorizontal: 18},
  addButtonText: {color: '#10251F', fontWeight: '800'},
  taskCard: {backgroundColor: '#1C293B', borderRadius: 13, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center'},
  taskText: {flex: 1},
  taskTitle: {color: '#FFFFFF', fontSize: 15, fontWeight: '700'},
  taskStatus: {color: '#AAB5C5', fontSize: 12, marginTop: 5},
  smallButton: {backgroundColor: '#2D4057', borderRadius: 9, paddingHorizontal: 14, paddingVertical: 9},
  smallButtonText: {color: '#FFFFFF', fontWeight: '700'},
  empty: {color: '#AAB5C5', paddingVertical: 20},
  footer: {color: '#66758A', textAlign: 'center', fontSize: 10, letterSpacing: 1.5, marginTop: 28},
});

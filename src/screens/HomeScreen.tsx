import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TodoItem from '../components/TodoItem';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const HomeScreen: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState('');

    const handleAddTodo = () => {
        if (inputText.trim() === '') return;
        const newTodo: Todo = {
            id: String(Date.now()),
            text: inputText,
            completed: false,
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setInputText('');
    };

    const handleToggleTodo = (id: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Todo"
                value={inputText}
                onChangeText={setInputText}
                style={styles.input}
            />
            <Button mode="contained" onPress={handleAddTodo}>
                Todo Ekle
            </Button>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        text={item.text}
                        completed={item.completed}
                        onToggle={() => handleToggleTodo(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 8,
    },
});

export default HomeScreen;

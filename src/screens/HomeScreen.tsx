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
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

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

    const handleDeleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const handleEditTodo = (id: string) => {
        const editedTodo = todos.find(todo => todo.id === id);
        if (editedTodo) {
            setInputText(editedTodo.text);
            setEditingTodoId(id);
        }
    };

    const handleSaveEditedTodo = () => {
        if (!editingTodoId) return;

        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === editingTodoId ? { ...todo, text: inputText } : todo
            )
        );

        setInputText('');
        setEditingTodoId(null);
    };

    const isEditing = !!editingTodoId;

    return (
        <View style={styles.container}>
            <TextInput
                label="Todo"
                value={inputText}
                onChangeText={setInputText}
                style={styles.input}
            />
            {!isEditing && (
                <Button mode="contained" onPress={handleAddTodo}>
                    Todo Ekle
                </Button>
            )}
            {isEditing && (
                <Button mode="contained" onPress={handleSaveEditedTodo}>
                    Todo Güncelle
                </Button>
            )}
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onToggle={() => handleToggleTodo(item.id)}
                        onDelete={() => handleDeleteTodo(item.id)}
                        onEdit={() => handleEditTodo(item.id)}
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

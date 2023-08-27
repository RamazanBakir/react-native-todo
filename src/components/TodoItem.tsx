import React from 'react';
import { Checkbox, List, IconButton } from 'react-native-paper';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => (
    <List.Item
        title={todo.text}
        left={() => <Checkbox status={todo.completed ? 'checked' : 'unchecked'} onPress={onToggle} />}
        right={() => (
            <>
                <IconButton icon="pencil" onPress={onEdit} />
                <IconButton icon="delete" onPress={onDelete} />
            </>
        )}
    />
);

export default TodoItem;

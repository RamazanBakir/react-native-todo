import React from 'react';
import { Checkbox, List } from 'react-native-paper';

interface TodoItemProps {
    text: string;
    completed: boolean;
    onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onToggle }) => (
    <List.Item
        title={text}
        left={() => <Checkbox status={completed ? 'checked' : 'unchecked'} onPress={onToggle} />}
    />
);

export default TodoItem;

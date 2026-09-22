import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

/* =========================
   1. KIỂU DỮ LIỆU
========================= */

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

/* =========================
   2. TODO REDUCER
========================= */

type TodoAction =
  | {
      type: 'ADD_TODO';
      payload: string;
    }
  | {
      type: 'TOGGLE_TODO';
      payload: string;
    }
  | {
      type: 'DELETE_TODO';
      payload: string;
    };

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Học React Native',
    completed: false,
  },
];

function todoReducer(
  state: Todo[],
  action: TodoAction
): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(
        (todo) => todo.id !== action.payload
      );

    default:
      return state;
  }
}

/* =========================
   3. THEME CONTEXT
========================= */

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme phải được sử dụng bên trong ThemeContext.Provider'
    );
  }

  return context;
}

/* =========================
   4. TODO ITEM
========================= */

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.todoItem,
        {
          backgroundColor: isDarkMode
            ? '#333'
            : '#f5f5f5',
        },
      ]}
    >
      <Pressable
        style={styles.todoContent}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          style={[
            styles.todoText,
            {
              color: isDarkMode
                ? '#fff'
                : '#222',
            },
            todo.completed && styles.completed,
          ]}
        >
          {todo.completed ? '✓ ' : '○ '}
          {todo.title}
        </Text>
      </Pressable>

      <Button
        title="Xóa"
        onPress={() => onDelete(todo.id)}
      />
    </View>
  );
}

/* =========================
   5. APP
========================= */

export default function Index() {
  /* useState */

  const [todoText, setTodoText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isDarkMode, setIsDarkMode] =
    useState(false);

  /* useReducer */

  const [todos, dispatch] = useReducer(
    todoReducer,
    initialTodos
  );

  /* useEffect */

  useEffect(() => {
    console.log(
      `Danh sách hiện có ${todos.length} công việc`
    );
  }, [todos.length]);

  /* useMemo - lọc công việc */

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  }, [todos, keyword]);

  /* useMemo - đếm công việc chưa hoàn thành */

  const remainingTodos = useMemo(() => {
    return todos.filter(
      (todo) => !todo.completed
    ).length;
  }, [todos]);

  /* useCallback - thêm */

  const handleAddTodo = useCallback(() => {
    const title = todoText.trim();

    if (!title) {
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: title,
    });

    setTodoText('');
  }, [todoText]);

  /* useCallback - hoàn thành */

  const handleToggleTodo = useCallback(
    (id: string) => {
      dispatch({
        type: 'TOGGLE_TODO',
        payload: id,
      });
    },
    []
  );

  /* useCallback - xóa */

  const handleDeleteTodo = useCallback(
    (id: string) => {
      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      });
    },
    []
  );

  const toggleTheme = useCallback(() => {
    setIsDarkMode(
      (previousMode) => !previousMode
    );
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? '#222'
              : '#fff',
          },
        ]}
      >
        {/* HEADER */}

        <Text
          style={[
            styles.title,
            {
              color: isDarkMode
                ? '#fff'
                : '#222',
            },
          ]}
        >
          QUẢN LÝ CÔNG VIỆC
        </Text>

        {/* THEME */}

        <Button
          title={
            isDarkMode
              ? 'Chuyển sang sáng'
              : 'Chuyển sang tối'
          }
          onPress={toggleTheme}
        />

        {/* ADD TODO */}

        <View style={styles.addContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode
                  ? '#fff'
                  : '#222',
                borderColor: isDarkMode
                  ? '#aaa'
                  : '#999',
              },
            ]}
            value={todoText}
            onChangeText={setTodoText}
            placeholder="Nhập công việc"
            placeholderTextColor={
              isDarkMode ? '#aaa' : '#777'
            }
          />

          <Button
            title="Thêm"
            onPress={handleAddTodo}
          />
        </View>

        {/* SEARCH */}

        <TextInput
          style={[
            styles.input,
            {
              color: isDarkMode
                ? '#fff'
                : '#222',
              borderColor: isDarkMode
                ? '#aaa'
                : '#999',
            },
          ]}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Tìm kiếm công việc"
          placeholderTextColor={
            isDarkMode ? '#aaa' : '#777'
          }
        />

        {/* COUNT */}

        <Text
          style={[
            styles.count,
            {
              color: isDarkMode
                ? '#fff'
                : '#222',
            },
          ]}
        >
          Công việc chưa hoàn thành:{' '}
          {remainingTodos}
        </Text>

        {/* TODO LIST */}

        <FlatList
          style={styles.list}
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          )}
          ListEmptyComponent={
            <Text
              style={[
                styles.empty,
                {
                  color: isDarkMode
                    ? '#fff'
                    : '#222',
                },
              ]}
            >
              Không có công việc nào
            </Text>
          }
        />
      </View>
    </ThemeContext.Provider>
  );
}

/* =========================
   6. STYLE
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },

  addContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  list: {
    flex: 1,
  },

  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  todoContent: {
    flex: 1,
  },

  todoText: {
    fontSize: 17,
  },

  completed: {
    textDecorationLine: 'line-through',
  },

  empty: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
  },
});
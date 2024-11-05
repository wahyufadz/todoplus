import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Pressable, useColorScheme } from "react-native";
import { Todo } from "@/constants/type/Todo";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { generalStyles } from "@/constants/style/General";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { getTodos } from "@/services/todoService";

export default function Index() {
  let [todos, setTodos] = useState<Todo[]>([]);

  //TODO: add todos from local storage
  useEffect(() => {
    const fetchTodos = async () => {
      const initialTodos = await getTodos();
      setTodos(sortTodosByDate(initialTodos));
    };
    fetchTodos();
  }, []);

  const today = dayjs();

  const sortTodosByDate = (todos: Todo[]) => {
    return todos.sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());
  };

  const getTodayTodos = (todos: Todo[]) => {
    return todos.filter((todo) => {
      const todoDate = dayjs(todo.time);
      return todoDate.isSame(today, "day");
    });
  };

  const toggleCompletedTodo = (toggleTodoId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === toggleTodoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const toggleImportantTodo = (toggleTodoId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === toggleTodoId
          ? { ...todo, important: !todo.important }
          : todo
      )
    );
  };

  // const deleteTodo = (deleteId: number) => {
  //   Alert.alert("Delete todo", "Are you sure you want to delete this todo?", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     {
  //       text: "Delete",
  //       onPress: () =>
  //         setTodos((prevTodos) =>
  //           prevTodos.filter((todo) => todo.id !== deleteId)
  //         ),
  //     },
  //   ]);
  // };

  const convertTime = (time: string, duration: number = 0) => {
    return dayjs(time).add(duration, "minute").format("LT");
  };

  const colorScheme = useColorScheme();
  const ThemedStyle = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
      marginBottom: 4,
      borderWidth: 2,
      padding: 8,
      borderRadius: 8,
      borderColor: Colors[colorScheme ?? "light"].text,
    },
  });

  return (
    <ThemedView style={generalStyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={todos}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <ThemedView style={ThemedStyle.content}>
            <ThemedView style={styles.todoItemContent}>
              <ThemedText style={styles.todoItemTimeText}>
                {`${convertTime(item.time)} - ${convertTime(
                  item.time,
                  item.duration
                )}`}
              </ThemedText>
              <ThemedText
                style={
                  item.completed ? styles.todoTitleCompleted : styles.todoTitle
                }
              >
                {item.title}
              </ThemedText>
              <ThemedText style={styles.todoDescription}>
                {item.description}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.todoIconContainer}>
              <Pressable onPress={() => toggleImportantTodo(item.id!)}>
                {item.important ? (
                  <Ionicons
                    style={styles.todoImportantIcon}
                    name="star"
                    color="green"
                  />
                ) : (
                  <Ionicons
                    style={styles.todoImportantIcon}
                    name="star"
                    color="grey"
                  />
                )}
              </Pressable>

              <Pressable onPress={() => toggleCompletedTodo(item.id!)}>
                {item.completed ? (
                  <Ionicons
                    style={styles.todoCompleteIcon}
                    name="checkmark-circle-outline"
                    color="green"
                  />
                ) : (
                  <Ionicons
                    style={styles.todoCompleteIcon}
                    name="ellipse-outline"
                    color="grey"
                  />
                )}
              </Pressable>
            </ThemedView>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  todoItemContainer: {
    padding: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  todoItemTimeText: {
    fontSize: 10,
  },
  todoItemContent: {
    flex: 6,
  },
  todoIconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoTitle: {
    fontSize: 16,
  },
  todoTitleCompleted: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "line-through",
  },
  todoDescription: {
    fontSize: 12,
  },
  todoImportantIcon: {
    fontSize: 24,
  },
  todoCompleteIcon: {
    fontSize: 24,
  },
  button: {
    marginHorizontal: 8,
  },
});
//TODO - group by date
//TODO - add new todo
//TODO - edit todo
//TODO - delete todo

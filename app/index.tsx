import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, FlatList, Pressable, useColorScheme } from "react-native";
import { Todo } from "@/constants/type/Todo";
import dayjs from "dayjs";
import { generalStyles } from "@/constants/style/General";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function Index() {
  //TODO: add todos from local storage
  let initialTodos: Todo[] = [
    {
      id: 1,
      completed: false,
      title: "Buy milk",
      description: "Buy milk from the store",
      category: "personal",
      time: "2024-10-25T10:00:00Z",
      duration: 10,
      important: true,
    },
    {
      id: 2,
      completed: true,
      title: "Cuci mobil",
      description: "Cuci mobil di tempat cuci mobil",
      category: "rumah tangga",
      time: "2024-10-25T14:30:00Z",
      duration: 45,
      important: false,
    },
    {
      id: 3,
      completed: false,
      title: "Beli buku",
      description: "Beli buku di toko buku",
      category: "pendidikan",
      time: "2024-10-25T16:00:00Z",
      duration: 30,
      important: true,
    },
    {
      id: 4,
      completed: false,
      title: "Kunjungi dokter gigi",
      description: "Pemeriksaan gigi rutin",
      category: "kesehatan",
      time: "2024-10-25T09:00:00Z",
      duration: 60,
      important: true,
    },
    {
      id: 5,
      completed: true,
      title: "Bayar tagihan listrik",
      description: "Bayar tagihan listrik bulan ini",
      category: "keuangan",
      time: "2024-10-25T11:00:00Z",
      duration: 15,
      important: true,
    },
    {
      id: 6,
      completed: false,
      title: "Olahraga",
      description: "Lari pagi di taman",
      category: "kesehatan",
      time: "2024-10-25T06:00:00Z",
      duration: 45,
      important: false,
    },
    {
      id: 7,
      completed: false,
      title: "Rapat tim",
      description: "Rapat mingguan dengan tim",
      category: "pekerjaan",
      time: "2024-10-25T13:00:00Z",
      duration: 90,
      important: true,
    },
    {
      id: 8,
      completed: true,
      title: "Belanja bulanan",
      description: "Belanja kebutuhan bulanan di supermarket",
      category: "rumah tangga",
      time: "2024-10-25T10:00:00Z",
      duration: 120,
      important: true,
    },
    {
      id: 9,
      completed: false,
      title: "Belajar bahasa baru",
      description: "Belajar bahasa Jepang selama 30 menit",
      category: "pengembangan diri",
      time: "2024-10-29T20:00:00Z",
      duration: 30,
      important: false,
    },
    {
      id: 10,
      completed: false,
      title: "Servis motor",
      description: "Bawa motor ke bengkel untuk servis rutin",
      category: "kendaraan",
      time: "2024-10-30T15:00:00Z",
      duration: 90,
      important: true,
    },
    {
      id: 11,
      completed: true,
      title: "Kirim paket",
      description: "Kirim paket ke kantor pos",
      category: "personal",
      time: "2024-10-31T11:30:00Z",
      duration: 30,
      important: false,
    },
    {
      id: 12,
      completed: false,
      title: "Bersihkan rumah",
      description: "Bersihkan seluruh rumah",
      category: "rumah tangga",
      time: "2024-11-01T09:00:00Z",
      duration: 180,
      important: true,
    },
    {
      id: 13,
      completed: false,
      title: "Persiapkan presentasi",
      description: "Siapkan presentasi untuk rapat besok",
      category: "pekerjaan",
      time: "2024-11-02T19:00:00Z",
      duration: 120,
      important: true,
    },
    {
      id: 14,
      completed: true,
      title: "Potong rambut",
      description: "Potong rambut di salon langganan",
      category: "personal",
      time: "2024-11-03T14:00:00Z",
      duration: 60,
      important: false,
    },
    {
      id: 15,
      completed: false,
      title: "Beli hadiah ulang tahun",
      description: "Beli hadiah untuk ulang tahun teman",
      category: "sosial",
      time: "2024-11-04T16:30:00Z",
      duration: 45,
      important: true,
    },
    {
      id: 16,
      completed: false,
      title: "Perbaiki keran bocor",
      description: "Perbaiki keran yang bocor di dapur",
      category: "rumah tangga",
      time: "2024-11-05T10:00:00Z",
      duration: 60,
      important: true,
    },
    {
      id: 17,
      completed: true,
      title: "Baca buku",
      description: "Baca buku selama 1 jam",
      category: "pengembangan diri",
      time: "2024-11-06T21:00:00Z",
      duration: 60,
      important: false,
    },
    {
      id: 18,
      completed: false,
      title: "Pergi ke gym",
      description: "Latihan angkat beban di gym",
      category: "kesehatan",
      time: "2024-11-07T17:00:00Z",
      duration: 90,
      important: false,
    },
    {
      id: 19,
      completed: false,
      title: "Buat laporan keuangan",
      description: "Buat laporan keuangan bulanan",
      category: "keuangan",
      time: "2024-11-08T09:30:00Z",
      duration: 120,
      important: true,
    },
    {
      id: 20,
      completed: true,
      title: "Nonton film",
      description: "Nonton film baru di bioskop",
      category: "hiburan",
      time: "2024-11-09T19:30:00Z",
      duration: 150,
      important: false,
    },
    {
      id: 21,
      completed: false,
      title: "Beli pupuk tanaman",
      description: "Beli pupuk untuk tanaman di halaman",
      category: "rumah tangga",
      time: "2024-11-10T11:00:00Z",
      duration: 30,
      important: false,
    },
  ];

  const lastId = 21;

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

  let [todos, setTodos] = useState(
    // getTodayTodos(
    sortTodosByDate(initialTodos)
    // )
  );

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
    const formattedTime = new Date(time);
    return new Date(
      formattedTime.getTime() + duration * 60000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
        keyExtractor={(item) => item.id.toString()}
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
              <Pressable onPress={() => toggleImportantTodo(item.id)}>
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

              <Pressable onPress={() => toggleCompletedTodo(item.id)}>
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

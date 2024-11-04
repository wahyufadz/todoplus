import { useState } from "react";
import {
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  SafeAreaView,
  View,
} from "react-native";
import { generalStyles } from "@/constants/style/General";
import { router } from "expo-router";
import dayjs from "dayjs";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import DurationPicker from "@/components/DurationPicker";

export default function AddTodo() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [duration, setDuration] = useState(5);
  let [time, setTime] = useState(new Date());
  let timePicked = new Date();
  let [category, setCategory] = useState("");
  let [showModal, setShowModal] = useState<"closed" | "date" | "time">(
    "closed"
  );
  let [error, setError] = useState({
    title: "",
  });
  let [hasError, setHasError] = useState(true);

  const validateForm = () => {
    if (title.length === 0) {
      setError({ ...error, title: "Judul tidak boleh kosong" });
      setHasError(true);
    } else {
      setError({ ...error, title: "" });
      setHasError(false);
    }
  };

  const handleAddTodo = () => {
    if (hasError) {
      // Tampilkan error jika ada
      console.log("Error:", error);
    } else {
      // Jika semua validasi berhasil, lanjutkan dengan pengiriman data
      router.replace({
        pathname: "/",
        params: {
          title,
          description,
          duration,
          time: time.toISOString(),
          category,
        },
      });
    }
  };

  return (
    <ThemedView style={generalStyles.container}>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={"height"}
        keyboardVerticalOffset={20}
      >
        <Modal
          visible={showModal !== "closed"}
          onRequestClose={() => setShowModal("closed")}
          animationType="slide"
        >
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showModal !== "closed" && (
              // <DateTimePicker
              //   value={time}
              //   mode={showModal === "time" ? "time" : "date"}
              //   display="spinner"
              //   onChange={(event, selectedTime) => {
              //     timePicked = selectedTime ?? new Date();
              //   }}
              // />
              <DateTimePicker
                value={time}
                mode={showModal === "time" ? "time" : "date"}
                onChange={(event: any, selectedTime: Date | undefined) => {
                  timePicked = selectedTime ?? new Date();
                }}
              />
            )}

            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Button
                title="Ok"
                onPress={() => {
                  setTime(timePicked);
                  setShowModal("closed");
                }}
              />
              <Button title="Cancel" onPress={() => setShowModal("closed")} />
            </ThemedView>
          </SafeAreaView>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title */}
          <ThemedText style={styles.inputTextLabel}>
            Title
            {error.title !== "" && (
              <ThemedText style={styles.errorText}> {error.title}</ThemedText>
            )}
          </ThemedText>
          <ThemedTextInput
            style={styles.inputText}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            onBlur={() => {
              validateForm();
            }}
          />

          {/* Description */}
          <ThemedText style={styles.inputTextLabel}>Description</ThemedText>
          <ThemedTextInput
            style={styles.inputText}
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
          />

          {/* Duration */}
          <ThemedText style={styles.inputTextLabel}>Duration</ThemedText>
          <DurationPicker onDurationChange={setDuration} />

          {/* Time */}
          <ThemedText style={styles.inputTextLabel}>Time</ThemedText>
          <ThemedTextInput
            style={styles.inputText}
            value={`${dayjs(time).format("HH:mm")} - ${dayjs(time)
              .add(duration, "minutes")
              .format("HH:mm")}`}
            editable={false}
            onPress={() => {
              setShowModal("time");
            }}
          />

          {/* Date */}
          <ThemedText style={styles.inputTextLabel}>Date</ThemedText>
          <ThemedTextInput
            style={styles.inputText}
            value={dayjs(time).format("DD MMMM YY")}
            editable={false}
            onPress={() => setShowModal("date")}
          />

          {/* Category */}
          <ThemedText style={styles.inputTextLabel}>Category</ThemedText>
          <ThemedTextInput
            style={styles.inputText}
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
          />

          {/* Button */}
          <ThemedView style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Add Todo"
                onPress={handleAddTodo}
                disabled={hasError}
              />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" onPress={() => router.back()} />
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  inputTextLabel: {
    marginBottom: 4,
    fontSize: 16,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    width: "100%",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },
  button: {
    marginHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 4,
  },
});

import { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "@/constants/style/General";

function DurationPicker({
  height = 50,
  marginBottom = 1,
  onDurationChange,
}: {
  height?: number;
  marginBottom?: number;
  onDurationChange: (value: number) => void;
}) {
  let [selectedDuration, setSelectedDuration] = useState(0);
  const durationChoices = [0, 5, 10, 15, 30, 45, 60, 75, 90, 105, 120];

  return (
    <View style={{ height, marginBottom }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        {durationChoices.map((value) => (
          <Pressable
            onPress={() => {
              setSelectedDuration(value);
              onDurationChange(value);
            }}
          >
            <View
              style={
                selectedDuration === value
                  ? {
                      ...styles.durationPickerItem,
                      ...styles.durationPickerItemSelected,
                    }
                  : styles.durationPickerItem
              }
              key={value}
            >
              <Text>{value}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export default function AddTodo() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [duration, setDuration] = useState(0);
  let [time, setTime] = useState("");
  let [category, setCategory] = useState("");

  return (
    <SafeAreaView style={generalStyles.container}>
      <View style={generalStyles.header}>
        <Text style={generalStyles.title}>Add Todo </Text>
      </View>
      <View style={generalStyles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.inputTextLabel}>Title</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
          />

          <Text style={styles.inputTextLabel}>Description</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
          />

          <Text style={styles.inputTextLabel}>Duration</Text>
          <DurationPicker onDurationChange={setDuration} />

          <Text style={styles.inputTextLabel}>Time</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Time"
            onChangeText={(text) => setTime(text)}
          />

          <Text style={styles.inputTextLabel}>Category</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add Todo" onPress={() => {}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    marginTop: 16,
    width: "100%",
  },
  durationPickerItem: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    width: 50,
    height: 50,
  },
  durationPickerItemSelected: {
    backgroundColor: "#ccc",
  },
});

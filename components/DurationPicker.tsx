import { useState } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DurationPicker({
  height = 50,
  marginBottom = 8,
  onDurationChange,
}: {
  height?: number;
  marginBottom?: number;
  onDurationChange: (value: number) => void;
}) {
  let [selectedDuration, setSelectedDuration] = useState(0);
  const durationChoices = [5, 10, 15, 30, 45, 60, 75, 90, 105, 120];

  return (
    <ThemedView style={{ height, marginBottom }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        {durationChoices.map((value) => (
          <Pressable
            key={value}
            onPress={() => {
              setSelectedDuration(value);
              onDurationChange(value);
            }}
          >
            <ThemedView
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
              <ThemedText>{value}</ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    marginBottom: 4,
  },
});

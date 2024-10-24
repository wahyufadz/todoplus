import { StyleSheet } from "react-native";

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
});

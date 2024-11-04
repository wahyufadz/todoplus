import { router, Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {},
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Todo App",
            headerShown: true,
            headerRight: () => (
              <Button title="Add" onPress={() => router.push("/addTodo")} />
            ),
            headerLeft: () => {
              return <></>;
            },
          }}
        />
        <Stack.Screen
          name="addTodo"
          options={{
            headerTitle: "Add Todo",
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

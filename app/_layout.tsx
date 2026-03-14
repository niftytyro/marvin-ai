import theme from "@/components/theme";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="conversation" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

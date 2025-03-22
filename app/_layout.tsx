import { SessionProvider } from "@/contexts/session";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack />
    </SessionProvider>
  );
}

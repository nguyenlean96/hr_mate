import { Text, View } from "react-native";
import { usePathname } from "expo-router";

export default function Index() {
  const pathname = usePathname();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit <Text style={{ backgroundColor: '#ddd', color: 'blue', paddingHorizontal: 8 }}>{`app/(auth)${pathname}/index.tsx`}</Text> to edit this screen.</Text>
    </View>
  );
}
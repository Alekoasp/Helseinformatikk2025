import { Stack } from 'expo-router';



export default function Layout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#2A86FF' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="symptom-checker/index" options={{ title: 'Symptom Checker' }} />
      <Stack.Screen name="nutrition-advice/index" options={{ title: 'Nutrition Guide' }} />
      <Stack.Screen name="appointment/index" options={{ title: 'Book Appointment' }} />
    </Stack>
  );
}




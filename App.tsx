import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";
import CharacterListScreen from "./src/screens/CharacterListScreen";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CharacterListScreen"
            component={CharacterListScreen}
            options={{
              title: "Demon Slayer",
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="CharacterDetailScreen"
            component={CharacterDetailScreen}
            options={{
              title: "Detalhes",
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
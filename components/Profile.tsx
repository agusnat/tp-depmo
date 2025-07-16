import { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, Image } from "react-native";
import * as SecureStore from "expo-secure-store";

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      const nombreGuardado = await SecureStore.getItemAsync("nombre");
      const emailGuardado = await SecureStore.getItemAsync("email");
      const descripcionGuardada = await SecureStore.getItemAsync("descripcion");
      if (nombreGuardado) setNombre(nombreGuardado);
      if (emailGuardado) setEmail(emailGuardado);
      if (descripcionGuardada) setDescripcion(descripcionGuardada);
    };
    cargarPerfil();
  }, []);

  const guardarPerfil = async () => {
    if (!nombre || !email || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Email inválido");
      return;
    }

    await SecureStore.setItemAsync("nombre", nombre);
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("descripcion", descripcion);
    Alert.alert("Perfil guardado", "Tus datos han sido guardados localmente");
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Image
        source={{ uri: "https://placekitten.com/200/200" }}
        className="w-32 h-32 rounded-full mb-4"
      />
      <Text className="text-xl font-bold mb-4 dark:text-white">Tu Perfil</Text>
      <TextInput
        className="border border-gray-400 rounded p-2 w-full max-w-sm mb-2 dark:text-white"
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        className="border border-gray-400 rounded p-2 w-full max-w-sm mb-2 dark:text-white"
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-400 rounded p-2 w-full max-w-sm mb-2 dark:text-white"
        placeholder="Descripción"
        placeholderTextColor="#888"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TouchableOpacity className="bg-green-500 rounded p-3 w-full max-w-sm mb-2" onPress={guardarPerfil}>
        <Text className="text-white text-center">Guardar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-red-500 rounded p-3 w-full max-w-sm" onPress={onLogout}>
        <Text className="text-white text-center">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
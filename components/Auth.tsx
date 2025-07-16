import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, Switch } from "react-native";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import Profile from "./Profile";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState<string | null>(null);
  const [modoOscuro, setModoOscuro] = useState(false);

  const validarCampos = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email y contraseña son requeridos");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Email inválido");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validarCampos()) return;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await SecureStore.setItemAsync("uid", cred.user.uid);
      setUsuario(cred.user.uid);
      Alert.alert("Registro exitoso", "Bienvenido");
    } catch (error: any) {
      Alert.alert("Error de registro", error.message);
    }
  };

  const handleSignIn = async () => {
    if (!validarCampos()) return;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await SecureStore.setItemAsync("uid", cred.user.uid);
      setUsuario(cred.user.uid);
      Alert.alert("Login exitoso", "Bienvenido de nuevo");
    } catch (error: any) {
      Alert.alert("Error de login", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    await SecureStore.deleteItemAsync("uid");
    await SecureStore.deleteItemAsync("nombre");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("descripcion");
    setUsuario(null);
    Alert.alert("Sesión cerrada", "Has salido correctamente");
  };

  const recuperarPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Ingrese su email para recuperar la contraseña");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Email enviado", "Revisa tu bandeja para restablecer la contraseña");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (usuario) {
    return <Profile onLogout={handleLogout} />;
  }

  return (
    <View className={`flex-1 justify-center items-center p-4 ${modoOscuro ? "bg-black" : "bg-white"}`}>
      <Text className={`text-2xl font-bold mb-6 ${modoOscuro ? "text-white" : "text-black"}`}>Login</Text>
      <TextInput
        className={`border rounded p-3 w-full max-w-sm mb-3 ${modoOscuro ? "border-gray-600 text-white" : "border-gray-300"}`}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        className={`border rounded p-3 w-full max-w-sm mb-3 ${modoOscuro ? "border-gray-600 text-white" : "border-gray-300"}`}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity className="bg-blue-500 rounded p-3 w-full max-w-sm mb-2" onPress={handleSignIn}>
        <Text className="text-white text-center">Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-500 rounded p-3 w-full max-w-sm mb-2" onPress={handleSignUp}>
        <Text className="text-white text-center">Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={recuperarPassword}>
        <Text className={`text-blue-600 mt-2 ${modoOscuro && "text-blue-300"}`}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
      <View className="flex-row items-center mt-4">
        <Text className={`${modoOscuro ? "text-white" : "text-black"} mr-2`}>Modo Oscuro</Text>
        <Switch value={modoOscuro} onValueChange={setModoOscuro} />
      </View>
    </View>
  );
}
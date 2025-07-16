import Auth from "./components/Auth";
import { SafeAreaView } from "react-native";

import './global.css';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <Auth />
    </SafeAreaView>
  );
}

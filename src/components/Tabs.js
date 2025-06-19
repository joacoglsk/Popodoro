import { Pressable, View, Text, StyleSheet } from "react-native";
import { useState } from "react";

export default function Tabs({ seleccion, setSeleccion }) {
  const opciones = ["3'", "5'", "10'"];
  const [pressed, setPressed] = useState(-1);

  return (
    <View style={styles.tabsContainer}>
      {opciones.map((opcion, index) => (
        <Pressable
          style={({ pressed: isPressed }) => [
            styles.tab,
            seleccion === index && styles.tabSeleccionado,
            isPressed && styles.tabPresionado,
          ]}
          key={index}
          onPress={() => setSeleccion(index)}
          onPressIn={() => setPressed(index)}
          onPressOut={() => setPressed(-1)}
        >
          <Text
            style={[
              styles.tabText,
              seleccion === index && styles.tabTextSeleccionado,
              pressed === index && styles.tabTextPresionado,
            ]}
          >
            {opcion}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#E8CFC7',
    borderWidth: 2,
    borderColor: '#4E342E',
    transitionDuration: '150ms',
  },
  tabSeleccionado: {
    backgroundColor: '#372316',
    borderColor: '#E8CFC7',
  },
  tabPresionado: {
    backgroundColor: '#92786E', 
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#372316',
  },
  tabTextSeleccionado: {
    color: '#fff',
  },
  tabTextPresionado: {
    color: '#fff',
  },
});
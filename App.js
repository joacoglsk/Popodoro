import { Platform, SafeAreaView, StyleSheet, Text, View, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import Timer from './src/components/Timer';
import Tabs from './src/components/Tabs';
import { Audio } from "expo-av";
import { enviarNotificacion } from './src/utility/notifications';

const DURACIONES = [3 * 60, 5 * 60, 10 * 60]; 
const COLORES = ["#6b4e3b", "#372316", "#1a0f08"]; 

export default function App() {
  const [seleccion, setSeleccion] = useState(0);
  const [tiempo, setTiempo] = useState(DURACIONES[seleccion]);
  const [run, setRun] = useState(false);
  const [alerta, setAlerta] = useState(false);

  // Inicia el temporizador automáticamente al cambiar la selección
  useEffect(() => {
    setTiempo(DURACIONES[seleccion]);
    setRun(true);
    setAlerta(false);
  }, [seleccion]);

  useEffect(() => {
    let intervalo = null;
    let alertaIntervalo = null;

    if (run && !alerta) {
      intervalo = setInterval(() => {
        setTiempo((prev) => {
          if (prev <= 1) {
            clearInterval(intervalo);
            setRun(false);
            setAlerta(true);
            reproducirAlarma();
            enviarNotificacion();
            Vibration.vibrate([500, 500, 500]);
            // Repetir alerta cada 30 segundos si no se responde
            alertaIntervalo = setInterval(() => {
              reproducirAlarma();
              Vibration.vibrate([500, 500, 500]);
            }, 30000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Limpiar intervalos al desmontar o cuando alerta se activa
    return () => {
      clearInterval(intervalo);
      clearInterval(alertaIntervalo);
    };
  }, [run, alerta]);

  async function reproducirAlarma() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Sonido/alarma.mp3')
    );
    await sound.playAsync();
  }

  function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    return `${minutos < 10 ? '0' : ''}${minutos}:${restoSegundos < 10 ? '0' : ''}${restoSegundos}`;
  }

  // Reiniciar todo al tocar la alerta
  function resetear() {
    setAlerta(false);
    setTiempo(DURACIONES[seleccion]);
    setRun(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORES[seleccion] }}>
      <View style={[styles.container, { backgroundColor: COLORES[seleccion] }]}>
        <Text style={styles.emoji}>💩</Text>
        <Text style={styles.titulo}>El Popodoro</Text>
        <Tabs seleccion={seleccion} setSeleccion={setSeleccion} />
        {!alerta ? (
          <Timer tiempo={formatearTiempo(tiempo)} />
        ) : (
          <View style={styles.alertaContainer}>
            <Text style={styles.alertaTexto}>¡Salí del baño ya!</Text>
            <Text style={styles.alertaSub} onPress={resetear}>Tocá para reiniciar</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'RobotoSlab-Bold', 
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  alertaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4E342E',
  },
  alertaTexto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4E342E',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertaSub: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
});
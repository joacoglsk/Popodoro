import * as Notifications from "expo-notifications";

// Configurar cómo se comportan las notificaciones en primer y segundo plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Función para programar una notificación
export const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏳ Popodoro Finalizado",
      body: "Tu tiempo terminó. ¡Tómate un descanso!",
      sound: true,
    },
    trigger: null, // Se envía de inmediato
  });
};
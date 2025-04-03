<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <HeaderNotifications />
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-list>
          <ion-item v-for="(notification, index) in notifications" :key="index">
            <ion-label>
              <h2>{{ notification.title }}</h2>
              <p>{{ notification.message }}</p>
            </ion-label>
            <ion-buttons slot="end">
              <ion-button v-if="!notification.read" @click="markAsRead(index)" color="success">
                <ion-icon :icon="checkmark"></ion-icon>
              </ion-button>
              <ion-button @click="deleteNotification(index)" color="danger">
                <ion-icon :icon="trash"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
        <ion-text v-if="notifications.length === 0" color="medium" class="ion-text-center">
          No tienes notificaciones.
        </ion-text>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonText } from "@ionic/vue";
  import { arrowBack, trash, checkmark } from "ionicons/icons";
import HeaderNotifications from "../components/HeaderNotifications.vue";
  
  // Lista de notificaciones (simulación)
  const notifications = ref([
    { title: "Nueva actualización", message: "Hay una nueva versión disponible.", read: false },
    { title: "Recordatorio", message: "No olvides tu reunión a las 3 PM.", read: true },
    { title: "Oferta especial", message: "Obtén un 20% de descuento hoy.", read: false },
  ]);
  
  // Marcar una notificación como leída
  const markAsRead = (index) => {
    notifications.value[index].read = true;
  };
  
  // Eliminar una notificación
  const deleteNotification = (index) => {
    notifications.value.splice(index, 1);
  };
  </script>
  
  <style scoped>
:root {
  --background-color: #f8f9fa;
  --text-color: #212529;
  --list-bg: #ffffff;
  --list-border: #e0e0e0;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

.dark {
  --background-color: #121212;
  --text-color: #ffffff;
  --list-bg: #1e1e1e;
  --list-border: #444;
  --shadow-light: rgba(255, 255, 255, 0.1);
}

/* Fondo de la pantalla */
ion-content {
  --background: var(--background-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Lista de notificaciones */
ion-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background: var(--list-bg);
  border-radius: 10px;
  box-shadow: 0px 4px 10px var(--shadow-light);
  border: 1px solid var(--list-border);
}

/* Cada elemento de la lista */
ion-item {
  --background: transparent;
  --border-color: var(--list-border);
  padding: 12px;
  border-bottom: 1px solid var(--list-border);
}

ion-item:last-child {
  border-bottom: none;
}

/* Texto dentro de la lista */
ion-text {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: bold; 
}

/* Modo oscuro */
.dark ion-list {
  background: var(--list-bg);
  border-color: var(--list-border);
  box-shadow: 0px 4px 10px var(--shadow-light);
  color: var(--text-color);
  border-radius: 10px;
}

.dark ion-item {
  --border-color: var(--list-border);

}

.dark ion-text {
  color: #121212;
  font-size: 1.2em;
  font-weight: bold;
}

h2 {
  color: var(--text-color);
  font-size: 1.2em;
  margin-bottom: 5px;
}

</style>

  
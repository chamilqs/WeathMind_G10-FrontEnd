<template>
    <ion-page>
            <!-- Encabezado -->
            <ion-header>
      <IonToolbar>
      <HeaderNotifications></HeaderNotifications>
      </IonToolbar>
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
  import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonText } from "@ionic/vue";
  import { trash, checkmark } from "ionicons/icons";
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


.header-btn {
  background: #f9fafb;
  padding: 10px;
  padding-left: 20px;
  position:relative;
  right: 10px; /* Ajusta la distancia desde la parte izquierda */
}
.header {
    text-align: center;
    padding: 30px;
    background: #f9fafb
   }

.text-content h2 {
    color: #1f2937;
    font-weight: semibold;
    margin: 0;
}

.text-content p {
    color: #9ca3af;
    margin: 0;
    font-size: 14px;
    margin-top: 5px;
}

.text-content h1 {
    color: #1e3a8a;
    font-size: 16px;
    font-weight: bold; 
    margin: 10px 0 0;
}

a {
   text-decoration: none;
  display: inline-block;
  padding: 16px 24px;
}

a:hover {
  background-color: #ffffff;
  color: black;
}

.previous {
  background-color: #ffffff;
  color: #1783ff;
  size: 20px;
  border: 0.5px solid #1783ff;
  position: absolute;
  top: 35px; /* Ajusta la distancia desde la parte superior */
  left: 25px; /* Ajusta la distancia desde la parte izquierda */
  padding: 10px 18px; /* Puedes ajustar el tamaño del botón si lo deseas */
}
  ion-card {
    max-width: 600px;
    margin: auto;
    margin-bottom: 20px; /* Espacio entre las tarjetas */
  }
  
  ion-item {
    margin-bottom: 15px; /* Espacio entre cada campo */
  }
  
  ion-text {
    display: block;
    text-align: center;
    margin-top: 10px;
  }

  ion-button {
  --background: #0056b3 !important; /* Azul oscuro */
  --color: white !important;
  --border-radius: 8px;
  --border: 1px solid #003f7f;
  font-weight: bold;
  text-transform: uppercase;
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

  
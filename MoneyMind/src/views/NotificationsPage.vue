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


  ion-list {
    max-width: 600px;
    margin: auto;
  }
  ion-text {
    display: block;
    text-align: center;
    margin-top: 20px;
  }


  </style>
  
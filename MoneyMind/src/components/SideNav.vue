<template>
  <ion-menu side="start" content-id="main-content" id="main-menu" swipe-gesture="true">
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Perfil centrado -->
    <div class="perfil">
      <ion-avatar class="avatar">
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="avatar" />
      </ion-avatar>
      <div class="info">
        <h1>Tiana Saris</h1>
        <p>@Broklyn</p>
      </div>
    </div>

    <ion-content class="ion-padding">
      <ion-list>
        <!-- Separador -->
        <ion-item-divider>
          <ion-label>Personal info</ion-label>
        </ion-item-divider>
        <ion-item button @click="closeMenu">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Personal Info</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="id-card-outline"></ion-icon>
          <ion-label>Your Profile</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="time-outline"></ion-icon>
          <ion-label>History Transaction</ion-label>
        </ion-item>

        <!-- Separador -->
        <ion-item-divider>
          <ion-label>Security</ion-label>
        </ion-item-divider>

        <!-- Opciones de seguridad -->
        <ion-item button @click="closeMenu">
          <ion-icon name="finger-print-outline"></ion-icon>
          <ion-label>Face Id</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="key-outline"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="lock-open-outline"></ion-icon>
          <ion-label>Forgot Password</ion-label>
        </ion-item>

        <!-- Separador de General -->
        <ion-item-divider>
          <ion-label>General</ion-label>
        </ion-item-divider>

        <!-- Opciones de General -->
        <ion-item button @click="closeMenu">
          <ion-icon name="notifications-outline"></ion-icon>
          <ion-label>Notification</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="language-outline"></ion-icon>
          <ion-label>Languages</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu">
          <ion-icon name="help-circle-outline"></ion-icon>
          <ion-label>Help and Support</ion-label>
        </ion-item>
        <ion-item button @click="closeMenu" class="logout-item">
          <ion-icon name="log-out-outline"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, menuController } from '@ionic/vue';

const closeMenu = async () => {
  await menuController.close();
};
</script>


<style scoped>
  ion-toolbar {
    --background: #ffffff; /* Fondo blanco */
    --color: #000000; /* Texto negro */
    --border-color: transparent; /* Sin borde */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
  }

  ion-content {
    --background: #ffffff; /* Fondo blanco */
    --color: #000000; /* Texto negro */
  }

  .perfil {
    display: flex;
    flex-direction: column; /* Coloca los elementos en columna */
    align-items: center; /* Centra horizontalmente */
    justify-content: center; /* Centra verticalmente */
    padding: 16px;
    background-color: #ffffff; /* Fondo blanco */
    color: #000000; /* Texto negro */
    border-bottom: 1px solid #e0e0e0; /* Línea divisoria */
    text-align: center; /* Centra el texto */
  }

  .perfil .avatar {
    width: 80px; /* Tamaño del avatar */
    height: 80px; /* Tamaño del avatar */
    margin-bottom: 16px; /* Espacio entre el avatar y el texto */
  }

  .perfil .info h1 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .perfil .info p {
    margin: 0;
    font-size: 14px;
    color: #666666; /* Color gris para el username */
  }

  ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --inner-padding-end: 16px;
    --border-width: 0; /* Sin borde */
    --inner-border-width: 0; /* Sin borde interno */
    --background: #ffffff; /* Fondo blanco */
    --color: #000000; /* Texto negro */
  }

  ion-icon {
    margin-right: 16px;
    font-size: 20px;
    color: #666666; /* Color gris para los íconos */
  }

  ion-item-divider {
    --background: #f4f4f4; /* Fondo gris claro */
    --color: #666666; /* Texto gris */
    font-weight: bold;
  }

  ion-list {
    --border-width: 0; /* Sin borde */
    --inner-border-width: 0; /* Sin borde interno */
  }

  .logout-item {
    --color: #ff0000; /* Texto rojo para Logout */
  }

  .logout-item ion-icon {
    color: #ff0000; /* Ícono rojo para Logout */
  }
</style>
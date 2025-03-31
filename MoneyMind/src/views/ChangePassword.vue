<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <HeaderChangePassword/>
        </ion-toolbar>
      </ion-header>
  
      <!-- Contenido -->
      <ion-content class="ion-padding">
        <div class="d-flex justify-content-center align-items-center vh-100">
          <ion-card class="p-4 shadow-lg">
            <ion-card-header class="text-center">
              <ion-card-title class="fs-4">Actualizar Contraseña</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <form @submit.prevent="changePassword">
                <!-- Contraseña actual -->
                <ion-item>
                  <ion-label  position="floating"  class="label_pw">Contraseña Actual</ion-label>
                  <ion-input v-model="oldPassword" type="password" required></ion-input>
                </ion-item>
  
                <!-- Nueva contraseña -->
                <ion-item>
                  <ion-label position="floating" class="label_pw">Nueva Contraseña</ion-label>
                  <ion-input v-model="newPassword" type="password" required></ion-input>
                </ion-item>
  
                <!-- Confirmar nueva contraseña -->
                <ion-item>
                  <ion-label position="floating " class="label_pw">Confirmar Contraseña</ion-label>
                  <ion-input v-model="confirmPassword" type="password" required></ion-input>
                </ion-item>
  
                <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
  
                <!-- Botón de actualizar -->
                <ion-button expand="full" type="submit" class="mt-3">
                  Actualizar Contraseña
                </ion-button>
              </form>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

import HeaderChangePassword from "../components/HeaderChangePassword.vue";


const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Las contraseñas no coinciden.";
    return;
  }
  if (newPassword.value.length < 8) {
    errorMessage.value = "Debe tener al menos 8 caracteres.";
    return;
  }

  console.log("Contraseña actualizada");
  errorMessage.value = "";
};

const goBack = () => {
  router.push('/tabs/homepage'); // ✅ Redirige al login
};


</script>
  
  <style scoped>
  /* Fondo claro */
  .ion-padding {
    background-color: #f8f9fa;
    justify-content: start;
    align-items: start;
    margin-top: 100px;
  }

    /* Icono del botón de volver */
    ion-icon {
    font-size: 20px;
    color: black;
  }
  .title {
    color: black;
    align-items: start;
    text-align: start;
    font-size: 28px;
    justify-content: start;
    margin-right: 100px;
  }
  
  /* Tarjeta con sombra */
  ion-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    border-radius: 12px;
    margin-bottom: 200px;
  }
  ion-item{
    display: flex;
    flex-direction: row;
    justify-content: center;
  
  }
  .label_pw {
    font-size: 15px;
    color: gray;
    margin-bottom: 2px;
  }
  ion-buttons{
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 1px;
  background: #0056b3;
  color: #ced4da;
}


.icon-container {
  display: flex;
  justify-content: start;
  align-items: start;
  color: white;
  background: #0056b3;
  padding: 10px;
  border-radius: 5px;
}

.icon-container :hover {
  background-color: var(--button-hover);
  transform: scale(1.02);
}

.icon-container :focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

  </style>
  
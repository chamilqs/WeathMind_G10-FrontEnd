<template>
  <ion-page>
    <!-- Encabezado -->
    <ion-header>
      <ion-toolbar>
        <HeaderChangePassword />
      </ion-toolbar>
    </ion-header>

    <!-- Contenido -->
    <ion-content class="ion-padding" fullscreen="true">
      <!-- Contenedor centrado -->
      <div class="d-flex justify-content-center align-items-center vh-100 centered">
        <ion-card class="p-4 shadow-lg">
          <ion-card-header class="text-center">
            <ion-card-title class="fs-4">Actualizar Contraseña</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="changePassword">
              <!-- Contraseña actual -->
              <ion-item>
                <div class="label-container">
                  <ion-label position="floating">Contraseña Actual</ion-label>
                </div>
                <ion-input v-model="oldPassword" type="password" required></ion-input>
              </ion-item>

              <!-- Nueva contraseña -->
              <ion-item>
                <div class="label-container">
                  <ion-label position="floating">Nueva Contraseña</ion-label>
                </div>
                <ion-input v-model="newPassword" type="password" required></ion-input>
              </ion-item>

              <!-- Confirmar nueva contraseña -->
              <ion-item>
                <div class="label-container">
                  <ion-label position="floating">Confirmar Contraseña</ion-label>
                </div>
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
import { useRouter } from "vue-router";
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
  router.push("/tabs/homepage");
};
</script>

<style scoped>
/* Estilos generales */
:root {
  --ion-background-color: #f8f9fa;
  --ion-text-color: black;
  --ion-card-background: white;
  --ion-card-shadow: rgba(0, 0, 0, 0.2);
  --ion-item-background: white;
  --ion-label-color: gray;
  --ion-button-background: #0056b3;
  --ion-button-color: white;
}

/* Fondo general */
ion-content {
  background-color: var(--ion-background-color);
  color: var(--ion-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

ion-card {
  max-width: 380px; /* Antes 400px */
  width: 90%;
  padding: 20px;
}

/* Centrar mejor el contenido */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 90vh;
}

/* Aumentar margen entre inputs */
ion-item {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px; /* Antes 12px */
  --padding-start: 14px;
  --padding-end: 14px;
  border: 1px solid #ccc; /* Agregar borde */
}

/* Etiquetas de los inputs */
ion-label {
  display: block;
  margin-bottom: 5px; /* Ajusta según necesites */
}

.label-container {
  width: 100%;
  margin-bottom: 5px; /* Espacio entre el label y el input */
}


/* Mejorar visibilidad del botón */
ion-button {
  --background: #0056b3 !important; /* Azul oscuro */
  --color: white !important;
  --border-radius: 8px;
  --border: 1px solid #003f7f;
  font-weight: bold;
  text-transform: uppercase;
}


</style>

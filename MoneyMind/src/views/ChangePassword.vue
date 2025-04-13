<template>
  <ion-page>
    <!-- Encabezado -->
    <ion-header>
      <IonToolbar>
        <HeaderChangePassword></HeaderChangePassword>
      </IonToolbar>

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { alertController } from '@ionic/vue'
import HeaderChangePassword from '../components/HeaderChangePassword.vue'

const router = useRouter()


// Variables reactivas para las contraseñas
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')



const showAlert = async (header, message) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ['OK']
  })
  await alert.present()
}

const changePassword = async () => {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    return showAlert('Missing fields', 'Please fill in all fields')
  }

  if (newPassword.value !== confirmPassword.value) {
    return showAlert('Error', 'New passwords do not match')
  }

  try {
    // Aquí va la llamada real al backend
    console.log('Enviando cambio de contraseña:', {
      current: currentPassword.value,
      new: newPassword.value
    })

    // Simulación de éxito
    await showAlert('Success', 'Password changed successfully')
    router.push('/tabs/homepage')
  } catch (error) {
    await showAlert('Error', 'Failed to change password')
  }
}
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

.next {
  background-color: #04AA6D;
  color: white;
}

.round {
  border-radius: 50%;
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

<template>
  <ion-page>
    <!-- Encabezado -->
    <ion-header>
      <IonToolbar>
        <HeaderForgotPassword></HeaderForgotPassword>
      </IonToolbar>

    </ion-header>

    <!-- Contenido -->
    <ion-content class="ion-padding" fullscreen="true">
      <div class="d-flex justify-content-center align-items-center vh-100 centered">
        <ion-card class="p-4 shadow-lg">
          <ion-card-header class="text-center">
            <ion-card-title class="fs-4 font-bold">Reset Your Password</ion-card-title>
            <p>Enter your email to receive a password reset link.</p>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="sendResetLink">
              <!-- Email -->
              <ion-item>
                <div class="label-container">
                  <ion-label position="floating"></ion-label>
                </div>
                <ion-input v-model="email" type="email" required placeholder="Enter your email"></ion-input>
              </ion-item>

              <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>

              <!-- Botón -->
              <ion-button expand="full" type="submit" class="mt-3">
                Send Reset Link
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
import { alertController, IonToolbar } from '@ionic/vue'
import HeaderForgotPassword from '../components/HeaderForgotPassword.vue'



const email = ref('')
const router = useRouter()



const showAlert = async (header, message) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ['OK'],
  })
  await alert.present()
}

const sendResetLink = async () => {
  if (!email.value.trim()) {
    return showAlert('Missing Email', 'Please enter your email address.')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    return showAlert('Invalid Email', 'Please enter a valid email address.')
  }
 // Simula el envío (reemplaza por API real si deseas)
  try {
    console.log(`Sending password reset link to: ${email.value}`)
    await showAlert('Reset Link Sent', 'Please check your email for the password reset instructions.')
    router.push('/login')
  } catch (error) {
    await showAlert('Error', 'Failed to send reset link. Try again later.')
  }
}
</script>

<style scoped>
:root {
  --background-color: #f8f9fa;
  --form-bg: #ffffff;
  --text-color: #212529;
  --input-bg: #f1f3f4;
  --input-border: #ced4da;
  --button-bg: #0056b3;
  --button-hover: #003f7f;
  --shadow-light: rgba(0, 0, 0, 0.2);
}

.dark {
  --background-color: #121212;
  --form-bg: #1e1e1e;
  --text-color: #ffffff;
  --input-bg: #333;
  --input-border: #444;
  --button-bg: #0a84ff;
  --button-hover: #0056b3;
  --shadow-light: rgba(255, 255, 255, 0.1);
}

/* Header con botón */
.header-btn {
  background: #f9fafb;
  padding: 10px 20px;
  position: relative;
  right: 10px;
}

.header {
  text-align: center;
  padding: 30px;
  background: #f9fafb;
}

.text-content h2 {
  color: #1f2937;
  margin: 0;
}

.text-content p {
  color: #9ca3af;
  margin-top: 5px;
  font-size: 14px;
}

.text-content h1 {
  color: #1e3a8a;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0;
}

/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  max-width: 380px;
  width: 90%;
  padding: 20px;
  background: var(--form-bg);
  border-radius: 10px;
  box-shadow: 0px 4px 10px var(--shadow-light);
  text-align: center;
  gap: 15px;
  color: var(--text-color);
}

/* Fondo general */
ion-content {
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  height: 100vh;
}

/* Inputs */
ion-item {
  background-color: var(--input-bg);
  border-radius: 8px;
  margin-bottom: 16px;
  --padding-start: 14px;
  --padding-end: 14px;
  border: 1px solid var(--input-border);
}

ion-input {
  --background: transparent;
  --color: var(--text-color);
}

/* Etiquetas (si las usas manualmente) */
ion-label {
  display: block;
  margin-bottom: 5px;
}

.label-container {
  width: 100%;
  margin-bottom: 5px;
}

/* Botón */
ion-button {
  --background: var(--button-bg) !important;
  --color: white !important;
  --border-radius: 8px;
  --border: 1px solid var(--button-hover);
  font-weight: bold;
  text-transform: uppercase;
}

/* Modo oscuro */
.dark ion-page {
  background-color: #2c2c2c !important;
}

.dark ion-content {
  background-color: #121212 !important;
}

.dark ion-item {
  --background: #2c2c2c !important;
  --border-color: #444 !important;
}

.dark ion-input {
  --color: #ffffff !important;
}
</style>

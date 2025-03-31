<template>
  <ion-page>
         <!-- Header con botón de volver -->
      <IonHeader>
       <IonToolbar>
          <HeaderForgotPassword/>
       </IonToolbar>
      </IonHeader>
      
    <ion-content class="ion-padding">
      <div class="container centered">
        <h2>Reset Your Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <ion-list>
          <ion-item>
            <ion-input v-model="email" type="email" placeholder="Enter your email"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="full" @click="sendResetLink">Send Reset Link</ion-button>
      
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonToolbar, IonHeader } from '@ionic/vue';
import HeaderForgotPassword from '../components/HeaderForgotPassword.vue';

const email = ref('');
const router = useRouter(); // ✅ Para redirigir a otra página

const sendResetLink = () => {
  if (!email.value.trim()) {
    alert('Please enter your email.');
    return;
  }
  console.log(`Sending password reset link to ${email.value}`);
};

const goToLogin = () => {
  router.push('/tabs/login'); // ✅ Redirige al login
};
</script>

<style scoped>
:root {
  --background-color: #f8f9fa;
  --form-bg: #ffffff;
  --text-color: #212529;
  --input-bg: #f1f3f4;
  --button-bg: #033974;
  --button-hover: #0056b3;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

.dark {
  --background-color: #121212;
  --form-bg: #1e1e1e;
  --text-color: #ffffff;
  --input-bg: #333;
  --button-bg: #0a84ff;
  --button-hover: #0056b3;
  --shadow-light: rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: var(--form-bg);
  border-radius: 10px;
  box-shadow: 0px 4px 10px var(--shadow-light);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: var(--text-color);
}

ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: var(--background-color);
}
ion-buttons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1px;
  background: #0056b3;
  color: #ced4da;
}


.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
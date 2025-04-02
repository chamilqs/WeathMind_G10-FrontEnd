<template>
  <ion-page>
    <Ion-header>
        <Ion-toolbar>
         <HeaderHelpSupport />
        </Ion-toolbar>
      </Ion-header>
  
      <ion-content :fullscreen="true" class="ion-padding">
        <!-- Sección de Preguntas Frecuentes -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Preguntas Frecuentes</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-accordion-group>
              <ion-accordion v-for="(faq, index) in faqs" :key="index">
                <ion-item slot="header">
                  <ion-label>{{ faq.question }}</ion-label>
                </ion-item>
                <div slot="content" class="ion-padding">
                  {{ faq.answer }}
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-card-content>
        </ion-card>
  
        <!-- Formulario de Contacto -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Contáctanos</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="name" required></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Correo Electrónico</ion-label>
              <ion-input type="email" v-model="email" required></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Mensaje</ion-label>
              <ion-textarea v-model="message" required></ion-textarea>
            </ion-item>
  
            <ion-button expand="full" @click="sendSupportRequest">Enviar</ion-button>
  
            <ion-text v-if="responseMessage" color="success" class="ion-text-center">
              {{ responseMessage }}
            </ion-text>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
import { ref } from 'vue';
import HeaderHelpSupport from '../components/HeaderHelpSupport.vue';
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonToolbar, IonHeader } from '@ionic/vue';


// Removed unused router variable
  // Preguntas Frecuentes (FAQs)
  const faqs = ref([
    { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Puedes restablecer tu contraseña en la página de inicio de sesión haciendo clic en 'Olvidé mi contraseña'." },
    { question: "¿Cómo contacto con el soporte?", answer: "Puedes enviarnos un mensaje usando el formulario de contacto en esta página." },
    { question: "¿Es esta aplicación gratuita?", answer: "Sí, nuestra aplicación es gratuita, pero algunas funciones pueden requerir suscripción." },
  ]);
  
  // Datos del formulario
  const name = ref("");
  const email = ref("");
  const message = ref("");
  const responseMessage = ref("");
  // Removed unused goBack function

  // Función para enviar el mensaje de soporte
  const sendSupportRequest = () => {
    if (!name.value || !email.value || !message.value) {
      responseMessage.value = "Por favor, completa todos los campos.";
      return;
    }
  
    // Simulación de envío
    console.log("Mensaje enviado:", { name: name.value, email: email.value, message: message.value });
    responseMessage.value = "Tu mensaje ha sido enviado. Te responderemos pronto.";
    
    // Limpiar los campos después de enviar
    name.value = "";
    email.value = "";
    message.value = "";
  };
  </script>
  
  <style scoped>
:root {
  --background-color: #f8f9fa;
  --card-bg: #ffffff;
  --text-color: #212529;
  --button-bg: #0056b3;
  --button-hover: #003d80;
  --border-color: #e0e0e0;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

.dark {
  --background-color: #121212;
  --card-bg: #1e1e1e;
  --text-color: #ffffff;
  --button-bg: #0a84ff;
  --button-hover: #0056b3;
  --border-color: #444;
  --shadow-light: rgba(255, 255, 255, 0.1);
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


  ion-accordion {
    margin-bottom: 10px; /* Espacio entre cada acordeón */
  }

  ion-accordion-group {
    margin-bottom: 20px; /* Espacio entre grupos de acordeones */
  }
  ion-accordion ion-item {
    --background: transparent;
    --border-color: var(--border-color);
    --color: var(--text-color);
  }

  ion-accordion ion-item ion-label {
    font-weight: bold;
    color: var(--text-color);
  }

  ion-accordion ion-item div {
    color: var(--text-color);
  }

  .dark ion-label  {
    color: #ffffff;
  }

  .dark ion-accordion ion-item {
    --background: #1e1e1e;
    --border-color: var(--border-color);
  }
  .dark ion-accordion ion-item ion-label {
    color: #ffffff;
  }

  </style>
  
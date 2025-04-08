<template>
  <ion-page>
       <!-- Encabezado -->
        <ion-header>
      <IonToolbar>
        <HeaderHelpSupport></HeaderHelpSupport>
      </IonToolbar>

    </ion-header>

  
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
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonToolbar, IonHeader } from '@ionic/vue';
import HeaderHelpSupport from '../components/HeaderHelpSupport.vue';




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
  
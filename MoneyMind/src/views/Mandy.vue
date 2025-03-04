<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Mandy</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="chat-container">
        <div class="chat-date">Today, 04:12 pm</div>
  
        <!-- Mensajes -->
        <div class="chat-message received">
          <ion-icon :icon="star" class="chat-icon"></ion-icon>
          <div class="message-bubble">Hi, there!</div>
        </div>
      </ion-content>
  
      <!-- Barra de entrada de mensaje -->
      <ion-footer class="chat-footer">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button fill="clear">
              <ion-icon :icon="imageOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-input
            v-model="message"
            placeholder="Type your message here"
            class="chat-input"
          ></ion-input>
          <ion-buttons slot="end">
            <ion-button fill="clear" @click="sendMessage">
              <ion-icon :icon="sendOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { star, sendOutline, imageOutline } from "ionicons/icons";
  
  const message = ref("");
  
  const sendMessage = () => {
    if (message.value.trim() !== "") {
      console.log("Mensaje enviado:", message.value);
      message.value = ""; // Limpiar campo después de enviar
    }
  };
  </script>
  
  <style scoped>
	ion-title {
		color: black;
	}
  .chat-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .chat-date {
    text-align: center;
    color: gray;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .chat-message {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .received {
    justify-content: flex-start;
  }
  
  .chat-icon {
    font-size: 24px;
    color: blue;
    margin-right: 8px;
  }
  
  .message-bubble {
    background: #d4e7fe;
    padding: 10px 15px;
    border-radius: 15px;
    font-weight: bold;
    color: black;
  }
  
  /* Ajustes para la barra de mensajes */
  .chat-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
  }
  
  .chat-input {
    background: #d4e7fe;
    border-radius: 20px;
    padding: 8px 15px;
    flex: 1;
  }
  </style>
  
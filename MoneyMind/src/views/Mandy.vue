<template>
  <div>
    <!-- Botón flotante para abrir el chatbot -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="toggleChat">
        <ion-icon :icon="chatbubbleOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <!-- Chat flotante con Typebot -->
    <div v-if="isChatOpen" class="chat-popup">
      <ion-header>
        <ion-toolbar>
          <ion-title>Mandy</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear" @click="toggleChat">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="chat-container">
        <iframe 
          src="https://typebot.co/my-typebot-hh7iay8" 
          class="chat-iframe"
          frameborder="0"
        ></iframe>
      </ion-content>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { chatbubbleOutline, closeOutline } from "ionicons/icons";

const isChatOpen = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};
</script>

<style scoped>
.chat-popup {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 320px;
  height: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-iframe {
  width: 100%;
  height: 100%;
}
</style>

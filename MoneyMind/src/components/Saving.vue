<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button color="danger" @click="goBack">Cancelar</ion-button>
          </ion-buttons>
          <ion-title>Crear Cuenta de Ahorro</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Nombre de la cuenta</ion-label>
            <ion-input v-model="formData.name" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Saldo inicial</ion-label>
            <ion-input v-model="formData.balance" type="number"></ion-input>
          </ion-item>
        </ion-list>
  
        <ion-button expand="block" @click="submitForm">Crear Cuenta</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons
  } from '@ionic/vue';
  
  const router = useRouter();
  
  const formData = ref({
    name: '',
    balance: 0,
    productType: 'Saving'
  });
  
  const submitForm = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value)
      });
      
      if(response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const goBack = () => {
    router.back();
  };
  </script>
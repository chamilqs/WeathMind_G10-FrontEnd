<template>
  <div>
    <!-- Botón para abrir el Action Sheet -->
    <ion-button @click="openActionSheet">Más Opciones</ion-button>

    <!-- Action Sheet con las opciones -->
    <ion-action-sheet
      :is-open="isActionSheetOpen"
      header="Opciones"
      :buttons="actionSheetButtons"
      @didDismiss="closeActionSheet"
    ></ion-action-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonActionSheet } from '@ionic/vue';

const router = useRouter();
const isActionSheetOpen = ref(false); // Estado para controlar la visibilidad del Action Sheet

// Opciones del Action Sheet
const actionSheetButtons = [
  {
    text: 'Solicitar Tarjeta',
    handler: () => {
      router.push('/solicitar-tarjeta'); // Redirige al formulario de tarjeta
    },
  },
  {
    text: 'Solicitar Cuenta',
    handler: () => {
      router.push('/solicitar-cuenta'); // Redirige al formulario de cuenta
    },
  },
  {
    text: 'Cancelar',
    role: 'cancel', // Cierra el Action Sheet sin realizar ninguna acción
  },
];

// Función para abrir el Action Sheet con corrección
const openActionSheet = () => {
  console.log("Abriendo Action Sheet...");
  isActionSheetOpen.value = false; // Reiniciar antes de abrir
  setTimeout(() => {
    isActionSheetOpen.value = true;
    console.log("Estado después de abrir:", isActionSheetOpen.value);
  }, 10);
};

// Función para cerrar el Action Sheet
const closeActionSheet = () => {
  console.log("Cerrando Action Sheet...");
  isActionSheetOpen.value = false;
  console.log("Estado después de cerrar:", isActionSheetOpen.value);
};
</script>

<style scoped>
/* Estilos personalizados si los necesitas */
</style>

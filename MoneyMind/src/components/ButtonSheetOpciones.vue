<template>
  <div>
    <ion-button @click="openActionSheet" expand="block" fill="clear">
      <ion-icon :icon="ellipsisVertical" slot="start"></ion-icon>
      Más Opciones
    </ion-button>

    <ion-action-sheet
      :is-open="isOpen"
      header="Servicios Financieros"
      :buttons="actionSheetButtons"
      @didDismiss="setOpen(false)"
    ></ion-action-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonActionSheet, IonIcon } from '@ionic/vue';
import { ellipsisVertical } from 'ionicons/icons';

const router = useRouter();
const isOpen = ref(false);

const setOpen = (state) => {
  isOpen.value = state;
};

const openActionSheet = () => {
  setOpen(true);
};

const actionSheetButtons = [
  {
    text: 'Tarjeta de Crédito',
    icon: 'card-outline',
    handler: () => {
      router.push('/solicitar/tarjeta'); // Cambiado a path directo
    }
  },
  {
    text: 'Préstamo',
    icon: 'cash-outline',
    handler: () => {
      router.push('/solicitar/prestamo');
    }
  },
  {
    text: 'Cuenta de Ahorro',
    icon: 'save-outline',
    handler: () => {
      router.push('/solicitar/cuenta');
    }
  },
  {
    text: 'Inversión',
    icon: 'trending-up-outline',
    handler: () => {
      router.push('/solicitar/inversion');
    }
  },
  {
    text: 'Efectivo',
    icon: 'wallet-outline',
    handler: () => {
      router.push('/registrar/efectivo');
    }
  },
  {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close-circle-outline'
  }
];
</script>

<style scoped>
/* Estilo para el botón de opciones */
ion-button {
  --color: var(--ion-color-primary);
  --background: transparent;
  --border-radius: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
}

/* Estilo para los iconos en el Action Sheet */
ion-action-sheet {
  --button-color: var(--ion-color-dark);
  --icon-color: var(--ion-color-primary);
}
</style>
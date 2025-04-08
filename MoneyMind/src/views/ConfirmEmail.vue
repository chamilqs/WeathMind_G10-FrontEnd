<!-- src/views/User/ConfirmEmail.vue -->
<template>
    <IonPage>
      <IonContent class="ion-padding">
        <div class="centered">
          <h2 class="text-center">Confirmando tu correo...</h2>
          <IonLoading :isOpen="loading" message="Procesando..." />
          <IonAlert
            :isOpen="alertOpen"
            header="Resultado"
            :message="alertMessage"
            buttons="OK"
            @didDismiss="redirect"
          />
        </div>
      </IonContent>
    </IonPage>
  </template>
  
  <script setup>
  import { IonPage, IonContent, IonLoading, IonAlert } from '@ionic/vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const loading = ref(true);
  const alertOpen = ref(false);
  const alertMessage = ref('');
  const route = useRoute();
  const router = useRouter();
  
  const confirmEmail = async () => {
    const userId = route.query.userId;
    const token = encodeURIComponent(route.query.token);
  
    try {
      const response = await fetch(`https://dev.genlabs.us/api/account/confirm-email?userId=${userId}&token=${token}`, {
        method: 'POST',
        headers: {
          Accept: '*/*'
        }
      });
  
      if (!response.ok) throw new Error('El enlace de confirmación es inválido o ha expirado');
  
      alertMessage.value = '¡Correo confirmado correctamente! Ya puedes iniciar sesión.';
    } catch (error) {
      alertMessage.value = 'Error: ' + error.message;
    } finally {
      loading.value = false;
      alertOpen.value = true;
    }
  };
  
  const redirect = () => {
    router.push('/login');
  };
  
  onMounted(confirmEmail);
  </script>
  
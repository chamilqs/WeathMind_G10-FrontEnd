<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="card in cards" :key="card.id">
      <ion-card class="card" @click="goToTransactions(card.id)">
        <ion-card-header class="card-header">
          <div class="header-container">
            <h2 class="card-title">{{ card.holderName }}</h2>
            <img :src="card.logo" alt="Card Logo" class="logo" />
          </div>
        </ion-card-header> 
        <ion-card-content>
          <div class="card-content">
            <p style="font-size: 15px;">Balance</p>
            <h2 style="font-size: 25px;">${{ card.balance }}</h2>
          </div>
        </ion-card-content>
        <p class="serial-card">**** {{ card.cardNumber.slice(-4) }}</p>
      </ion-card>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { IonCard, IonCardHeader, IonCardContent } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const router = useRouter();
const cards = ref([]); // Inicializa como un array vacío

// Función para obtener las tarjetas desde db.json
const fetchCards = async () => {
  try {
    const response = await fetch('http://localhost:3000/tarjetas'); // Asegúrate de que la ruta sea correcta
    const data = await response.json();
    cards.value = data; // Asignar las tarjetas al estado
  } catch (error) {
    console.error('Error al obtener las tarjetas:', error);
  }
};

// Llama a la función fetchCards cuando el componente se monta
onMounted(() => {
  fetchCards();
});

const goToTransactions = (cardId) => {
  router.push({ path: '/HistoryTransaction', query: { cardId } });
};

const swiperOptions = {
  slidesPerView: 1.2,
  spaceBetween: 16,
  freeMode: true,
};
</script>

<style scoped>
/* Estilos de la tarjeta */
.card {
  background: linear-gradient(145deg, #1a237e, #0d47a1);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 90%;
  margin: 0 auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #fdfdfd;
  margin-top: 10px;
}

.serial-card {
  padding-left: 20px;
  margin-bottom: -10px;
  font-size: 18px;
}

swiper-container {
  padding: 16px 0;
}
.card:hover {
  transform: scale(1.05);
}
</style>
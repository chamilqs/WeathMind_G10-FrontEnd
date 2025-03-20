<template>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="cuenta in cuentas" :key="cuenta.id">
        <div class="account-card">
          <h3>{{ cuenta.nombreCompleto }}</h3>
          <p>Tipo de cuenta: {{ cuenta.tipoCuenta }}</p>
          <p>Saldo inicial: ${{ cuenta.saldoInicial }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  // Definir las props que recibirá el componente
  const props = defineProps({
    cuentas: {
      type: Array,
      required: true,
    },
  });
  
  // Opciones de Swiper
  const swiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    freeMode: true,
  };
  </script>
  
  <style scoped>
  .account-card {
    background: linear-gradient(145deg, #1a237e, #0d47a1);
    border-radius: 16px;
    padding: 24px;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 90%;
    margin: 0 auto;
  }
  
  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin: 5px 0;
  }
  </style>
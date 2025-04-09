<template>
  <IonPage>
    <div class="home-page">
      <!-- Header con avatar, bienvenida y botón + -->
      <div class="header improved-header">
        <div class="welcome">
          <img class="avatar" :src="userProfile.profilePicture || 'https://i.pravatar.cc/50'" alt="avatar" />
          <div>
            <p class="welcome-message">Welcome back 👋</p>
            <h2 class="user-name">{{ userProfile.fullName }}</h2>
          </div>
        </div>
        <ion-button class="add-btn" fill="solid" shape="round" @click="showForm = true">
          <ion-icon class="plus-icon" :icon="addOutline" />
          <p class="bttn-p">+</p>
        </ion-button>
      </div>

      <!-- Saldo Total -->
      <div class="balance-container">
        <p class="balance-label">Your Balance</p>
        <h1 class="balance-amount">${{ totalBalance.toLocaleString() }}</h1>
      </div>

      <!-- Productos vinculados en carrusel -->
      <div v-if="filteredProducts.length" class="linked-products-carousel">
        <h4 class="linked-products-title">Productos Vinculados</h4>
        <Swiper
          :slides-per-view="1.2"
          :space-between="16"
          :centered-slides="true"
          :loop="true"
          :pagination="{ clickable: true }"
          grab-cursor
          class="my-swiper"
        >
          <SwiperSlide v-for="product in filteredProducts" :key="product.id">
            <div class="linked-product-card">
              <p class="card-label">{{ product.name }}</p>
              <div class="card-info">
                <p class="card-sub">Balance</p>
                <h2 class="card-balance">${{ product.balance.toLocaleString() }}</h2>
              </div>
              <p class="card-type">{{ product.productType }}</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Últimos movimientos al final en forma de card -->
      <div class="movements">
        <h4>Últimos Movimientos</h4>
        <div class="movement-scroll">
          <div class="movement-item" v-for="(item, index) in dummyMovements.slice(0, 3)" :key="index">
            <ion-icon :icon="bulbOutline" class="icon" />
            <div class="movement-info">
              <h5>{{ item.description }}</h5>
              <p>{{ new Date().toLocaleString() }}</p>
            </div>
            <span :class="{ positive: item.amount > 0, negative: item.amount < 0 }">
              {{ item.amount > 0 ? '+' : '' }}${{ Math.abs(item.amount) }}
            </span>
          </div>
        </div>
        <div class="see-more-wrapper">
          <p class="see-more" @click="showModal = true">See more &gt;&gt;</p>
        </div>
      </div>

      <!-- Modal Formulario -->
      <ion-modal :is-open="showForm" @didDismiss="showForm = false">
  <ion-content class="ion-padding">
    <div class="form-container">
      <!-- Botón de cerrar -->
      <ion-button fill="clear" class="close-btn" @click="showForm = false">
        <ion-icon :icon="closeOutline" />
      </ion-button>

      <h2 class="text-center">Registrar Producto</h2>
      <p class="text-center welcome-text font-bold">Ingresa los detalles del producto financiero</p>

      <ion-list>
        <!-- Nombre -->
        <div class="input-group">
          <label class="input-label">Nombre del producto</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model="newProduct.name" placeholder="Ej. Cuenta BHD" required />
          </ion-item>
        </div>

        <!-- Balance -->
        <div class="input-group">
          <label class="input-label">Balance</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model.number="newProduct.balance" type="number" placeholder="$0.00" required />
          </ion-item>
        </div>

        <!-- Tipo de producto -->
        <div class="input-group">
          <label class="input-label">Tipo de producto</label>
          <ion-item class="input-field" lines="none">
            <ion-select v-model="newProduct.productType" placeholder="Selecciona tipo">
              <ion-select-option value="Loan">Loan</ion-select-option>
              <ion-select-option value="CreditCard">Credit Card</ion-select-option>
              <ion-select-option value="Saving">Saving</ion-select-option>
              <ion-select-option value="Cash">Cash</ion-select-option>
              <ion-select-option value="Investment">Investment</ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <!-- Campos dinámicos -->
        <div v-if="newProduct.productType === 'CreditCard'" class="input-group">
          <label class="input-label">Límite de crédito</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model.number="newProduct.extra.creditLimit" type="number" />
          </ion-item>
        </div>

        <div v-if="['CreditCard', 'Loan'].includes(newProduct.productType)" class="input-group">
          <label class="input-label">Deuda</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model.number="newProduct.extra.debt" type="number" />
          </ion-item>
        </div>

        <div v-if="['Loan', 'Investment'].includes(newProduct.productType)" class="input-group">
          <label class="input-label">Plazo (meses)</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model.number="newProduct.extra.termInMonths" type="number" />
          </ion-item>
        </div>

        <div v-if="['Loan', 'Investment'].includes(newProduct.productType)" class="input-group">
          <label class="input-label">Interés (%)</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model.number="newProduct.extra.interestRate" type="number" />
          </ion-item>
        </div>

        <div v-if="newProduct.productType === 'CreditCard'" class="input-group">
          <label class="input-label">Fecha de expiración</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model="newProduct.extra.expirationDate" type="date" />
          </ion-item>
        </div>

        <div v-if="newProduct.productType === 'Loan'" class="input-group">
          <label class="input-label">Fecha de cierre</label>
          <ion-item class="input-field" lines="none">
            <ion-input v-model="newProduct.extra.endDate" type="date" />
          </ion-item>
        </div>
      </ion-list>

      <ion-button expand="full" @click="registrarProducto">Guardar Producto</ion-button>
    </div>
  </ion-content>
</ion-modal>

      <!-- Toast -->
      <ion-toast
        :is-open="toastVisible"
        :message="toastMessage"
        duration="2000"
        @didDismiss="toastVisible = false"
      />
    </div>
  </IonPage>
</template>

<script setup>
import { closeOutline } from 'ionicons/icons';

import { ref, onMounted, computed } from 'vue';
import {
  IonPage, IonButton, IonIcon, IonModal, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonContent, IonToast
} from '@ionic/vue';
import { addOutline, bulbOutline } from 'ionicons/icons';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';

const showForm = ref(false);
const showModal = ref(false);
const toastVisible = ref(false);
const toastMessage = ref('');
const userProfile = ref({ fullName: 'Usuario', profilePicture: '' });
const currentUserId = ref('');
const products = ref([]);

const newProduct = ref({
  name: '',
  balance: 0,
  productType: '',
  extra: {}
});

const filteredProducts = computed(() =>
  products.value.filter(p => p && typeof p.balance === 'number' && p.userId === currentUserId.value)
);

const dummyMovements = ref([
  { description: 'Pago Tarjeta BHD', amount: -2500 },
  { description: 'Depósito Nómina', amount: 12500 },
  { description: 'Transferencia a Ahorros', amount: -1500 },
  { description: 'Pago Préstamo UASD', amount: -3000 },
  { description: 'Ingreso Freelance', amount: 8000 },
]);

const totalBalance = computed(() =>
  filteredProducts.value.reduce((acc, item) => acc + (item.balance || 0), 0)
);

const generatePayload = () => {
  const extra = newProduct.value.extra || {};
  const now = new Date().toISOString();

  const base = {
    id: "string",
    userId: currentUserId.value,
    name: newProduct.value.name ?? '',
    balance: newProduct.value.balance ?? 0,
    productType: newProduct.value.productType ?? '',
    creditLimit: 0,
    debt: 0,
    termInMonths: 0,
    interestRate: 0,
    endDate: now,
    hasError: false,
    error: 'string'
  };

  switch (newProduct.value.productType) {
    case 'CreditCard':
      return {
        ...base,
        creditLimit: Number(extra.creditLimit || 0),
        debt: Number(extra.debt || 0),
        endDate: extra.expirationDate || now
      };
    case 'Loan':
      return {
        ...base,
        creditLimit: 0,
        debt: Number(extra.debt || 0),
        termInMonths: Number(extra.termInMonths || 0),
        interestRate: Number(extra.interestRate || 0),
        endDate: extra.endDate || now
      };
    case 'Investment':
      return {
        ...base,
        termInMonths: Number(extra.termInMonths || 0),
        interestRate: Number(extra.interestRate || 0),
        endDate: now
      };
    case 'Saving':
    case 'Cash':
    default:
      return base;
  }
};

const registrarProducto = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return;

  const payload = generatePayload();

  try {
    const response = await fetch('https://dev.genlabs.us/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok || data.hasError) {
      toastMessage.value = data.error || 'Error desconocido';
    } else {
      products.value.push(data);
      showForm.value = false;
      toastMessage.value = 'Producto guardado correctamente';
    }
  } catch (err) {
    toastMessage.value = 'Error: ' + err.message;
  } finally {
    toastVisible.value = true;
  }
};

onMounted(async () => {
  const stored = localStorage.getItem('userData');
  if (stored) {
    const parsed = JSON.parse(stored);
    userProfile.value.fullName = parsed.fullName;
    userProfile.value.profilePicture = parsed.profilePicture;
    currentUserId.value = parsed.userId;

    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const res = await fetch(`https://dev.genlabs.us/api/product/by-user/${parsed.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          products.value = data;
        }
      } catch (e) {
        console.error('Error al obtener productos', e);
      }
    }
  }
});
</script>

<style scoped>
.home-page {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9faff;
  color: #1a1a1a;
}

.header.improved-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}


.btn-p {
  font-size: 18px;
  color: white;
  margin: 0;
}

.welcome {
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  gap: 10px;
}


.welcome-message {
  margin-top: 10%;
  font-size: 14px;
  margin: 0;
  color:#9CA4AB;
  position: absolute;
}



.balance-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alineación a la izquierda */
  justify-content: center;
  gap: 8px; /* Espacio entre elementos */
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  height: auto; /* Altura dinámica */
}

.balance-label {
  font-size: 14px;
  color: #9CA4AB;
  margin: 0;
  position: static; /* Elimina el absolute para seguir el flujo del layout */
}

.balance-amount {
  font-size: 32px;
  color: #1d4ed8;
  font-weight: 700;
  margin: 0;
  position: static; /* Igual aquí */
  text-align: left; /* Alineación a la izquierda */
}


.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.add-btn {
  --background: #1d4ed8;
  --color: #fff;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.plus-icon {
  font-size: 24px;
  color: white;
}

.total-balance {
  margin-top: 20px;
}

.total-balance p {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.total-balance h1 {
  margin: 0;
  font-size: 32px;
  color: #1d4ed8;
  font-weight: 700;
}

.text-center {
  text-align: center;
  margin-bottom: 1rem;
}

.form-btn {
  margin-top: 1rem;
  --background: #1d4ed8;
  --color: white;
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
}

.movements {
  margin-top: 15%;
    
}

.movements p {
  font-size: 12px; 
}

.movements h4 {
  margin-bottom: 15px;
  font-size: 16px;
    color: #042A72;
  font-weight: 600;
  text-align: center;   
}

.movements h5 {
  margin-bottom: 1px;
  color: #1d4ed8;
  font-size: 14px; 
}

.movement-scroll {
  max-height: 210px;
  overflow-y: auto;
}

.movement-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e5e7eb;
}

.movement-info {
  flex: 1;
  margin-left: 10px;
}

.icon {
  font-size: 22px;
  color: #6b7280;
}

.positive {
  color: #22c55e;
  font-weight: 600;
  text-align: right;
  font-size: 14px;
}

.negative {
  color: #ef4444;
  font-weight: 600;
  font-size: 14px;
}

.see-more {
  text-align: center;
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

@media (min-width: 768px) {
  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  .card {
    margin-top: 100px;
    width: 100%;
    max-width: 350px;
  }
}

.linked-products-carousel {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 20px;
}

.linked-products-title {
  text-align: center;
  color: #042a72;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.linked-product-card {
  background: #0a3d91;
  border-radius: 20px;
  color: white;
  padding: 1.5rem;
  width: 260px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.card-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-sub {
  font-size: 13px;
  color: #ddd;
  margin-bottom: 0.2rem;

}

.card-balance {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.card-type {
  font-size: 14px;
  opacity: 0.9;
}

.form-container {
  max-width: 400px;
  padding: 25px;
  text-align: center;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 40px;
}

.text-center {
  color: #212529;
  font-size: large;
  font-weight: bold;
}

.input-label {
  font-weight: bold;
  margin: 10px 0 4px;
  text-align: left;
  display: block;
}

.input-field {
  margin-bottom: 12px;
  background: #f1f3f4;
  border-radius: 8px;
  --highlight-color-focused: #0a2f73;
}

.ion-button {
  margin-top: 20px;
  --background: #0a2f73;
  --color: white;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  color: #1a1a1a;
  font-size: 20px;
}

</style>
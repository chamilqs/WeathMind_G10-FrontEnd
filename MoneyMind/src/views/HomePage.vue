<template>
  <IonPage>
    <div class="home-page">
      <!-- Header con avatar, bienvenida y botón + -->
      <div class="header improved-header">
        <div class="welcome">
            <img class="avatar" :src="userProfile.profilePicture || 'https://i.pravatar.cc/50'" alt="avatar"  @click="openMenu" style=" cursor: pointer" />
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

      <!-- Últimos movimientos -->
      <div class="movements">
        <h4>Últimos Movimientos</h4>
        <div class="movement-scroll">
          <div class="movement-item" v-for="(item, index) in transactions.slice(0, 5)" :key="index">
            <ion-icon :icon="getIcon(item)" class="icon" />
            <div class="movement-info">
              <h5>{{ item.description }}</h5>
              <p>{{ formatDate(item.trxDate) }}</p>
            </div>
            <span :class="{ positive: item.amount > 0, negative: item.amount < 0 }">
              {{ item.amount > 0 ? '+' : '' }}${{ Math.abs(item.amount) }}
            </span>
          </div>
        </div>
        <div class="see-more-wrapper">
          <p class="see-more" @click="goToMyCards">See more &gt;&gt;</p>
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
import { useRouter } from 'vue-router';
import { closeOutline, addOutline, cashOutline, arrowDownOutline, arrowUpOutline, swapHorizontalOutline, cardOutline } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
import { menuController } from '@ionic/vue';
import {
  IonPage, IonButton, IonIcon, IonModal, IonList, IonItem,
  IonInput, IonSelect, IonSelectOption, IonContent, IonToast,
} from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

const openMenu = async () => {
  await menuController.open(); // Asegura que el menú se abra
};


const router = useRouter();
const showForm = ref(false);
// Removed unused showModal variable
const toastVisible = ref(false);
const toastMessage = ref('');
const userProfile = ref({ fullName: 'Usuario', profilePicture: '' });
const currentUserId = ref('');
const products = ref([]);
const transactions = ref([]);

const newProduct = ref({
  name: '',
  balance: 0,
  productType: '',
  extra: {}
});

const filteredProducts = computed(() =>
  products.value.filter(p => p && typeof p.balance === 'number' && p.userId === currentUserId.value)
);

const totalBalance = computed(() =>
  filteredProducts.value.reduce((acc, item) => acc + (item.balance || 0), 0)
);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('es-DO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getIcon = (transaction) => {
  const type = transaction.type?.toLowerCase() || '';
  const desc = transaction.description?.toLowerCase() || '';

  if (type.includes('gasto') || desc.includes('compra')) return cardOutline;
  if (type.includes('ingreso') || desc.includes('salary') || desc.includes('deposit')) return cashOutline;
  if (desc.includes('transfer')) return swapHorizontalOutline;
  if (desc.includes('loan') || desc.includes('prestamo')) return arrowDownOutline;
  if (desc.includes('investment') || desc.includes('shares')) return arrowUpOutline;

  return cashOutline;
};

const goToMyCards = () => {
  router.push('/tabs/mycards');
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

        const res2 = await fetch(`https://dev.genlabs.us/api/transaction?userId=${parsed.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res2.ok) {
          const data = await res2.json();
          transactions.value = data
            .filter(tx => tx.trxDate && tx.trxDate !== "0001-01-01T00:00:00")
            .sort((a, b) => new Date(b.trxDate) - new Date(a.trxDate));
        }
      } catch (e) {
        console.error('Error al obtener datos', e);
      }
    }
  }
});

const registrarProducto = async () => {
  const token = localStorage.getItem('jwtToken');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  if (!token || !userData?.userId) {
    toastMessage.value = 'No se encontró sesión activa.';
    toastVisible.value = true;
    return;
  }

  const payload = {
    id: "string", // requerido por la API
    name: newProduct.value.name,
    balance: newProduct.value.balance,
    productType: newProduct.value.productType,
    userId: userData.userId,
    creditLimit: newProduct.value.extra.creditLimit || 0,
    debt: newProduct.value.extra.debt || 0,
    termInMonths: newProduct.value.extra.termInMonths || 0,
    interestRate: newProduct.value.extra.interestRate || 0,
    endDate: newProduct.value.extra.endDate || null,
  };

  try {
    const res = await fetch('https://dev.genlabs.us/api/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!res.ok || result.hasError) {
      toastMessage.value = 'Error al guardar: ' + (result.error || 'Verifica los campos.');
      toastVisible.value = true;
      return;
    }

    // Producto creado, actualizar lista
    products.value.push(result);
    toastMessage.value = 'Producto registrado con éxito.';
    toastVisible.value = true;
    showForm.value = false;

    // Reset del formulario
    newProduct.value = { name: '', balance: 0, productType: '', extra: {} };
  } catch (error) {
    console.error('Error:', error);
    toastMessage.value = 'Error inesperado.';
    toastVisible.value = true;
  }
};

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
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  height: auto;
}

.balance-label {
  font-size: 14px;
  color: #9CA4AB;
  margin: 0;
  position: static;
}

.balance-amount {
  font-size: 24px;
  color: #1d4ed8;
  font-weight: 700;
  margin: 0;
  position: static;
  text-align: left;
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
  background: linear-gradient(145deg, #2060d6, #003087);
  border-radius: 20px;
  color: white;
  padding: 1.5rem;
  width: 260px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.linked-product-card::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  top: -20px;
  right: -20px;
}

.card-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  color: white;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-sub {
  font-size: 13px;
  color: #cbd5e1;
  margin-bottom: 0.2rem;
}

.card-balance {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: white;
}

.card-type {
  font-size: 14px;
  opacity: 0.9;
  color: white;
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

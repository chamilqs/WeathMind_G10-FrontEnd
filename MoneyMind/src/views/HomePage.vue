<template>
  <ion-page id="main-content">
    <SideNav />
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <div class="header-container">
          <div class="user-info">
            <ion-avatar @click="openMenu" class="user-avatar">
              <img :src="userProfile.profilePicture" alt="avatar" />
            </ion-avatar>
            <div class="welcome-text">
              <p class="welcome-message">Welcome back 👋</p>
              <h2 class="user-name">{{ userProfile.fullName }}</h2>
            </div>
          </div>
          <ion-button fill="clear" class="notification-button">
            <img src="@/assets/icons/icon-notification.png" alt="Notifications" />
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content @click="handleClickOutside">
      <ion-button class="custom-button" @click="openBottomSheet">Últimos Movimientos</ion-button>

      <ion-item>
        <ion-input label="Nombre del producto" placeholder="Ej: Cuenta BHD" :value="newProduct.name" @ionInput="e => newProduct.name = e.detail.value" />
      </ion-item>

      <ion-item>
        <ion-input v-model.number="newProduct.balance" type="number" label="Balance inicial" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Tipo de producto</ion-label>
        <ion-select :value="newProduct.productType" @ionChange="e => newProduct.productType = e.detail.value" placeholder="Seleccionar tipo">
          <ion-select-option value="Cuenta">Cuenta</ion-select-option>
          <ion-select-option value="Tarjeta de crédito">Tarjeta de crédito</ion-select-option>
          <ion-select-option value="Préstamo">Préstamo</ion-select-option>
          <ion-select-option value="Inversión">Inversión</ion-select-option>
          <ion-select-option value="Fondo de emergencia">Fondo de emergencia</ion-select-option>
        </ion-select>
      </ion-item>

      <template v-if="newProduct.productType === 'Tarjeta de crédito'">
        <ion-item>
          <ion-input v-model.number="newProduct.extra.creditLimit" type="number" label="Límite de crédito" />
        </ion-item>
        <ion-item>
          <ion-input v-model.number="newProduct.extra.debt" type="number" label="Deuda actual" />
        </ion-item>
        <ion-item>
          <ion-input v-model="newProduct.extra.expirationDate" type="date" label="Fecha de expiración" />
        </ion-item>
      </template>

      <template v-if="newProduct.productType === 'Préstamo'">
        <ion-item>
          <ion-input v-model.number="newProduct.extra.interestRate" type="number" label="Interés (%)" />
        </ion-item>
        <ion-item>
          <ion-input v-model.number="newProduct.extra.termInMonths" type="number" label="Plazo (meses)" />
        </ion-item>
        <ion-item>
          <ion-input v-model.number="newProduct.extra.debt" type="number" label="Monto del préstamo" />
        </ion-item>
        <ion-item>
          <ion-input v-model="newProduct.extra.endDate" type="date" label="Fecha final del préstamo" />
        </ion-item>
      </template>

      <template v-if="newProduct.productType === 'Inversión'">
        <ion-item>
          <ion-input v-model.number="newProduct.extra.interestRate" type="number" label="Retorno estimado (%)" />
        </ion-item>
        <ion-item>
          <ion-input v-model.number="newProduct.extra.termInMonths" type="number" label="Duración (meses)" />
        </ion-item>
      </template>

      <ion-button expand="block" class="custom-button" @click="addProduct">Agregar Producto</ion-button>

      <ion-grid v-if="products.length > 0" class="ion-padding">
        <ion-row>
          <ion-col size="12" v-for="product in products" :key="product.id">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ product.name }}</ion-card-title>
                <ion-card-subtitle>Balance: ${{ product.balance }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                Tipo: {{ product.productType }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toastController } from '@ionic/vue';

const router = useRouter();
const userProfile = ref({ fullName: 'Usuario', profilePicture: '' });
const currentUserId = ref('');
const products = ref([]);
const newProduct = ref({ name: '', balance: 0, productType: '', extra: {} });

const openMenu = () => {};
const handleClickOutside = () => {};
const openBottomSheet = () => {};

const showToast = async (message, color = 'danger') => {
  const toast = await toastController.create({ message, duration: 2000, position: 'top', color });
  toast.present();
};

const fetchProducts = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return;
  try {
    const res = await fetch('https://dev.genlabs.us/api/product', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      products.value = data.filter(p => p.userId === currentUserId.value);
    }
  } catch (e) {
    console.error('Error al obtener productos', e);
  }
};

const validateExtraFields = () => {
  const { productType, extra } = newProduct.value;

  switch (productType) {
    case 'Tarjeta de crédito':
      if (extra.creditLimit === undefined || extra.debt === undefined || !extra.expirationDate) {
        showToast('Completa todos los campos de tarjeta de crédito.');
        return false;
      }
      break;
    case 'Préstamo':
      if (
        extra.interestRate === undefined ||
        extra.termInMonths === undefined ||
        extra.debt === undefined ||
        !extra.endDate
      ) {
        showToast('Completa todos los campos de préstamo.');
        return false;
      }
      break;
    case 'Inversión':
      if (
        extra.interestRate === undefined ||
        extra.termInMonths === undefined
      ) {
        showToast('Completa todos los campos de inversión.');
        return false;
      }
      break;
  }

  return true;
};

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
    error: "string"
  };

  switch (newProduct.value.productType) {
    case 'Tarjeta de crédito':
      return { ...base, creditLimit: Number(extra.creditLimit || 0), debt: Number(extra.debt || 0), endDate: extra.expirationDate || now };
    case 'Préstamo':
      return { ...base, debt: Number(extra.debt || 0), termInMonths: Number(extra.termInMonths || 0), interestRate: Number(extra.interestRate || 0), endDate: extra.endDate || now };
    case 'Inversión':
      return { ...base, termInMonths: Number(extra.termInMonths || 0), interestRate: Number(extra.interestRate || 0) };
    default:
      return base;
  }
};

const addProduct = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return router.push('/login');

  if (!newProduct.value.name?.trim()) return await showToast('El nombre del producto es obligatorio.');
  if (!newProduct.value.productType) return await showToast('Selecciona el tipo de producto.');
  if (!validateExtraFields()) return;

  const payload = generatePayload();
  console.log('Payload a enviar:', payload);

  try {
    const response = await fetch('https://dev.genlabs.us/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      await showToast('Producto creado ✅', 'success');
      newProduct.value = { name: '', balance: 0, productType: '', extra: {} };
      fetchProducts();
    } else {
      const text = await response.text();
      console.error('Respuesta del servidor:', text);
      await showToast('Error del servidor: ' + text);
    }
  } catch (err) {
    console.error('Error al crear producto:', err);
    await showToast('Error de red al crear producto');
  }
};

onMounted(() => {
  const stored = localStorage.getItem('userData');
  if (stored) {
    const parsed = JSON.parse(stored);
    userProfile.value.fullName = parsed.fullName;
    userProfile.value.profilePicture = parsed.profilePicture;
    currentUserId.value = parsed.userId;
    fetchProducts();
  } else {
    router.push('/login');
  }
});
</script>



<style scoped>

.custom-button {
  --background: linear-gradient(145deg, #1a237e, #0d47a1);
  --color: #ffffff;
  --border-radius: 12px;
  margin: 1rem;
  font-weight: 600;
  text-transform: none;
}

ion-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  background: #ffffff;
}

ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

ion-card-subtitle {
  font-size: 0.95rem;
  color: #555;
}

custom-button {
  --background: linear-gradient(145deg, #1a237e, #0d47a1);
  --color: #ffffff;
  --border-radius: 12px;
  margin: 1rem;
  font-weight: 600;
  text-transform: none;
}

ion-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  background: #ffffff;
}

ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

ion-card-subtitle {
  font-size: 0.95rem;
  color: #555;
}

ion-toolbar.header-toolbar {
  --background: white;
  --border-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-message {
  margin: 0;
  font-size: 0.9rem;
  color: #888;
}

.user-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.notification-button {
  --padding-start: 0;
  --padding-end: 0;
  --background: transparent;
  --box-shadow: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-button img {
  width: 24px;
  height: 24px;
}

ion-content {
  --background: #f4f4f4;
}

.custom-button {
  --background: linear-gradient(145deg, #1a237e, #0d47a1);
  --color: #ffffff;
  --border-radius: 12px;
  margin: 1rem;
  font-weight: 600;
  text-transform: none;
}

ion-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  background: #ffffff;
}

ion-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

ion-card-subtitle {
  font-size: 0.95rem;
  color: #555;
}
</style>

<template>
	<ion-page>
	  <ion-header class="header">
		<ion-toolbar class="toolbar">
		  <ion-buttons slot="start">
			<ion-back-button default-href="/tabs/homepage" />
		  </ion-buttons>
		  <ion-title class="title">Registro de Finanzas</ion-title>
		</ion-toolbar>
	  </ion-header>
  
	  <ion-content class="ion-padding">
		<div class="form-container">
		  <ion-list lines="none">
			<!-- Tipo -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Tipo</ion-label>
			  <ion-select v-model="tipo" placeholder="Seleccionar tipo">
				<ion-select-option value="Gasto">Gasto</ion-select-option>
				<ion-select-option value="Ingreso">Ingreso</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<!-- Monto -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Monto</ion-label>
			  <ion-input v-model="monto" type="number" placeholder="$0.00" />
			</ion-item>
  
			<!-- Fecha -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Fecha</ion-label>
			  <ion-input v-model="fecha" type="date" />
			</ion-item>
  
			<!-- Descripción -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Descripción</ion-label>
			  <ion-input v-model="descripcion" placeholder="Ej: Pago de factura" />
			</ion-item>
  
			<!-- Categoría -->
			<ion-item class="custom-item" v-if="tipo">
			  <ion-label position="stacked">Categoría</ion-label>
			  <ion-select v-model="categoria" placeholder="Seleccionar categoría">
				<ion-select-option
				  v-for="cat in categoriasDisponibles"
				  :key="cat.id"
				  :value="cat.id"
				>
				  {{ cat.name }}
				</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<!-- Producto origen -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Producto origen</ion-label>
			  <ion-select v-model="fromProductId" placeholder="Selecciona producto">
				<ion-select-option v-for="p in productos" :key="p.id" :value="p.id">
				  {{ p.name }} - {{ p.productType }}
				</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<!-- Producto destino -->
			<ion-item class="custom-item">
			  <ion-label position="stacked">Producto destino</ion-label>
			  <ion-select v-model="toProductId" placeholder="Selecciona producto">
				<ion-select-option v-for="p in productos" :key="p.id" :value="p.id">
				  {{ p.name }} - {{ p.productType }}
				</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<!-- Si no hay productos -->
			<ion-item v-if="productos.length === 0">
			  <ion-label color="danger">No se encontraron productos vinculados</ion-label>
			</ion-item>
		  </ion-list>
  
		  <!-- Botón Guardar -->
		  <ion-button expand="full" color="primary" class="save-button" @click="guardar">
			Guardar
		  </ion-button>
  
		  <!-- Botón para registrar categorías -->
		  <ion-button expand="full" color="medium" @click="registrarCategoriasPredefinidas">
			Registrar categorías por defecto
		  </ion-button>
		</div>
	  </ion-content>
	</ion-page>
  </template>
  
  <script setup>
  import {
	IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
	IonTitle, IonContent, IonList, IonItem, IonLabel, IonSelect,
	IonSelectOption, IonInput, IonButton
  } from '@ionic/vue';
  import { ref, computed, onMounted } from 'vue';
  
  const jwt = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  
  const tipo = ref('');
  const monto = ref('');
  const fecha = ref('');
  const descripcion = ref('');
  const categoria = ref('');
  const fromProductId = ref('');
  const toProductId = ref('');
  const productos = ref([]);
  
  // Categorías predefinidas
  const categoriasIngreso = [
	{ id: 'salary', name: 'Salary' },
	{ id: 'freelance', name: 'Freelance' },
	{ id: 'investments', name: 'Investments' },
	{ id: 'rental', name: 'Rental Income' },
	{ id: 'gifts', name: 'Gifts' },
	{ id: 'other_income', name: 'Other' }
  ];
  
  const categoriasGasto = [
	{ id: 'housing', name: 'Housing' },
	{ id: 'food', name: 'Food & Groceries' },
	{ id: 'transportation', name: 'Transportation' },
	{ id: 'debt', name: 'Debt & Loans' },
	{ id: 'shopping', name: 'Shopping' },
	{ id: 'health', name: 'Health' },
	{ id: 'education', name: 'Education' },
	{ id: 'entertainment', name: 'Entertainment' },
	{ id: 'travel', name: 'Travel' },
	{ id: 'pets', name: 'Pets' },
	{ id: 'other_expense', name: 'Other' }
  ];
  
  const categoriasDisponibles = computed(() =>
	tipo.value === 'Ingreso' ? categoriasIngreso : tipo.value === 'Gasto' ? categoriasGasto : []
  );
  
  // Cargar productos
  onMounted(async () => {
	if (!jwt || !userId) {
	  alert('Token o ID de usuario faltante');
	  return;
	}
  
	try {
	  const res = await fetch(`https://dev.genlabs.us/api/product/by-user/${userId}`, {
		headers: {
		  Authorization: `Bearer ${jwt}`,
		  Accept: 'application/json'
		}
	  });
  
	  const data = await res.json();
	  if (!res.ok || data.hasError) {
		alert('No se pudieron obtener los productos');
		return;
	  }
  
	  productos.value = data;
	} catch (e) {
	  alert('Error de conexión: ' + e.message);
	}
  });
  
  // Validación de tipos válidos
  function isTransferValid(fromType, toType) {
	if (fromType === 'Saving' && toType === 'Loan') return true;
	if (fromType === 'Cash' && toType === 'CreditCard') return true;
	if (fromType === 'Cash' && toType === 'Saving') return true;
	if (fromType === 'CreditCard' && toType === 'Loan') return true;
	if (fromType === 'Saving' && toType === 'Cash') return true;
	if (fromType === 'Saving' && toType === 'Investment') return true;
	if (fromType === 'Saving' && toType === 'Saving') return true;
	if (fromType === 'Cash' && toType === 'Loan') return true;
	if (fromType === 'Cash' && toType === 'Investment') return true;
	if (fromType === 'Saving' && toType === 'CreditCard') return true;
	if (fromType === 'CreditCard' && !toType) return true;
	if (fromType === 'Loan' && !toType) return true;
	if (fromType === 'Cash' && !toType) return true;
	if (fromType === 'Saving' && !toType) return true;
	if (!fromType && toType === 'CreditCard') return true;
	if (!fromType && toType === 'Loan') return true;
	if (!fromType && toType === 'Investment') return true;
	if (!fromType && toType === 'Saving') return true;
	if (!fromType && toType === 'Cash') return true;
	return false;
  }
  
  // Guardar transacción
  const guardar = async () => {
	if (!jwt || !userId) {
	  alert('Usuario no autenticado');
	  return;
	}
  
	const from = productos.value.find(p => p.id === fromProductId.value);
	const to = productos.value.find(p => p.id === toProductId.value);
  
	if (!from || !to) {
	  alert('Selecciona productos válidos');
	  return;
	}
  
	if (!isTransferValid(from.productType, to.productType)) {
	  alert(`Transferencia inválida entre ${from.productType} y ${to.productType}`);
	  return;
	}
  
	const body = {
	  userId,
	  amount: parseFloat(monto.value),
	  categoryId: categoria.value,
	  transactionDate: new Date(fecha.value).toISOString(),
	  description: descripcion.value || 'Transacción registrada',
	  type: tipo.value,
	  fromProductId: from.id,
	  toProductId: to.id,
	  fromProduct: {
		...from,
		additionalData: {
		  additionalProp1: '',
		  additionalProp2: '',
		  additionalProp3: ''
		}
	  },
	  toProduct: {
		...to,
		additionalData: {
		  additionalProp1: '',
		  additionalProp2: '',
		  additionalProp3: ''
		}
	  },
	  hasError: false,
	  error: null
	};
  
	try {
	  const res = await fetch('https://dev.genlabs.us/api/transfer/transfer', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${jwt}`
		},
		body: JSON.stringify(body)
	  });
  
	  const result = await res.json();
	  if (!res.ok || result.hasError) {
		throw new Error(result.error || 'Error al registrar transacción');
	  }
  
	  alert('Transacción registrada correctamente');
	} catch (e) {
	  alert('Error: ' + e.message);
	}
  };
  
  // Registrar categorías predefinidas
  const registrarCategoriasPredefinidas = async () => {
	if (!jwt || !userId) {
	  alert('No se puede registrar categorías: usuario no autenticado');
	  return;
	}
  
	const categorias = [...categoriasIngreso.map(c => ({ ...c, type: 'Ingreso' })), ...categoriasGasto.map(c => ({ ...c, type: 'Gasto' }))];
  
	for (const cat of categorias) {
	  const url = new URL('https://dev.genlabs.us/api/category/add');
	  url.searchParams.append('id', cat.id);
	  url.searchParams.append('name', cat.name);
	  url.searchParams.append('type', cat.type);
	  url.searchParams.append('userId', userId);
  
	  try {
		const res = await fetch(url, {
		  method: 'POST',
		  headers: {
			Authorization: `Bearer ${jwt}`
		  }
		});
  
		if (!res.ok) {
		  const err = await res.text();
		  console.warn(`❌ Categoría ${cat.name} no se pudo registrar.`, err);
		} else {
		  console.log(`✅ Categoría ${cat.name} registrada correctamente`);
		}
	  } catch (error) {
		console.error(`Error en ${cat.name}:`, error.message);
	  }
	}
  
	alert('✔️ Categorías predefinidas registradas.');
  };
  </script>
  
  <style scoped>
  .header {
	--background: #ffffff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
  }
  .toolbar {
	display: flex;
	justify-content: center;
  }
  .title {
	font-size: 18px;
	font-weight: bold;
	text-align: center;
  }
  .form-container {
	padding: 20px;
	max-width: 500px;
	margin: 0 auto;
  }
  .custom-item {
	--background: #fff;
	border-radius: 10px;
	margin-bottom: 15px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  .save-button {
	--background: #032a73;
	font-weight: bold;
	margin-top: 20px;
  }
  </style>
  
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
			<ion-item class="custom-item">
			  <ion-label position="stacked">Tipo</ion-label>
			  <ion-select v-model="tipo" placeholder="Seleccionar tipo">
				<ion-select-option value="Gasto">Gasto</ion-select-option>
				<ion-select-option value="Ingreso">Ingreso</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<ion-item class="custom-item">
			  <ion-label position="stacked">Monto</ion-label>
			  <ion-input v-model="monto" type="number" placeholder="$0.00"></ion-input>
			</ion-item>
  
			<ion-item class="custom-item">
			  <ion-label position="stacked">Fecha</ion-label>
			  <ion-input v-model="fecha" type="date"></ion-input>
			</ion-item>
  
			<ion-item class="custom-item">
			  <ion-label position="stacked">Categoría</ion-label>
			  <ion-select v-model="categoria" placeholder="Seleccionar categoría">
				<ion-select-option value="comida">Comida</ion-select-option>
				<ion-select-option value="transporte">Transporte</ion-select-option>
				<ion-select-option value="salud">Salud</ion-select-option>
			  </ion-select>
			</ion-item>
  
			<ion-item class="custom-item">
			  <ion-label position="stacked">Tipo de cuenta</ion-label>
			  <ion-select v-model="tipoCuenta" placeholder="Seleccionar tipo de cuenta">
				<ion-select-option value="debito">Débito</ion-select-option>
				<ion-select-option value="credito">Crédito</ion-select-option>
			  </ion-select>
			</ion-item>
		  </ion-list>
  
		  <ion-button expand="full" color="primary" class="save-button" @click="guardar">
			Guardar
		  </ion-button>
		</div>
	  </ion-content>
	</ion-page>
  </template>
  
  <script setup>
  const guardar = async () => {
  const jwt = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');

  if (!jwt || !userId) {
    alert('Usuario no autenticado');
    return;
  }

  const body = {
    userId,
    amount: parseFloat(monto.value),
    categoryId: categoria.value,
    transactionDate: fecha.value,
    description: descripcion.value,
    type: tipo.value, // 'Ingreso' o 'Gasto'
    fromProductId: 'some-id-1',
    toProductId: 'Prod1-1',
    fromProduct: null,
    toProduct: null,
    hasError: false,
    error: null
  };

  try {
    const response = await fetch('https://dev.genlabs.us/api/transfer/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('Transacción registrada:', result);
    alert('Transacción guardada con éxito');
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Error al guardar: ' + error.message);
  }
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
  